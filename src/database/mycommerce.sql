-- Active: 1673885209298@@127.0.0.1@3306
CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        category TEXT NOT NULL
    );

    --GetAllUsers
    SELECT * FROM users;


    --GetAllProducts
    SELECT * FROM products;


    --SearchProductByName
    SELECT * FROM products
    WHERE name LIKE "Jordan%";


    --CreateUSer
    INSERT INTO users(id, email, password)
    VALUES ("n1hy2", "lbj@king.com", "kingjames");


    --CreateProduct
        INSERT INTO products(id, name, price, category)
        VALUES ("4fsd98", "Dunk Low Parma", 2250, "CLOTHES_SHOES");


        --SearchProductsById
        SELECT * FROM products 
        WHERE id = "prodid1";


        --DeleteProductById
        DELETE FROM users
        WHERE id = "n1hy2";


        --DeleteProductById
        DELETE FROM products
        WHERE id = "4fsd98";


        --EditUSerById
        UPDATE users
        SET password = "bananinha123"
        WHERE id = "n1hy2";


        --EditProductById
        UPDATE products
        SET price = 50
        WHERE id = "4fsd98";


        --GetUserCrescentOrder
        SELECT * FROM users
        ORDER BY email ASC;


        --GetProductsByPrice
        SELECT * FROM products
        ORDER BY price ASC
        LIMIT 20;


        --GetProductsByBetweenPrice
        SELECT * FROM products
        WHERE price >=1000 AND price <=3000
        ORDER BY price ASC;
