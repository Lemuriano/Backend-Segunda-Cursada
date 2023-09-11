import { Router } from "express";
import Sessioncontroller from "../controllers/session.controller.js";
import passport from "passport";

const router = Router()

router.post('/register',passport.authenticate('register',{failureRedirect:'/error'}),Sessioncontroller.newRegiteredUser)

router.get('/failregister', (req, res) =>{
    res.send({status:'error', message:'error al inciar sesion'})
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/error'}), Sessioncontroller.logInUser)

router.get('/logout', Sessioncontroller.logOffUser)

router.get('/github', passport.authenticate('github',{scope:['user:email']}), async (req, res) => {})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/'}), async (req, res) =>{
    req.session.user = req.user
    res.redirect('/products')
})

export default router