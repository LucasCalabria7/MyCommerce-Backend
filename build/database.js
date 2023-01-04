"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "wel2023",
        email: "firstuser@gmail.com",
        password: "idontknow"
    },
    {
        id: "bye2022",
        email: "seconduser@gmail.com",
        password: "nowiknow"
    },
    {
        id: "backend99",
        email: "thirduser@gmail.com",
        password: "typescript777"
    },
];
exports.products = [
    {
        id: "prodid1",
        name: "Nike",
        price: 1000,
        category: types_1.Category.CLOTHES_AND_SHOES,
    },
    {
        id: "prodid90",
        name: "Nike",
        price: 500,
        category: types_1.Category.CLOTHES_AND_SHOES,
    },
    {
        id: "prodid2",
        name: "Adidas",
        price: 500,
        category: types_1.Category.CLOTHES_AND_SHOES,
    },
    {
        id: "prodid3",
        name: "Bape",
        price: 1000,
        category: types_1.Category.CLOTHES_AND_SHOES,
    },
];
exports.purchase = [
    {
        userid: "wel2023",
        productid: "prodid1",
        quantity: 2,
        totalprice: 2000,
    },
    {
        userid: "bye2022",
        productid: "prodid2",
        quantity: 2,
        totalprice: 1000,
    },
    {
        userid: "backend99",
        productid: "prodid3",
        quantity: 2,
        totalprice: 2000,
    },
];
function createUser(id, email, password) {
    let newUser = {
        id,
        email,
        password,
    };
    exports.users.push(newUser);
    return `Account created sucesfully!`;
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    let newProduct = {
        id,
        name,
        price,
        category,
    };
    exports.products.push(newProduct);
    return `Created product sucefully!`;
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    let ProductSearched = [];
    for (let product of exports.products) {
        if (product.id === idToSearch) {
            ProductSearched.push(product);
        }
    }
    return ProductSearched;
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    let ProductSearched = [];
    for (let product of exports.products) {
        if (product.name === q) {
            ProductSearched.push(product);
        }
    }
    return ProductSearched;
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    let newPurchase = {
        userid: userId,
        productid: productId,
        quantity: quantity,
        totalprice: totalPrice,
    };
    exports.purchase.push(newPurchase);
    return "Purchase created sucefully!";
}
exports.createPurchase = createPurchase;
//# sourceMappingURL=database.js.map