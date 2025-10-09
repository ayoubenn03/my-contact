
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const contact_routes = require ('./routes/contact.route')
const user_routes = require ('./routes/user.route')
const cors = require('cors')

 const swaggerUi = require('swagger-ui-express');
   const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config()
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    }))
    .catch((err) => console.log(err))

 // Swagger definition
   // Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My Contact API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Enter your JWT token ',
        },
      },
    },
    security: [
      {
        jwtAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};


   const swaggerDocs = swaggerJSDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({
  origin: '*', 
  credentials: true
}))
app.use(express.json())
app.use('/api/contacts', contact_routes)
app.use('/api/users', user_routes)