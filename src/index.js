import express from "express"
import productsRoutes from './routes/products.routes.js'
import cartRoutes from './routes/carts.routes.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productsRoutes)
app.use("/api/cart", cartRoutes)


app.get("/", (req, res)=>{
    res.send({"server": "on"})
})

app.listen(PORT, () =>{
    console.log(`server running at port ${PORT}`);
})