import { Category, TUser, TProduct, TPurchase } from "./types"
import {createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, users, products, purchase} from "./database"


import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/users', (req: Request, res: Response)=> {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response)=> {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response)=> {
    const q = req.query.q as string 

    const filteredSearch = products.filter((product)=> {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(201).send(filteredSearch)
})

app.post('/users', (req: Request, res: Response)=> {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("User created sucesfully!")
})

app.post('/products', (req: Request, res: Response)=> {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Product created sucesfully!")
})

app.post('/purchases', (req: Request, res: Response)=> {
    const userid = req.body.userId
    const productid = req.body.productId
    const quantity = req.body.quantity
    const totalprice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userid,
        productid,
        quantity,
        totalprice
    }
    purchase.push(newPurchase)
    res.status(201).send("Purchase created sucesfully!")
})
