import {TUser} from "./types"
import {TProduct} from "./types"
import {TPurchase} from "./types"

export const users: TUser[] = [
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
]
export const products: TProduct[] = [
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
]
export const purchase: TPurchase[] = [
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
]