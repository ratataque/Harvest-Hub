package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
)

const (
	host     = "db"
	port     = 5432
	user     = "user"
	password = "password"
	dbname   = "harvest_hub"
)

type SensorData struct {
	Time          time.Time `json:"time"`
	NodeID        int       `json:"node_id"`
	Temperature   float64   `json:"temperature"`
	Humidity      float64   `json:"humidity"`
	SoilMoisture  float64   `json:"soil_moisture"`
}

func main() {
	db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	http.HandleFunc("/data", dataHandler(db))
	http.HandleFunc("/data/summary", summaryHandler(db))

	fmt.Println("API server listening at http://localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func dataHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			rows, err := db.Query("SELECT * FROM sensor_data")
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			defer rows.Close()

			data := []SensorData{}
			for rows.Next() {
				var d SensorData
				if err := rows.Scan(&d.Time, &d.NodeID, &d.Temperature, &d.Humidity, &d.SoilMoisture); err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
				data = append(data, d)
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(data)

		case http.MethodPost:
			var d SensorData
			if err := json.NewDecoder(r.Body).Decode(&d); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}

			_, err := db.Exec("INSERT INTO sensor_data (time, node_id, temperature, humidity, soil_moisture) VALUES ($1, $2, $3, $4, $5)", d.Time, d.NodeID, d.Temperature, d.Humidity, d.SoilMoisture)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusCreated)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	}
}

func summaryHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`
			SELECT 
				node_id,
				time_bucket('15 minutes', time) AS interval,
				AVG(temperature) AS avg_temp,
				AVG(humidity) AS avg_hum,
				AVG(soil_moisture) AS avg_soil
			FROM sensor_data
			GROUP BY node_id, interval
			ORDER BY interval DESC
		`)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type SummaryData struct {
			NodeID      int       `json:"node_id"`
			Interval    time.Time `json:"interval"`
			AvgTemp     float64   `json:"avg_temp"`
			AvgHum      float64   `json:"avg_hum"`
			AvgSoil     float64   `json:"avg_soil"`
		}

		data := []SummaryData{}
		for rows.Next() {
			var d SummaryData
			if err := rows.Scan(&d.NodeID, &d.Interval, &d.AvgTemp, &d.AvgHum, &d.AvgSoil); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			data = append(data, d)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
	}
}
