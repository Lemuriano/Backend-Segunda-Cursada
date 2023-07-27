import { Router } from "express";
import ProductManager from '../clases/Productmanager.js'


const router = Router()
const pm = new ProductManager

router.get('/', async (req, res) => {
    let listaProductos = await pm.getProducts()
    res.send(listaProductos)
})

router.post('/', (req, res) => {
    const {title, description, code, price, category, thumbnails} = req.body
    const nuevoProducto = {
        title,
        description,
        code,
        price,
        category,
        thumbnails,
    }
    pm.addProduct(nuevoProducto)
    res.send({message: 'post ok'})
})

router.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const listaProductos = await pm.getProducts();
        const productoId = listaProductos.find(prod => prod.id === Number(pid))
        if(productoId != undefined){
            return res.status(200).json(productoId)
        }
        return res.json({ message: `no existe producto con el id ${pid}`})
    } catch (error) {
        console.log(error)
        res.json({ message: 'error al obtener id'})
    }
    
})

router.put('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const {title, description, price, status, category} = req.body
        const listaProductos = await pm.getProducts();
        const prodIndex = listaProductos.findIndex(prod => prod.id === Number(pid))
        if(prodIndex !== -1){
            listaProductos[prodIndex].title = title
            listaProductos[prodIndex].description = description
            listaProductos[prodIndex].price = price
            listaProductos[prodIndex].status = status
            listaProductos[prodIndex].category = category
            await pm.updtProducts(listaProductos)
            return res.json({ message: "producto acualizado"})
        }
        return res.json({ message: `no existe producto con el id ${pid}`})
    } catch (error) {
        console.log(`'error al actualizar el archivo: ${error}`)   
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const listaProductos = await pm.getProducts();
        const productoIndex = listaProductos.findIndex(e => e.id === Number(pid))
        if(productoIndex !== -1){
            listaProductos.splice(productoIndex, 1)
            pm.updtProducts(listaProductos)
            return res.status(200).json({ message : 'producto elimindo'})
        }
        res.json({ message: `no existe producto con el id ${pid}`})
    } catch (error) {
        console.log(error)
        res.json({ message: 'error al obtener id en delete'})
    }
    
})



export default router