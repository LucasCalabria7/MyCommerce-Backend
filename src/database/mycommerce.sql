-- Active: 1673885209298@@127.0.0.1@3306
CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    INSERT INTO users(id, email, password)
    VALUES ("u7t8y9", "kevindurant@reaper.com", "kd2023");

    SELECT * FROM users;

    CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        category TEXT NOT NULL
    );

    INSERT INTO products(id, name, price, category)
    VALUES ("prodid5", "Jordan 4 Military Black", 3000, "CLOTHES_SHOES");

    SELECT * FROM products;
