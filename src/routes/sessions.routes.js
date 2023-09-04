import { Router } from "express";
import Sessioncontroller from "../controllers/session.controller.js";

const router = Router()

router.post('/register', Sessioncontroller.newRegiteredUser)

router.post('/login', Sessioncontroller.logInUser)

// router.post('/logoffuser', (req, res) =>{
//     res.send()
// })

export default router