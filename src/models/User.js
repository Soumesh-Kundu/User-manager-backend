import mongoose from 'mongoose'

const UserSchema= mongoose.Schema({
    sno:{type:Number,required:true,unique:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true},
    hobbies:[{type:String}]
})

export default mongoose.model('User',UserSchema)