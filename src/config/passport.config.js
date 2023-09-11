import passport from "passport";
import local from "passport-local"
import userManager from "../services/db/usermanager.js";
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () =>{
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req, username, password, done) => {
            try {
                let userExist = await userManager.findUser({email:username})
                if(userExist){
                    return done(null,false)
                }
                const {name, surname, email, password} = req.body
                const newUser = {
                    name,
                    surname,
                    email,
                    password:createHash(password)
                }
                let newUserResult = await userManager.createNewUser(newUser)
                return done(null, newUserResult)
            } catch (error) {
                return done(`Error al obtener datos del usuario: ${error}`)
            }
        })
    )

    passport.use('login', new LocalStrategy({usernameField:'email'}, async(username, password, done)=>{
        try {
            const user = await userManager.findUser({email:username})
            
            if (!user || !isValidPassword(user, password)) return done(null, false)
            
            

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
    
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.fe9ab60a52bf57ad',
        clientSecret: '5bd7d0f624f06d67910e1862f5977d60484277a0',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'}, async (accessToken, refreshToken, profile, done) =>{
            try {
                console.log(profile._json)
                let user = await userManager.findUser({email:profile._json.email})
                if (!user){
                    let newUser = {
                        name:profile._json.name,
                        surname:'',
                        email:profile._json.email,
                        password:''
                    }
                    let result = await userManager.createNewUser(newUser)
                    done(null, result)
                }else{
                    done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })    

    passport.deserializeUser(async (id, done) =>{
        let user = await userManager.findUser({_id:id})
        done(null, user)
    })
}

export default initializePassport