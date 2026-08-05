CREATE TYPE issue_status AS ENUM (
    'Pending',
    'Assigned',
    'In Progress',
    'Resolved',
    'Rejected'
);

CREATE TYPE issue_priority AS ENUM (
    'Low',
    'Medium',
    'High',
    'Critical'
);

CREATE TABLE issues (

    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    village VARCHAR(150) NOT NULL,

    address TEXT NOT NULL,

    latitude DECIMAL(10,7) NOT NULL,

    longitude DECIMAL(10,7) NOT NULL,

    citizen_id INTEGER NOT NULL,

    assigned_officer_id INTEGER,

    status issue_status NOT NULL DEFAULT 'Pending',

    priority issue_priority NOT NULL DEFAULT 'Medium',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE issue_images (

    id SERIAL PRIMARY KEY,

    issue_id INTEGER NOT NULL,

    image_url TEXT NOT NULL,

    public_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_issue
        FOREIGN KEY(issue_id)
        REFERENCES issues(id)
        ON DELETE CASCADE
);


CREATE TABLE issue_comments (

    id SERIAL PRIMARY KEY,

    issue_id INTEGER NOT NULL,

    user_id INTEGER NOT NULL,

    comment TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_issue_comment
        FOREIGN KEY(issue_id)
        REFERENCES issues(id)
        ON DELETE CASCADE
);


CREATE TABLE issue_history (

    id SERIAL PRIMARY KEY,

    issue_id INTEGER NOT NULL,

    user_id INTEGER NOT NULL,

    action VARCHAR(100) NOT NULL,

    old_value JSONB,

    new_value JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_issue_history
        FOREIGN KEY(issue_id)
        REFERENCES issues(id)
        ON DELETE CASCADE
);
