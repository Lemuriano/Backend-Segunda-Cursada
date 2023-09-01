import Productmanager from "../services/db/Productmanager.js"
// import Productmanager from "../services/fs/Productmanager.js"


class Productcontroller{

    getProducts = async (req, res) => {
        try {
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const {category, status} = req.query
            const sortOrder = req.query.sort === "asc" || req.query.sort === "desc"? req.query.sort : false
            const filter = {}
    
            if(category){
                filter.category = { $regex: `\\b${category}\\b`, $options: 'i' }
            }
    
            if(status){
                filter.status = status
            }
           
            let listaProductos = await Productmanager.getProducts(limit,page,filter,sortOrder)
            res.send({status:"succes", payload:listaProductos})
        } catch (error) {
            res.send({message:`Error al lista de archivos de la base de datos: ${error}`})

        }
    }
    
    getProductsById = async (req, res) => {
        try {
            const {pid} = req.params
            let productById = await Productmanager.getProductsById(pid)
            res.send({result:"Succes", payload:productById})
        } catch (error) {
            res.send({message: `Error al obtener id:${error}`})
        }
       
    }

    viewProducts = async (req, res) => {
        try {
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const {category, status} = req.query
            const sortOrder = req.query.sort === "asc" || req.query.sort === "desc"? req.query.sort : false
            const filter = {}
    
            if(category){
                filter.category = { $regex: `\\b${category}\\b`, $options: 'i' }
            }
    
            if(status){
                filter.status = status
            }


            let productList = await Productmanager.getProducts(limit,page,filter,sortOrder)
            

            //se captura la url de la solicitud, se parsean sus querys y se actualizan a partir del objeto obtenido. Esto permite que no importa el orden de las querys, los objetos prevLink y netxLink funcionan
            
            let parsedUrl = req.originalUrl
            

            let isQueryEmpty = JSON.stringify(req.query) === '{}'
            
            if(isQueryEmpty){
                parsedUrl += '?'
            }
            
            const parsedUrlParams = new URLSearchParams(parsedUrl)

            if(productList.hasNextPage === true){
                if(parsedUrlParams.has('page')){
                    parsedUrlParams.set('page', productList.page +1)
                    const urlToString = parsedUrlParams.toString()
                    const decodedUrl = decodeURIComponent(urlToString)
                    
                    productList.nextLink = decodedUrl
                }
                else{
                    parsedUrlParams.append('page', productList.page +1)
                    const urlToString = parsedUrlParams.toString()
                    const decodedUrl = decodeURIComponent(urlToString)
                    productList.nextLink = decodedUrl
                }
            }else{
                productList.prevLink = null
            }

            if(productList.hasPrevPage){
                if(parsedUrlParams.has('page')){
                    parsedUrlParams.set('page', productList.page -1)
                    parsedUrlParams.toString()
                    const decodedUrl = decodeURIComponent(parsedUrlParams)
                    productList.prevLink = decodedUrl
                }else{
                    parsedUrlParams.append('page', productList.page -1)
                    parsedUrlParams.toString()
                    const decodedUrl = decodeURIComponent(parsedUrlParams)
                    productList.prevLink = decodedUrl
                }
            }else{
                productList.prevLink = null
            }
            
            //conversion del objeto de mongo para renderizarlo en handlebars
            let productListJSON = JSON.parse(JSON.stringify(productList))

            res.render('products', {
                productListJSON,
                style:"index.css"
            })
        } catch (error) {
            res.send({message:`Error al lista de archivos de la base de datos: ${error}`})

        }
    }

    viewProductsById = async (req, res) => {
        try {
            const {pid} = req.params
            const productById = await Productmanager.getProductsById(pid)
            console.log(productById)
            res.render('prodetails', {
                productById,
                style:"index.css"
            })
        } catch (error) {
            res.send({message: `Error al obtener id:${error}`})
        }
    }
    
    addProducts = async (req, res) => {
        try {
            const {title, description, code, price, category, thumbnails} = req.body
            const nuevoProducto = {
                title,
                description,
                code,
                price,
                category,
                thumbnails,
            }
            let nuevoProductoPayload = await Productmanager.addProducts(nuevoProducto)
            res.send({status:"Producto agregado", payload: nuevoProductoPayload})
        } catch (error) {
            res.send({message:`Error al añadir producto a la base de datos: ${error}`})
        }
    }

    updateProducts = async (req, res) => {
        try {
            const {pid} = req.params
            const productUpdated = req.body
            let updateResult = await Productmanager.updateProducts(pid, productUpdated)
            res.send({result:"Succes", payload:updateResult})
        } catch (error) {
            res.sed({message: 'Id no encontrado'})   
        }
    }
    
    deleteProducts = async (req, res) => {
        try {
            const {pid} = req.params
            let deleteResult = await Productmanager.deleteProducts(pid)
            res.send({result:'Succes', payload:deleteResult})
        } catch (error) {
            res.send({ message: 'Error al eliminar producto'})   
        }
        
    }
}

export default new Productcontroller