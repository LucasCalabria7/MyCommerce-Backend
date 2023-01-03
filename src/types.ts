export type TUser = {
    id: string 
    email: string
    password: string
}

export type TProduct = {
    id: string 
    name: string
    price: number
    category: string
}

export type TPurchase = {
    userid: string 
    productid: string
    quantity: number
    totalprice: number
}