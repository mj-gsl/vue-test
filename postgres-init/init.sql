CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL
);
CREATE INDEX ON products (name);
INSERT INTO products (name, description, price) VALUES ('Wild horses', 'Horses, Pair, Wild horses image', 200.99), ('Grafitti', 'Color, Acrylic paint, Art image', 120.99), ('Watercolor', 'colors watercolor .', 109.99);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  profile_photo VARCHAR(255)
);
