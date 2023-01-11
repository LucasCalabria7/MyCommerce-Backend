export enum TCategory {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type TUser = {
    id: string
    email: string 
    password: string 
}

export type TProduct = {
    id: string 
    name: string
    price: number
    category: TCategory
}

export type TPurchase = {
    userid: string 
    productid: string
    quantity: number
    totalprice: number
}