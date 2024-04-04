import express from 'express'
import User from '../models/User.js'

export const route = express.Router()

route.post('/add', async (req, res) => {
    try {
        const { name, email, phone, hobbies } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "user already exists with this email" })
        }
        const time=Date.now().toString()
        const sno=time.slice(time.length-7)
        await User.create({ name, email, phone, hobbies,sno})
        return res.status(201).json({ message: "user created" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errro: "Internal Server Error" })
    }
})

route.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({ data: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errro: "Internal Server Error" })
    }
})
route.delete('/remove', async (req, res) => {
    try {
        const {ids}=req.body
        await User.deleteMany({_id:{$in:ids}})
        return res.status(200).json({messsage:"user removed"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errro: "Internal Server Error" })
    }
})

route.put('/update/:id',async(req,res)=>{
    try {
        const user_id=req.params.id
        const user=await User.findById(user_id)
        if(!user){
            return res.status(400).json({error:"user doesn't exist"})
        }
        await User.updateOne({_id:user_id},{$set:{...req.body}})
        return res.status(200).json({message:"user updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errro: "Internal Server Error" })
    }
})