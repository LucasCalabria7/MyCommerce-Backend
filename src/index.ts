import { TCategory, TUser, TProduct, TPurchase } from "./types"
import { db } from './database/knex'

import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//GetAllUsers
app.get('/users', async (req: Request, res: Response) => {
    try {

        const result = await db("users")
        res.status(200).send({users: result})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//GetAllProducts
app.get('/products', async (req: Request, res: Response) => {
    try {

        const result = await db("products")
        res.status(200).send({products: result})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


//GetAllPurchases
app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const result = await db("purchases")
        res.status(200).send({purchases: result})
    } catch (error: any) {

        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//SearchProducts
app.get('/products/search', async  (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error("Your search must have more then 1 letter")
        }

        const result = await db("products").where("name", "LIKE", `%${q}%`)
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//CreateUser
app.post('/users', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string 
        const name = req.body.name as string 
        const email = req.body.email as string
        const password = req.body.password as string

            if (id !== undefined) {
                if (id.length < 1) {
                    res.status(400)
                    throw new Error("ID Invalid, must have at least 2 letters")
                }
            }

            if (email !== undefined) {
                if (email.includes("@")) {
                } else {
                    res.status(400)
                    throw new Error("Invalid Email, please try again.")
                }
            }

        const newUser = {
            id, 
            name,
            email,
            password
        }

        await db("users").insert(newUser)
        res.status(200).send(`${name}, Created successfully.`)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//CreateProduct
app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageUrl

        if(typeof id !== "string") {
            res.status(200)
            throw new Error("Invalid Id, must be a text")
        }
        if( typeof name !== "string") {
            res.status(200)
            throw new Error("Invalid name, must be a text")
        }
        if(name.length <1 || id.length <1)  {
            res.status(400)
            throw new Error("Invalid id or name, must be a bigger than 1")
        }

        const newProduct = {
            id, 
            name,
            price,
            description,
            imageUrl
        }
        await db("products").insert(newProduct)
        res.status(200).send(`${name} created sucesfully!`)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//CreatePurchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyerId = req.body.buyer_id
        const totalPrice = req.body.total_price
        const paid = req.body.paid


        if (id !== undefined) {
            if(id !== "string"){
                res.status(400)
                throw new Error("Invalid ID , must be a string")
            }
        }

        if (buyerId !== undefined) {
            if(buyerId !== "string"){
                res.status(400)
                throw new Error("Invalid Buyer.")
            }
        }

        const newPurchase = {
            id, 
            buyerId, 
            totalPrice,
            paid, 
        }
        await db("purchase").insert(newPurchase)
        res.status(201).send("Purchase created sucesfully!")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//GetProductByID
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db("purchases").where("id", "=", `${id}`)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//GetPurchaseById
app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db("purchases").where("id", "=", `${id}`)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


//DeleteUserById
app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [user] = await db("users").where({ id: idToDelete })

        if (user) {
            await db("users").del().where({ id: idToDelete })
        } else {
            res.status(404)
            throw new Error("Invalid ID try again.");
        }
        res.status(200).send("User deleted successfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


//DeleteProductById
app.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [product] = await db("products").where({ id: idToDelete })

        if (product) {
            await db("products").del().where({ id: idToDelete })
        } else {
            res.status(404)
            throw new Error("Invalid ID try again.");
        }
        res.status(200).send("Product deleted successfully!")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


//EditUserByID
app.put('/user/:id', async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPassword = req.body.password

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("Invalid ID, must be a string")
            }

            if (newId.length < 1) {
                res.status(400)
                throw new Error("Invalid ID, must have at least 2 letters")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Invalid Name, must be a text")
            }

            if (newName.length < 1) {
                res.status(400)
                throw new Error("Invalid Name, must have at least 2 letters")
            }
        }

        const [user] = await db("users").where({ id: idToEdit })

        if (user) {
            const updatedUser = {
                id: newId || user.id,
                name: newName || user.name,
                password: newPassword || user.passowrd
            }
            await db("users")
                .update(updatedUser)
                .where({ id: idToEdit })
        } else {
            res.status(404)
            throw new Error("Invalid ID, try again!")
        }


        res.status(200).send("User edited successfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


//EdiProductById
app.put('/product/:id', async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.imageURL

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("Invalid ID, must be a string")
            }

            if (newId.length < 1) {
                res.status(400)
                throw new Error("Invalid ID, must have at least 2 letters")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Invalid Name, must be a text")
            }

            if (newName.length < 1) {
                res.status(400)
                throw new Error("Invalid Name, must have at least 2 letters")
            }
        }

        const [product] = await db("products").where({ id: idToEdit })

        if (product) {
            const updatedProduct = {
                id: newId || product.id,
                name: newName || product.name,
                price: newPrice || product.price,
                description: newDescription || product.description,
                imageUrl: newImageUrl || product.imageUrl
            }
            await db("products")
                .update(updatedProduct)
                .where({ id: idToEdit })
        } else {
            res.status(404)
            throw new Error("Invalid ID, try again!")
        }

        res.status(200).send("Product edited successfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
});