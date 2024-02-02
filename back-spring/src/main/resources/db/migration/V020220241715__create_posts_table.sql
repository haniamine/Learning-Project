CREATE TABLE IF NOT EXISTS posts (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    body        TEXT NOT NULL,
    created_by  INT,
    created_at  TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at  TIMESTAMPTZ DEFAULT current_timestamp,


    FOREIGN KEY (created_by) REFERENCES users(id)
);