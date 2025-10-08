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
    type: String,
    required: false
   },
   userId: {
    type: String,
    required: true
   }
})
const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact