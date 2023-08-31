import mongoose from "mongoose";

const db = 'ProyectoCoder'

// Servers para pruebas online/host

// const server = `mongodb+srv://bernabegoitia:0pU9UELbPziCZxUO@cluster0.dkag3v1.mongodb.net/${db}?retryWrites=true&w=majority`
const server = `mongodb://localhost:27017/${db}`


export const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(server);
        console.log("Conectado con exito a MongoDB usando Moongose.")
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}