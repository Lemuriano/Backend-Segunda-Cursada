import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection  = "products"

const stringTypeRequired = {
    type: String,
    requied: true
}

const numberTypeRequired = {
    type: Number,
    requied: true
}

const productsSchema = new mongoose.Schema({
    title: stringTypeRequired,
    description: stringTypeRequired,
    code:{
        type: String,
        unique: true
    },
    price: numberTypeRequired,
    status: Boolean,
    category: stringTypeRequired,
    thumbnails:{
        type: Array,
        default:[]
    }
})

productsSchema.plugin(mongoosePaginate)

const productModel = new mongoose.model(productsCollection, productsSchema)

export default productModel