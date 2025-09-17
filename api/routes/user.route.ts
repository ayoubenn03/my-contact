const express = require('express')
const router = express.Router()

const  { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    register,
    login
} = require('../controllers/user.js')

router.get('/', getUsers,verifyToken)

router.get('/user', getUser)

router.post('/', createUser)

router.put('/:userID',updateUser)

router.delete('/:userID', deleteUser)

router.post('/api/register',register)

router.get('/api/login',login)

module.exports = router