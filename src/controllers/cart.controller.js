import { Mongoose } from "mongoose"
import Cartmanager from "../services/db/Cartmanager.js"
import Productmanager from "../services/db/Productmanager.js"
// import ProductManager from "../services/fs/Productmanager.js"

class Cartcontroller{

    createCarts = async (req, res) => {
        try {
            let newCartPayload = await Cartmanager.createCart()
            res.send({status:"Nuevo carrito creado", payload: newCartPayload})
        } catch (error) {
            res.send({message:`Error al añadir producto a la base de datos: ${error}`})
        }
    }

    getCarts = async (req, res) => {
        try {
            let cartsList = await Cartmanager.getCarts()
            res.send({status:"succes", payload:cartsList})
        } catch (error) {
            res.send({message:`Error al obtener lista de carrito: ${error}`})

        }
    }
    
    getCartsById = async (req, res) => {
        try {
            const {cid} = req.params
            let cartByIdResultPayload = await Cartmanager.getCartsById(cid)
            res.send({result:"Succes", payload:cartByIdResultPayload})
        } catch (error) {
            res.send({message: `Error al obtener id:${error}`})
        }
       
    }
    
    updateCart = async (req, res) => {
        try {
            const {cid} = req.params
            const productUpdated = req.body
            let updateResult = await Cartmanager.updateCart(cid, productUpdated)
            
            res.send({result:"Succes", payload:updateResult})
        } catch (error) {
            res.send({message: 'Id no encontrado'})   
        }
    }

    updateProductQuantity = async (req, res) => {
        try {
            const {cid, pid} = req.params
            const quantity = parseInt(req.body.quantity)
            let updateResult = await Cartmanager.updateCartProductById(cid, pid, quantity)
            
            res.send({result:"Succes", payload:updateResult})
        } catch (error) {
            res.send({message: 'Id no encontrado'})   
        }
    }
    
    deleteAllCartProducts = async (req, res) => {
        try {
            const {cid} = req.params
            let deleteResult = await Cartmanager.deleteProducts(cid)
            res.send({result:'Succes', payload:deleteResult})
        } catch (error) {
            res.send({ message: 'Error al eliminar producto'})   
        }
        
    }

    viewCartProducts = async (req, res) => {
        try {
            const {cid} = req.params
            let cartByIdResult = await Cartmanager.getCartsById(cid)
            res.render('carts', cartByIdResult)
        } catch (error) {
            res.send({message: `Error al obtener id:${error}`})
        }
       
    }
}

export default new Cartcontroller