CREATE TABLE sensor_data (
    time TIMESTAMPTZ NOT NULL,
    node_id TEXT NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    soil_moisture DOUBLE PRECISION
);

SELECT create_hypertable('sensor_data', 'time');

CREATE INDEX idx_sensor_node_time ON sensor_data (node_id, time DESC);

-- Insert data for the last 24 hours at 15-minute intervals for node 'node-1'
INSERT INTO sensor_data (time, node_id, temperature, humidity, soil_moisture)
SELECT
    time,
    'node-1' AS node_id,
    25 + (random() * 5) AS temperature,
    60 + (random() * 10) AS humidity,
    30 + (random() * 5) AS soil_moisture
FROM generate_series(
    NOW() - INTERVAL '24 hours',
    NOW(),
    INTERVAL '15 minutes'
) AS time;

-- Insert data for the last 24 hours at 15-minute intervals for node 'node-2'
INSERT INTO sensor_data (time, node_id, temperature, humidity, soil_moisture)
SELECT
    time,
    'node-2' AS node_id,
    24 + (random() * 5) AS temperature,
    62 + (random() * 10) AS humidity,
    28 + (random() * 5) AS soil_moisture
FROM generate_series(
    NOW() - INTERVAL '24 hours',
    NOW(),
    INTERVAL '15 minutes'
) AS time;