CREATE DATABASE url_shortener;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE urls(
    id SERIAL PRIMARY KEY, 
    user_id INT, 
    original_url TEXT,
    short_url VARCHAR(255) UNIQUE,
    visit_counter INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);