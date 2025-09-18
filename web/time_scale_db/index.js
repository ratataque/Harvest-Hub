const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'harvest_hub',
  password: 'password',
  port: 5432,
});

app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sensor_data');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/data', async (req, res) => {
  try {
    const { time, node_id, temperature, humidity, soil_moisture } = req.body;
    await pool.query(
      'INSERT INTO sensor_data (time, node_id, temperature, humidity, soil_moisture) VALUES ($1, $2, $3, $4, $5)',
      [time, node_id, temperature, humidity, soil_moisture]
    );
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/data/summary', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
        node_id,
        time_bucket('15 minutes', time) AS interval,
        AVG(temperature) AS avg_temp,
        AVG(humidity) AS avg_hum,
        AVG(soil_moisture) AS avg_soil
      FROM sensor_data
      GROUP BY node_id, interval
      ORDER BY interval DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/data/calculate', async (req, res) => {
  // Placeholder for calculation logic
  res.json({ message: 'This endpoint will perform calculations in the future.' });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
