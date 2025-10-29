CREATE TABLE IF NOT EXISTS generated_websites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    site_name VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, site_name)
);

CREATE INDEX IF NOT EXISTS idx_generated_websites_user_id ON generated_websites(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_websites_site_name ON generated_websites(site_name);