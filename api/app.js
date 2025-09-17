
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const contacts = require('./controllers/contact')
const contact_routes = require ('./routes/contact.route')


require('dotenv').config()
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(Error))



app.use(express.json())
app.use('/api/contacts', contact_routes)