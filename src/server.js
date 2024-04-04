import express from 'express'
import {config} from 'dotenv'
import connectToDB from './db.js'
import cors from 'cors'
import {route as userRoute}  from './routes/user.js'
import {route as mailRoute}  from './routes/sender.js'
config()

const app=express()
const PORT=process.env.PORT ?? 5000
connectToDB()

app.use(cors())
app.use(express.json())
app.use('/api/user',userRoute)
app.use('/api/send',mailRoute)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})