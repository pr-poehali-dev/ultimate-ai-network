CREATE TABLE IF NOT EXISTS duwdu_knowledge (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    source VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    used_count INTEGER DEFAULT 1
);

CREATE INDEX idx_duwdu_knowledge_question ON duwdu_knowledge(question);

CREATE TABLE IF NOT EXISTS duwdu_voices (
    id SERIAL PRIMARY KEY,
    voice_name VARCHAR(100) NOT NULL,
    voice_url TEXT NOT NULL,
    voice_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS duwdu_images (
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_duwdu_images_prompt ON duwdu_images(prompt);