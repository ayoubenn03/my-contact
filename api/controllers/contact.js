const Contact = require('../models/Contact')

const getContacts = async (req, res) => {
    try {
        const result = await Contact.find({userId: req.user.id});
        res.status(200).json({result});
    } catch(error) {
        res.status(500).json({msg: error});
    }
}

const getContact = async (req, res) => {
    try {
        const result = await Contact.findOne({_id: req.params.contactID});
        if(!result) {
            return res.status(404).json({msg: 'Contact not found'});
        }
        res.status(200).json({result});
    } catch(error) {
        res.status(404).json({msg: error});
    }
}

const createContact = async (req, res) => {
    try {
        const result = await Contact.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(200).json({result});
    } catch(err) {
        res.status(500).json({msg: err});
    }
}

const updateContact = async (req, res) => {
    try {
        const userId = req.user.id;
        const contactId = req.params.contactID;
        const contact = await Contact.findById(contactId);
        
        if(!contact) {
            return res.status(404).json({message: 'Contact not found'})
        }
        if(contact.userId.toString() !== userId) {
            return res.status(403).json({message: 'Acces refusé a ce contact'})
        }
        
        await Contact.findByIdAndUpdate(contactId,
            {...req.body}, {new: true, runValidators: true}
        );
        
        res.status(200).json({message: `Le contact ${contact.firstName} ${contact.lastName} a bien été modifié`})
    } catch(err) {
        return res.status(500).json({message: err})
    }
}

const deleteContact = async (req, res) => {
    try {
        const userId = req.user.id;
        const contactId = req.params.contactID;
        const contact = await Contact.findById(contactId);
        
        if(!contact) {
            return res.status(404).json({message: "Contact introuvable"})
        }
        if(contact.userId !== userId) {
            return res.status(403).json({message:' Accès refusé'})
        }
        
        await Contact.findByIdAndDelete(contactId);
        res.status(200).json({ message: `${contact.firstName} ${contact.lastName} a bien été supprimer de vos contacts`})
    } catch(err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}