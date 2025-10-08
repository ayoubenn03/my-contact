const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
   password: {
        type: String,
        required: true,
        minLength: 6
   }, 
   createdAt:{
        type:String,
        required:true,
        
   }
})
const User = mongoose.model('User', UserSchema)

module.exports = User