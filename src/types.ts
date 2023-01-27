export type TUser = {
    id: string
    name: string
    email: string 
    password: string 
}

export type TProduct = {
    id: string 
    name: string
    price: number
    description: string 
    imageUrl: string
}

export type TPurchase = {
    id: string
    buyer_id: string
    total_price: number
    paid: 0 | 1
    createdAt: string
}

export type TPurchaseProducts = {
    purchase_id: string
    product_id: string
    quantity: string
}

export type TPurchaseWithProducts = {
    id: string
    buyer_id: string
    total_price: number
    paid: 0 | 1
    createdAt: string
    listOfProducts: TProduct[]
}