const Contact = require('../models/Contact')

const getContacts = ((req,res)=> {
    Contact.find({userId: req.user.id}).then(result => res.status(200).json({result}))
})

const getContact = ((req,res) => {
    Contact.findOne({_id: req.params.contactID}).then(result => res.status(200).json({result})).catch((error)=>res.status(404).json({msg: error}))
})

const createContact = ((req,res) => {
    Contact.create({
        ...req.body,
        userId: req.user.id
    }).then(result => res.status(200).json({result})).catch((err)=>res.status(500).json({msg: err}))
})

const updateContact = async (req,res) => {
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
    res.status(200).json({message: `Le contact'${contact.firstName}a bien été ajouté`})
   } catch(err) {
    return res.status(500).json({message: err})
   }
}

const deleteContact = async (req,res) => {
    try{
        const userId = req.user.id;
        const contactId = req.params.contactID
        const contact = await Contact.findById(contactId);
        if(!contact) {
            return res.status(404).json({message: "Contact introuvable"})
        }
        if(contact.userId !== userId) {
            return res.status(403).json({message:' Accès refusé'})
        }
        await Contact.findByIdAndDelete(contactId)
        res.status(200).json({ message: `${contact.firstName} a bien été supprimer de vos contacts`})
    } catch(err) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
   
}



module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}