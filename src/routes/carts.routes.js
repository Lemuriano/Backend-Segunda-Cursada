import { Router } from "express";
import CartManager from '../clases/Cartmanager.js'
import ProductManager from "../clases/Productmanager.js";


const router = Router()
const cartManager = new CartManager
const productManager = new ProductManager

router.post('/', async (req, res) => {
    try {
        const nuevoCart = await cartManager.newCart()
        res.json({ message : `el carrito con id ${nuevoCart.id} ha sido creado`})
    } catch (error) {
        console.log(`error al aniadir el producto debido a ${error}`)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params
        const listDeCarritos = await cartManager.getCarts()
        const carritoId = listDeCarritos.find(e => e.id == cid)
        res.json({ message : `pagina del carrito con ID ${carritoId.id}`, ...carritoId})    
    } catch (error) {
        console.log(error)
        res.json({message: "error al ingresar producto"})
    }
    
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params
        //se busca la existencia de los id en las bases de datos de los carritos y de los productos
        
        const listDeCarritos = await cartManager.getCarts()
        const carritoId = listDeCarritos.find(e => e.id === Number(cid)) || undefined
        

        const listaProductos = await productManager.getProducts();
        const productoId = listaProductos.find(prod => prod.id === Number(pid))


        if (carritoId === undefined || productoId === undefined){
            return res.json({ message : `carrito o producto inexistente`})
        }
        
        //se busca el producto en el carrito existente, si existe se suma la cantiad, sino se crea un objeto nuevo
        const productoIdEnCarrito = carritoId["products"].find(prod => prod.id === Number(pid))

        if (productoIdEnCarrito){
            productoIdEnCarrito.quantity ++
        }else {
            const producto = {
                        id : Number(pid),
                        quantity : 1
                    }
                    carritoId["products"].push(producto)
                    await cartManager.updtCarts(listDeCarritos)
                    return res.json({ message : `el carrito con id ${cid} ha sido actualizado`, ...carritoId})

        }

        await cartManager.updtCarts(listDeCarritos)
        res.json({ message : `el carrito con id ${cid} ha sido actualizado`, ...carritoId})
    } catch (error) {
        console.log(`error al añadir el producto debido a ${error}`)
    }
})


export default router