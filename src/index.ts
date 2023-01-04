import { Category } from "./types"
import {createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase} from "./database"

//EX1
// console.log(createUser("4fs6d5f46s", "Lucas Calabria", "blablabla3"))
// console.log(getAllUsers())

//EX2
// console.log(createProduct("d79a87sd", "Brooklyn Nets Jersey", 200, Category.CLOTHES_AND_SHOES))
// console.log(getAllProducts())
// console.log(getProductById("prodid1"))

//EX3
console.log(queryProductsByName("Nike"))
console.log(createPurchase("myiduser", "productsid", 2, 400))
