import Usermanager from "../services/db/usermanager.js"

class Sessioncontroller {
    newRegiteredUser = async (req, res) => {
    try {
        const {name, surname, email, password} = req.body
        const newUser = {
            name,
            surname,
            email,
            password
        }
        const newUserResult = await Usermanager.createNewUser(newUser)
        res.send({status:"cheto", payload:newUserResult})
    } catch (error) {
        res.status(201).send(error)  
    }}

    logInUser = async (req, res) =>{
        const {email, password} = req.body
        let user = {
            email:email,
            password:password
        }
        let logInResult = await Usermanager.findUser(user)
        if (logInResult){
            res.send({status:"userOK"})
        }else{
            res.status(204).send()
        }
    }
}

export default new Sessioncontroller