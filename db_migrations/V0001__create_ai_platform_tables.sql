CREATE TABLE IF NOT EXISTS access_codes (
    code VARCHAR(50) PRIMARY KEY,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    access_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (access_code) REFERENCES access_codes(code)
);

CREATE TABLE IF NOT EXISTS ai_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    module_type VARCHAR(50) NOT NULL,
    prompt TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO access_codes (code) VALUES 
    ('DHEJJEBR'),
    ('DHDHDVV'),
    ('DUDUEJR'),
    ('HXCUUCUC'),
    ('SKSKGBGV'),
    ('SUDHDV'),
    ('UDHDVRV'),
    ('DIDJSNSB'),
    ('HFHFBF'),
    ('DUFUFVVT'),
    ('ALALAPL'),
    ('FHFHT'),
    ('VNDKSV'),
    ('HDUEVCCCTJ'),
    ('HEUEVECWL'),
    ('JSIFVBEJSM'),
    ('JDUFVTVE'),
    ('HSBTBJDK')
ON CONFLICT (code) DO NOTHING;