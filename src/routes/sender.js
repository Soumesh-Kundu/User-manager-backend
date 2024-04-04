import express from 'express'
import User from '../models/User.js'
import mailSender from '../helper/mail.js'
import { config } from 'dotenv'
import createMailMessage from '../helper/jsonToMail.js'
config()
export const route = express.Router()

route.post('/',async (req,res)=>{
    try {
        const {ids}=req.body
        if(!ids.length){
            return res.status(400).json({error:"No ids selected"})
        }
        const users=await User.find({_id:{$in:ids}})
        const message=createMailMessage(users)
        const mailBody={
            to:process.env.RECIEVER,
            from:{
                name:process.env.SENER_NAME,
                email:process.env.SENDER_EMAIL
            },
            subject:"Request data from User.Table",
            body:message
        }
        await mailSender(mailBody)
        res.status(200).json({message:"data sent"})
    } catch (error) {
        console.log(error),
        res.status(500).json({error:"Internal Server Error"})
    }
})