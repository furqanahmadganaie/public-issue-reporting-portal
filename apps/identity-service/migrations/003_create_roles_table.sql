CREATE TABLE IF NOT EXISTS roles (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name)
VALUES
('Citizen'),
('Municipal Officer'),
('Admin');

