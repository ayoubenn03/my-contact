const express = require('express')
const router = express.Router()

const  { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contact.js')

router.get('/', getContacts)

router.get('/:contactID', getContact)

router.post('/', createContact)

router.put('/:contactID',updateContact)

router.delete('/:contactID', deleteContact)

module.exports = router