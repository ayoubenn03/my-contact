
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const contact_routes = require ('./routes/contact.route')
const user_routes = require ('./routes/user.route')


require('dotenv').config()
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    }))
    .catch((err) => console.log(err))



app.use(express.json())
app.use('/api/contacts', contact_routes)
app.use('/api/users', user_routes)