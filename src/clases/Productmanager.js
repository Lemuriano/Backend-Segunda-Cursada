import fs from 'fs'
import __dirname from "../utils.js"
import readDb from "./Readdb.js"


class Product{
    constructor(title, description, code, price, stock, category, thumbnails){
        this.title = title,
        this.description = description,
        this.code = code,
        this.price = price,
        this.status = true,
        this.stock = stock,
        this.category = category,
        this.thumbnails = thumbnails
        this.id
    }
}

class ProductManager {
    #productList
    #productDirPath
    #productFilePath

    constructor(){
        this.#productList = new Array()
        this.#productDirPath = __dirname + '/db'
        this.#productFilePath = this.#productDirPath + "/products.json"
    }


    addProduct = async (nuevoProducto) =>{
        try {
            const listProducts = await readDb(this.#productDirPath, this.#productFilePath)
            const {title, description, code, price, stock, category, thumbnails} = nuevoProducto
            let newProduct = new Product (title, description, code, price, stock, category, thumbnails)
            this.#productList = JSON.parse(listProducts)
            this.#productList.length < 1?
                newProduct.id = 1 
                : newProduct.id = this.#productList.length + 1
            this.#productList.push(newProduct)
            
            await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#productList, null, '\t'))
            return this.#productList
        } catch (error) {
            return error
        }
    }

    getProducts = async () =>{
        try {
            const listProducts = await readDb(this.#productDirPath, this.#productFilePath)
            this.#productList = JSON.parse(listProducts)
            return this.#productList
        } catch (error) {
            return error
        }
    }

    updtProducts = async(listaProductosActualizada) =>{
        try {
            if(await fs.existsSync(this.#productFilePath)){
                await fs.promises.writeFile(this.#productFilePath, JSON.stringify(listaProductosActualizada))
                return console.log('lista actualizada')    
            }
        } catch (error) {
            console.log('error al escribir lista de archivos')
        }
    }
}

export default ProductManager