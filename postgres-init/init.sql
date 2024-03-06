-- Drop tables if they already exist
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

-- Add some example categories
INSERT INTO categories (name) VALUES ('Graffiti'), ('Futurism'), ('Painting'), ('Sculpture');

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  profile_photo VARCHAR(255)
);

-- Create the products table with a reference to the categories table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category_id INT REFERENCES categories(id), -- Foreign key reference to categories table
  image_url VARCHAR(255),
  user_id INT REFERENCES users(id) -- Optional: Foreign key reference to users table
);

-- Create an index on the name column of the products table for faster search
CREATE INDEX ON products (name);

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  image_url VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
