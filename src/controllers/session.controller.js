import Usermanager from "../services/db/usermanager.js"

class Sessioncontroller {
    newRegiteredUser = (req, res) => {
        res.status(200).send({message:'nuevo usuario creado'})
    }

    logInUser = (req, res) =>{
        if(!req.user) return res.status(400).send({status:'Error', message:'Invalid credentials'})

        req.session.user = {
            name: req.user.name
        }

        console.log(req.user.isAdmin === true);
        if(req.user.isAdmin === true){
            req.session.isAdmin = true
        }
       
        res.status(200).send({payload:req.user})
    }

    logOffUser = async (req, res) =>{
        req.session.destroy(error =>{
            if(error){
                return res.json({status:"error", message:`La sesion no pudo finalizarse: ${error}`})
            }
        })
        res.redirect('/home')
    }
}

export default new Sessioncontroller