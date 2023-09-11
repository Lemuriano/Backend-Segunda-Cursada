import usersModel from "./models/users.js";

class Usermanager {
    
    createNewUser = async ({name, surname, email, password}) => {
        const newUserResult = await usersModel.create({name,surname,email,password})
        return newUserResult
    }

    findUser = async (email) =>{
        const isUserCredentialsCorrect= await usersModel.findOne(email)
        return isUserCredentialsCorrect
    }
}

export default new Usermanager