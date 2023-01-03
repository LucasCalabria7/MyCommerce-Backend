"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
        category: "Shoes",
    },
    {
        id: "prodid2",
        name: "Adidas",
        price: 500,
        category: "Shoes",
    },
    {
        id: "prodid3",
        name: "Bape",
        price: 1000,
        category: "Hoodies",
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
//# sourceMappingURL=database.js.map