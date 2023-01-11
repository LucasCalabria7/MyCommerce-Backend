import { TCategory, TUser, TProduct, TPurchase } from "./types"
import { users, products, purchase } from "./database"


import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error("Your search must have more then 1 letter")
        }

        const filteredSearch = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        res.status(200).send(filteredSearch)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.post('/users', (req: Request, res: Response) => {
    try {
        const id = req.body.id as string 
        const email = req.body.email as string
        const password = req.body.password as string

        for (let user of users) {
            if (id !== undefined) {
                if (id === user.id) {
                    res.status(400)
                    throw new Error("You can't create 2 users with the same id")
                }
            }

            if (email !== undefined) {
                if (email === user.email) {
                    res.status(400)
                    throw new Error("You can't create 2 users with the same email")
                }
            }
        }

        const newUser: TUser = {
            id,
            email,
            password
        }
        users.push(newUser)
        res.status(201).send("User created sucesfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.post('/products', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category

        if (id !== undefined) {
            for (let product of products) {
                if (product.id === id) {
                    res.status(400)
                    throw new Error("You can't create 2 products with the same id")
                }
            }
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }
        products.push(newProduct)
        res.status(201).send("Product created sucesfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.post('/purchases', (req: Request, res: Response) => {
    try {
        const userid = req.body.userId
        const productid = req.body.productId
        const quantity = req.body.quantity
        const totalprice = req.body.totalPrice

        const findIdUser = purchase.find((purchase) => userid === purchase.userid)

        if (!findIdUser) {
            res.status(400)
            throw new Error("There's no user with this id")
        }

        const findIdProduct = purchase.find((purchase) => productid === purchase.productid)

        if (!findIdProduct) {
            res.status(400)
            throw new Error("There's no product with this id")
        }

        if (productid * quantity !== totalprice) {
            res.status(400)
            throw new Error("Total prices doesn't match")
        }
        const newPurchase: TPurchase = {
            userid,
            productid,
            quantity,
            totalprice
        }
        purchase.push(newPurchase)
        res.status(201).send("Purchase created sucesfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const searchedItem = products.find((product) => product.id === id)

        if (!searchedItem) {
            res.status(400)
            throw new Error("There's no Product with this ID")
        }

        res.status(200).send(searchedItem)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const searchedItem = purchase.find((purchase) => purchase.userid === id)

        if (!searchedItem) {
            res.status(400)
            throw new Error("There's no purchases with this user ID")
        }

        res.status(200).send(searchedItem)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.delete('/user/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToBeRemoved = users.findIndex((user) => user.id === id)

        if (!indexToBeRemoved) {
            res.status(400)
            throw new Error("There's no user with this ID to remove")
        }

        if (indexToBeRemoved >= 0) {
            users.splice(indexToBeRemoved, 1)
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

app.delete('/product/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToBeRemoved = products.findIndex((product) => product.id === id)

        if (!indexToBeRemoved) {
            res.status(400)
            throw new Error("There's no product with this ID to remove")
        }

        if (indexToBeRemoved >= 0) {
            products.splice(indexToBeRemoved, 1)
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

app.put('/user/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newId !== undefined) {
            if (id === newId) {
                res.status(400)
                throw new Error("You already have this ID")
            }
            for (let user of users) {
                if (user.id === newId) {
                    res.status(400)
                    throw new Error("This ID already exists")
                }
            }
        }

        if (newEmail !== undefined) {
            for (let user of users) {
                if (user.email === newEmail) {
                    res.status(400)
                    throw new Error("This email already exists")
                }
            }
        }

        const itemToBeEdited = users.find((user) => user.id === id)

        if (!itemToBeEdited) {
            res.status(400)
            throw new Error("This ID doesn't exist")
        }

        if (itemToBeEdited) {
            itemToBeEdited.id = newId || itemToBeEdited.id
            itemToBeEdited.email = newEmail || itemToBeEdited.email
            itemToBeEdited.password = newPassword || itemToBeEdited.id
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

app.put('/product/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newCategory = req.body.category as TCategory | undefined

        const newPrice = req.body.price as number

        if (newId !== undefined) {
            if (id === newId) {
                res.status(400)
                throw new Error("The product already have this ID")
            }
            for (let product of products) {
                if (product.id === newId) {
                    res.status(400)
                    throw new Error("This ID already exists")
                }
            }
        }

        if (newName !== undefined) {
            for (let product of products) {
                if (product.name === newName) {
                    res.status(400)
                    throw new Error("This name already exists")
                }
            }
        }

        const itemToBeEdited = products.find((product) => product.id === id)

        if (!itemToBeEdited) {
            res.status(400)
            throw new Error("This Product ID doesn't exist")
        }

        if (itemToBeEdited) {
            itemToBeEdited.id = newId || itemToBeEdited.id
            itemToBeEdited.name = newName || itemToBeEdited.name
            itemToBeEdited.category = newCategory || itemToBeEdited.category

            itemToBeEdited.price = isNaN(newPrice) ? itemToBeEdited.price : newPrice
        }

        res.status(200).send("Product edited successfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})