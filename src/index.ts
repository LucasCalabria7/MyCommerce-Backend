import { TCategory, TUser, TProduct, TPurchase } from "./types"
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

app.get('/products/:id', (req: Request, res: Response)=> {
    const id = req.params.id

    const searchedItem = products.find((product)=> product.id === id)

    res.status(200).send(searchedItem)
})

app.get('/users/:id/purchases', (req: Request, res: Response)=> {
    const id = req.params.id

    const searchedItem = purchase.find((purchase)=> purchase.userid === id)

    res.status(200).send(searchedItem)
})

app.delete('/user/:id', (req: Request, res: Response)=> {
    const id = req.params.id

    const indexToBeRemoved = users.findIndex((user)=> user.id === id)

    if(indexToBeRemoved >= 0){
        users.splice(indexToBeRemoved, 1)
    }

    res.status(200).send("User deleted successfully!")
})

app.delete('/product/:id', (req: Request, res: Response)=> {
    const id = req.params.id

    const indexToBeRemoved = products.findIndex((product)=> product.id === id)

    if(indexToBeRemoved >= 0){
        products.splice(indexToBeRemoved, 1)
    }

    res.status(200).send("Product deleted successfully!")
})

app.put('/user/:id', (req: Request, res: Response)=> {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const itemToBeEdited = users.find((user)=> user.id === id)

    if(itemToBeEdited) {
        itemToBeEdited.id = newId || itemToBeEdited.id
        itemToBeEdited.email = newEmail || itemToBeEdited.email
        itemToBeEdited.password = newPassword || itemToBeEdited.id
    }

    res.status(200).send("User edited successfully!")
})

app.put('/product/:id', (req: Request, res: Response)=> {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newCategory = req.body.category as TCategory | undefined

    const newPrice = req.body.price as number

    const itemToBeEdited = products.find((product)=> product.id === id)

    if(itemToBeEdited) {
        itemToBeEdited.id = newId || itemToBeEdited.id
        itemToBeEdited.name = newName || itemToBeEdited.name
        itemToBeEdited.category = newCategory || itemToBeEdited.category

        itemToBeEdited.price = isNaN(newPrice) ? itemToBeEdited.price : newPrice
    }

    res.status(200).send("Product edited successfully!")
})