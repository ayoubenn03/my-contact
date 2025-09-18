const express = require('express')
const router = express.Router()
const {getUsers, getUser, createUser, updateUser, deleteUser, register, login } = require('../controllers/user.js')
const verifyToken = require('../middleware/user.middleware.js')

router.post('/register',register)

router.post('/login',login)

router.get('/', verifyToken,getUsers)

router.get('/user', getUser)

router.post('/', createUser)

router.put('/:userID',updateUser)

router.delete('/:userID', deleteUser)


module.exports = router
