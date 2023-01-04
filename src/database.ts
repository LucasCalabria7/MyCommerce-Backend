import {TUser} from "./types"
import {TProduct} from "./types"
import {TPurchase} from "./types"
import { Category } from "./types"

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
        category: Category.CLOTHES_AND_SHOES,
    },
    {
        id: "prodid90",
        name: "Nike",
        price: 500,
        category: Category.CLOTHES_AND_SHOES,
    },
    {
        id: "prodid2",
        name: "Adidas",
        price: 500,
        category: Category.CLOTHES_AND_SHOES,
    },
    {
        id: "prodid3",
        name: "Bape",
        price: 1000,
        category: Category.CLOTHES_AND_SHOES,
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

export function createUser (id: string, email: string, password: string):string  {
    let newUser = {
        id,
        email,
        password,
    }
    users.push(newUser)
    return `Account created sucesfully!`
}

export function getAllUsers ():Array<object> {
    return users
}

export function createProduct (id: string, name: string, price: number, category: Category): string {
    let newProduct = {
        id, 
        name,
        price,
        category,
    }
    products.push(newProduct)
    return `Created product sucefully!`
}

export function getAllProducts () {
    return products
}

export function getProductById (idToSearch: string): Array<object> {
    let ProductSearched = []
    for(let product of products){
        if(product.id === idToSearch){
            ProductSearched.push(product)
        }
    } return ProductSearched
}

export function queryProductsByName(q: string) {
    let ProductSearched = []
    for(let product of products) {
        if(product.name === q){
            ProductSearched.push(product)
        }
    } return ProductSearched
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {
    let newPurchase = {
        userid: userId,
        productid: productId,
        quantity: quantity,
        totalprice: totalPrice,
    }
    purchase.push(newPurchase)
    return "Purchase created sucefully!"
}