const Contact = require('../models/Contact')

const getContacts = ((req,res)=> {
    Contact.find({}).then(result => res.status(200).json({result}))
})

const getContact = ((req,res) => {
    Contact.findOne({_id: req.params.contactID}).then(result => res.status(200).json({result})).catch((error)=>res.status(404).json({msg: error}))
})

const createContact = ((req,res) => {
    Contact.create(req.body).then(result => res.status(200).json({result})).catch((err)=>res.status(500).json({msg: err}))
})

const updateContact = ((req,res) => {
    Contact.findOneAndUpdate({_id: req.params.contactID}, req.body,({new:true, runValidators:true})).then(result => res.status(200).json({result})).catch((err)=>res.status(404).json({msg: 'Contact pas trouvé'}))
})

const deleteContact = ((req,res) => {
    Contact.findOneAndDelete({_id: req.params.contactID}).then(result => res.status(200).json({result})).catch(()=>res.status(404).json({msg: 'Contact pas trouve'}))
})



module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}