const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
   lastName: {
        type: String,
        required: true
   },   
   phone: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 20
   },
   userId: {
    type: String,
    required: true
   }
})
const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact