import { TUser, TProduct, TPurchase, TPurchaseProducts, TPurchaseWithProducts } from "./types"
import { db } from './database/knex'

import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//USERS

//GetAllUsers
app.get('/users', async (req: Request, res: Response) => {
    try {

        const result = await db("users")
        res.status(200).send({ users: result })

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//SearchUser
app.get('/users/search/:name', async (req: Request, res: Response) => {
    try {
        const q = req.params.name

        if (q !== undefined) {
            if (q.length <= 1) {
                res.status(400)
                throw new Error("Your search must have more then 1 letter")
            }
            if (typeof q !== "string") {
                res.status(400)
                throw new Error("Invalid Search, must be a string")
            }
        }

        const result = await db("users").where("name", "LIKE", `%${q}%`)
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

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Invalid ID, must be a string")
        }

        if (id.length < 4) {
            res.status(400)
            throw new Error("Invalid ID, must have at least 4 characters")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Invalid Name, must be a string")
        }

        if (name.length < 2) {
            res.status(400)
            throw new Error("Invalid Name, must have at least 2 characters")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("Invalid Email, must be a string")
        }

        if (email.includes("@")) {
        } else {
            res.status(400)
            throw new Error("Invalid Email, try again")
        }

        const [userId]: TUser[] | undefined[] = await db("users").where({ id })

        if (userId) {
            res.status(400)
            throw new Error("Invalid ID, this user already exists")
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

        const [user]: TUser[] | undefined[] = await db("users").where({ id: idToEdit })

        if (user) {
            const updatedUser = {
                id: newId || user.id,
                name: newName || user.name,
                password: newPassword || user.password
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

//DeleteUserById
app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete !== undefined) {
            if (typeof idToDelete !== "string") {
                res.status(400)
                throw new Error("Invalid ID, must be a string")
            }
            if (idToDelete.length < 1) {
                res.status(400)
                throw new Error("Invalid ID, must have at least 2 characters")
            }
        }

        const [user]: TUser[] | undefined[] = await db("users").where({ id: idToDelete })

        if (user) {
            await db("users").del().where({ id: idToDelete })
        } else {
            res.status(404)
            throw new Error("Invalid ID, try again.");
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

//PRODUCTS

//GetAllProducts
app.get('/products', async (req: Request, res: Response) => {
    try {

        const result = await db("products")
        res.status(200).send({ products: result })

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//SearchProducts
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error("Your search must have more then 1 letter")
        }

        if (typeof q !== "string") {
            res.status(400)
            throw new Error("Invalid Search, must be a string")
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

//CreateProduct
app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageUrl

        if (typeof id !== "string") {
            res.status(200)
            throw new Error("Invalid Id, must be a text")
        }
        if (typeof name !== "string") {
            res.status(200)
            throw new Error("Invalid name, must be a text")
        }
        if (name.length < 1 || id.length < 1) {
            res.status(400)
            throw new Error("Invalid id or name, must be a bigger than 1")
        }

        const [product]: TProduct[] | undefined[] = await db("products").where({ id })

        if (product) {
            res.status(400)
            throw new Error("This Product already exists")
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

//GetProductByID
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db("products").where("id", "=", `${id}`)

        res.status(200).send(result)
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

        if (idToDelete !== undefined) {
            if (typeof idToDelete !== "string") {
                res.status(400)
                throw new Error("Invalid ID, must be a string")
            }
            if (idToDelete.length < 1) {
                res.status(400)
                throw new Error("Invalid ID, must have at least 2 characters")
            }
        }

        const [product]: TProduct[] | undefined[] = await db("products").where({ id: idToDelete })

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

        const [product]: TProduct[] | undefined[] = await db("products").where({ id: idToEdit })

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

        res.status(200).send("Product updated successfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
});

//PURCHASE

//GetAllPurchases
app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const result = await db("purchases")
        res.status(200).send({ purchases: result })
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
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("Invalid ID , must be a string")
            }
        }

        if (buyerId !== undefined) {
            if (typeof buyerId !== "string") {
                res.status(400)
                throw new Error("Invalid Buyer.")
            }
        }

        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({ id })

        if (purchase) {
            res.status(400)
            throw new Error("Buyer ID not found")
        }

        const newPurchase = {
            id,
            buyer_id: buyerId,
            total_price: totalPrice,
            paid,
        }
        await db("purchases").insert(newPurchase)
        res.status(201).send("Purchase created sucesfully!")

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

        if(!result) {
            res.status(400)
            throw new Error("ID not found")
        }

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//EditPurchaseById
app.put('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newTotalPrice = req.body.TotalPrice
        const newPaid = req.body.paid
        const newCreatedAt = req.body.CreatedAt

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

        if (newTotalPrice !== undefined) {
            if (typeof newTotalPrice !== "number") {
                res.status(400)
                throw new Error("Invalid Total Price, must be a number")
            }

            if (newTotalPrice < 0) {
                res.status(400)
                throw new Error("Invalid Total Price, must be positive")
            }
        }

        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({ id: idToEdit })

        if (purchase) {
            const updatedProduct = {
                id: newId || purchase.id,
                total_price: newTotalPrice || purchase.total_price,
                paid: newPaid || purchase.paid,
                createdAt: newCreatedAt || purchase.createdAt
            }
            await db("purchases")
                .update(updatedProduct)
                .where({ id: idToEdit })
        } else {
            res.status(404)
            throw new Error("Invalid ID, try again!")
        }

        res.status(200).send("Purchase edited successfully!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
});

//DeletePurchaseById
app.delete('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({ id: idToDelete })

        if (purchase) {
            await db("products").del().where({ id: idToDelete })
        } else {
            res.status(404)
            throw new Error("Invalid ID try again.");
        }
        res.status(200).send("Purchase deleted successfully!")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

                        //PURCHASE_PRODUCTS

//CreatePurchaseWithProducts
app.post("/purchase/:purchaseId/products/:productId/:quantity", async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId
        const purchaseId = req.params.purchaseId
        const quantity = req.params.quantity

        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({ id: purchaseId })

        if (!purchase) {
            res.status(404)
            throw new Error("'purchaseId' not found")
        }

        const [product]: TProduct[] | undefined[] = await db("products").where({ id: productId })

        if (!product) {
            res.status(404)
            throw new Error("'productId' not found")
        }

        const newPurchaseForProducts: TPurchaseProducts = {
            purchase_id: purchaseId,
            product_id: productId,
            quantity
        }

        await db("purchases_products").insert(newPurchaseForProducts)
        res.status(200).send(`New purchase created successfully`)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected Error")
        }
    }
})

//DeletePurchaseWithProducts
app.delete("/purchase/:purchaseId/products/:productId", async (req: Request, res: Response) => {
    try {
        const purchaseIdToDelete = req.params.purchaseId
        const productIdToDelete = req.params.productId

        const [product]: TProduct[] | undefined[] = await db("products").where({ id: productIdToDelete })

        if (!product) {
            res.status(404)
            throw new Error("'productId' not found")
        }

        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({ id: purchaseIdToDelete })

        if (!purchase) {
            res.status(404)
            throw new Error("'purchaseId' not found")
        }

        await db("purchases_products").del()
            .where({ purchase_id: purchaseIdToDelete })
            .andWhere({ product_id: productIdToDelete })

        res.status(200).send(`Purchase deleted from user successfully`)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected Error")
        }
    }
})

//GetPurchasesWithProducts
app.get("/purchaseproducts", async (req: Request, res: Response) => {
    try {

        const purchases: TPurchase[] = await db("purchases")

        const result: TPurchaseWithProducts[] = []

        for (let purchase of purchases) {
            const listOfProducts = []
            const purchases_products: TPurchaseProducts[] = await db("purchases_products").where({ purchase_id: purchase.id })
            
            for (let purchases_product of purchases_products) {
                const [ product ]: TProduct[] = await db("products").where({ id: purchases_product.product_id })
                listOfProducts.push(product)
            }

            const newPurchaseWithProducts: TPurchaseWithProducts = {
                ...purchase,
                listOfProducts
            }

            result.push(newPurchaseWithProducts)
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected Error")
        }
    }
})