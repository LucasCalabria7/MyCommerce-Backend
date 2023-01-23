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
        const result = await db.raw(`
        SELECT * FROM users;
        `)
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
        const result = await db.raw(`
        SELECT * FROM products;
        `)
        res.status(200).send({products: result})
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

        const result = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE "%${q}%";
        `)
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
        const createdAt = req.body.createdAt as string

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
                    throw new Error("You can't create 2 users with the same email")
                }
            }

        await db.raw(`
        INSERT INTO users (id, name, password)
        VALUES("${id}","${name}", "${email}", "${password}", "${createdAt}");
        `)
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


        await db.raw(`
        INSERT INTO products (id, name, price, category)
        VALUES("${id}", "${name}", "${price}, "${description}", "${imageUrl}");
        `)
        res.status(201).send(`${name} created sucesfully!`)
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
        const buyer = req.body.buyer
        const totalprice = req.body.totalPrice
        const createdAt = req.body.createdAt
        const paid = req.body.paid


        if (id !== undefined) {
            if(id !== "string"){
                res.status(400)
                throw new Error("There's no user with this id")
            }
        }

        if (buyer !== undefined) {
            if(buyer !== "string"){
                res.status(400)
                throw new Error("There's no product with this id")
            }
        }

        // if (productid * quantity !== totalprice) {
        //     res.status(400)
        //     throw new Error("Total prices doesn't match")
        // }

        await db.raw(`
        INSERT INTO products (id, buyer, totalprice, createdAt, paid)
        VALUES("${id}", "${buyer}", "${totalprice}, "${createdAt}", "${paid}");
        `)
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

        const result = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
        `)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE id = "${id}";
        `)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// app.delete('/user/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const indexToBeRemoved = users.findIndex((user) => user.id === id)

//         if (!indexToBeRemoved) {
//             res.status(400)
//             throw new Error("There's no user with this ID to remove")
//         }

//         if (indexToBeRemoved >= 0) {
//             users.splice(indexToBeRemoved, 1)
//         }

//         res.status(200).send("User deleted successfully!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

// app.delete('/product/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const indexToBeRemoved = products.findIndex((product) => product.id === id)

//         if (!indexToBeRemoved) {
//             res.status(400)
//             throw new Error("There's no product with this ID to remove")
//         }

//         if (indexToBeRemoved >= 0) {
//             products.splice(indexToBeRemoved, 1)
//         }

//         res.status(200).send("Product deleted successfully!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

// app.put('/user/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const newId = req.body.id as string | undefined
//         const newEmail = req.body.email as string | undefined
//         const newPassword = req.body.password as string | undefined

//         if (newId !== undefined) {
//             if (id === newId) {
//                 res.status(400)
//                 throw new Error("You already have this ID")
//             }
//             for (let user of users) {
//                 if (user.id === newId) {
//                     res.status(400)
//                     throw new Error("This ID already exists")
//                 }
//             }
//         }

//         if (newEmail !== undefined) {
//             for (let user of users) {
//                 if (user.email === newEmail) {
//                     res.status(400)
//                     throw new Error("This email already exists")
//                 }
//             }
//         }

//         const itemToBeEdited = users.find((user) => user.id === id)

//         if (!itemToBeEdited) {
//             res.status(400)
//             throw new Error("This ID doesn't exist")
//         }

//         if (itemToBeEdited) {
//             itemToBeEdited.id = newId || itemToBeEdited.id
//             itemToBeEdited.email = newEmail || itemToBeEdited.email
//             itemToBeEdited.password = newPassword || itemToBeEdited.id
//         }

//         res.status(200).send("User edited successfully!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

// app.put('/product/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const newId = req.body.id as string | undefined
//         const newName = req.body.name as string | undefined
//         const newCategory = req.body.category as TCategory | undefined

//         const newPrice = req.body.price as number

//         if (newId !== undefined) {
//             if (id === newId) {
//                 res.status(400)
//                 throw new Error("The product already have this ID")
//             }
//             for (let product of products) {
//                 if (product.id === newId) {
//                     res.status(400)
//                     throw new Error("This ID already exists")
//                 }
//             }
//         }

//         if (newName !== undefined) {
//             for (let product of products) {
//                 if (product.name === newName) {
//                     res.status(400)
//                     throw new Error("This name already exists")
//                 }
//             }
//         }

//         const itemToBeEdited = products.find((product) => product.id === id)

//         if (!itemToBeEdited) {
//             res.status(400)
//             throw new Error("This Product ID doesn't exist")
//         }

//         if (itemToBeEdited) {
//             itemToBeEdited.id = newId || itemToBeEdited.id
//             itemToBeEdited.name = newName || itemToBeEdited.name
//             itemToBeEdited.category = newCategory || itemToBeEdited.category

//             itemToBeEdited.price = isNaN(newPrice) ? itemToBeEdited.price : newPrice
//         }

//         res.status(200).send("Product edited successfully!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })