CREATE TABLE sensor_data (
    time TIMESTAMPTZ NOT NULL,
    node_id INT NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    soil_moisture DOUBLE PRECISION
);

SELECT create_hypertable('sensor_data', 'time');

INSERT INTO sensor_data (time, node_id, temperature, humidity, soil_moisture)
VALUES
    (NOW() - INTERVAL '1 hour', 1, 25.5, 60.2, 30.1),
    (NOW() - INTERVAL '30 minutes', 1, 26.1, 58.9, 30.5),
    (NOW(), 1, 26.4, 58.5, 30.8),
    (NOW() - INTERVAL '1 hour', 2, 24.8, 62.5, 28.9),
    (NOW() - INTERVAL '30 minutes', 2, 25.2, 61.8, 29.2),
    (NOW(), 2, 25.6, 61.4, 29.5);
