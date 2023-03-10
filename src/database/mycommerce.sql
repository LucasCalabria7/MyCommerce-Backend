-- Active: 1673885209298@@127.0.0.1@3306
CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

    CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        description TEXT NOT NULL,
        imageURL TEXT NOT NULL
    );

    CREATE TABLE 
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer_id TEXT NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        createdAt TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL ,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

            --CreatePurchaseField
        CREATE TABLE 
        purchases_products(
            purchase_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (purchase_id) REFERENCES purchases (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        );

    DROP TABLE purchases;

    --GetAllUsers
    SELECT * FROM users;


    --GetAllProducts
    SELECT * FROM products;


    --GetAllPurchases
    SELECT * FROM purchases;


    --SearchProductByName
    SELECT * FROM products
    WHERE name LIKE "Jordan%";


    --CreateUSer
    INSERT INTO users(id, name, email, password)
    VALUES ("user1","Lebron James", "lbj@king.com", "kingjames"),
    ("user2","Neymar JR", "neynday@gmail.com", "neymar123"),
    ("user3", "Lucas Calabria","lucas123@gmail.com", "lucas123"),
    ("user4", "Messi","leomessi@gmail.com", "cup2022");


    --CreateProduct
        INSERT INTO products(id, name, price, description, imageURL)
        VALUES ("prodid1", "Dunk Low Parma", 2250, "Nike Shoe Limited Edition", "randompic.jpg"),
        ("prodid2", "Air Froce 1 Low", 900, "Classic Nike Shoe", "randompic.jpg"),
        ("prodid3", "Jordan 1 Chicago", 2000, "The Michael Jordan Oficial Sneaker", "randompic.jpg"),
        ("prodid4", "Jordan 4 Travis Scott", 5000, "Straight UP!", "randompic.jpg");


        --CreatePurchase
        INSERT INTO purchases (id, buyer_id, total_price, paid)
        VALUES ("purchase1","user1", 3000, 1),
        ("purchase2","user1", 1500, 1),
        ("purchase3","user2", 4500, 1),
        ("purchase4","user2", 1000, 1),
        ("purchase5","user3", 2750, 1),
        ("purchase6","user3", 5000, 1),
        ("purchase7","user4", 1250, 1),
        ("purchase8","user4", 3350, 1);

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
