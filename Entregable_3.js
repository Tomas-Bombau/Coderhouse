const express = require("express")
const fs = require("fs")
const app = express()
const PORT = 8080


app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`)
})

app.get("/", async (req, res) => {
    res.send("Esta es la página de inicio")
})

app.get("/products?", async (req, res) => {
    const { limit } = req.query
    try {
        const products = await fs.promises.readFile("./productManager.json")
        const allProducts = JSON.parse(products)
        if(!limit) {
            res.status(200)
            res.json(allProducts)
        } else {
            const limitedProducts = allProducts.slice(0, limit)
            res.status(200)
            res.json(limitedProducts)
        }
    } catch (error) {
        throw Error (`Ocurrió un ${error}`)
    }
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const products = await fs.promises.readFile("./productManager.json")
        const allProducts = JSON.parse(products)
        const productById = allProducts.find(product => product.id === Number(id))
        productById ? res.status(200).json(productById) : res.send("No existe producto asociado a ese ID")
    } catch (error) {
        throw Error (`Ocurrió un ${error}`)
    }
})

//! Realizar HTML