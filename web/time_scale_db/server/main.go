package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"harvest-hub/api/gen/proto/garden/v1/gardenv1connect"
	"harvest-hub/api/internal/service"
)

func main() {
	// Database connection
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://user:password@localhost:5432/garden_db?sslmode=disable"
	}

	db, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer db.Close()

	// Create service
	gardenSvc := service.NewGardenService(db)

	// Create mux and register service
	mux := http.NewServeMux()

	path, handler := gardenv1connect.NewGardenServiceHandler(gardenSvc)
	mux.Handle(path, handler)

	// Add CORS middleware for development
	corsHandler := cors(mux)

	// Start server with h2c (HTTP/2 without TLS) for development
	addr := ":8080"
	fmt.Printf("✅ Garden API listening on %s\n", addr)

	if err := http.ListenAndServe(addr, h2c.NewHandler(corsHandler, &http2.Server{})); err != nil {
		log.Fatalf("❌ Server failed: %v", err)
	}
}

func cors(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Connect-Protocol-Version, Connect-Timeout-Ms")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		h.ServeHTTP(w, r)
	})
}
