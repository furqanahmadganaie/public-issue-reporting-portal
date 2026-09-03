CREATE TABLE issue_updates (
    id SERIAL PRIMARY KEY,

    issue_id INT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,

    officer_id INT NOT NULL,

    status VARCHAR(30) NOT NULL,

    remark TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE issue_update_images (
    id SERIAL PRIMARY KEY,

    update_id INT NOT NULL REFERENCES issue_updates(id) ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    public_id TEXT NOT NULL
);