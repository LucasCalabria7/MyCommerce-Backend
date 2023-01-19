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

    CREATE TABLE 
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT ,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

    DROP TABLE purchases;

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


        --CreatePurchase
        INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
        VALUES ("purchase1", 3000, 1, NULL, "n1hy2" ),
        ("purchase2", 1500, 1, NULL, "n1hy2"),
        ("purchase3", 4500, 1, NULL, "as9d87"),
        ("purchase4", 1000, 1, NULL, "as9d87"),
        ("purchase5", 2750, 1, NULL, "n1vb34"),
        ("purchase6", 5000, 1, NULL, "n1vb34"),
        ("purchase7", 1250, 1, NULL, "u7t8y9"),
        ("purchase8", 3350, 1, NULL, "u7t8y9");

        SELECT * FROM purchases;

        --SetDeliveryWithDateTime
        UPDATE purchases
        SET delivered_at = DATETIME() 
        WHERE id = "purchase2";


        --GetUsersAllPurchases
        SELECT users.id AS user_id,
        users.email,
        purchases.id AS purchase_id,
        purchases.total_price
        FROM users
        INNER JOIN purchases
        ON users.id = purchases.buyer_id
        WHERE users.id= "n1hy2";


        --CreatePurchaseField
        CREATE TABLE 
        purchases_products(
            purchase_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (purchase_id) REFERENCES purchases (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        );

        DROP TABLE purchases_products;


        --CreateListOfPurchases
        INSERT INTO purchases_products (purchase_id, product_id, quantity)
        VALUES("purchase1", "4fsd98", 2),
        ("purchase2", "prodid1", 1),
        ("purchase6", "prodid2", 2);


        SELECT * FROM purchases_products;


        --GetRelationPurchasesProducts
        SELECT * FROM purchases
        LEFT JOIN purchases_products
        ON purchases_products.purchase_id = purchases.id
        INNER JOIN products
        ON purchases_products.product_id = products.id;


        --RefactorRelationPurchaseProducts
        SELECT 
        purchases.id AS purchaseId,
        purchases.total_price AS totalPrice,
        purchases.paid,
        purchases.delivered_at AS deliverDay,
        purchases.buyer_id AS buyerId,
        products.id AS productId ,
        products.name AS productName ,
        products.price ,
        products.category 
        FROM purchases_products
        JOIN purchases
        ON purchases_products.purchase_id = purchases.id
        INNER JOIN products
        ON purchases_products.product_id= products.id;


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
