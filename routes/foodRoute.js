import express from 'express'
import { addFood } from '../controllers/food Controller.js'
import multer from 'multer'
import auth from '../middlewares/auth.js';

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),(addFood))








export default foodRouter;