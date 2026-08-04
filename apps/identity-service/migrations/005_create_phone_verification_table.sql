CREATE TABLE IF NOT EXISTS phone_verification_tokens (

    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id INT NOT NULL,

    phone VARCHAR(20) NOT NULL,

    otp_hash TEXT NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    attempts INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_phone_verification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);