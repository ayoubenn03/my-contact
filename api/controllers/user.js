const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = (async (req,res) => {
    try{
  const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    res.status(200).json({email: user.email})
    } catch(error) {
        res.status(500).json({error:error})
    }
 

})

const getUser = ((req,res) => {
    User.findOne({_id: req.params.userID}).then(result => res.status(200).json({result})).catch(()=>res.status(404).json({msg: error}))
})

const createUser = ((req,res) => {
    User.create(req.body).then(result => res.status(200).json({result})).catch((err)=>res.status(500).json({msg: err}))
})

const updateUser = ((req,res) => {
    User.findOneAndUpdate({_id: req.params.userID}, req.body,({new:true, runValidators:true})).then(result => res.status(200).json({result})).catch((err)=>res.status(404).json({msg: 'User pas trouvé'}))
})

const deleteUser = ((req,res) => {
    User.findOneAndDelete({_id: req.params.userID}).then(result => res.status(200).json({result})).catch(()=>res.status(404).json({msg: 'User pas trouve'}))
})

 const register =  (async (req,res)=> {
    dateCreation = Date.now();
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser) {
            return res.status(400).json({error:'User already exist'})
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            email: req.body.email,
            password: hashedPass,
            createdAt:  dateCreation
        })

        await newUser.save();
        res.status(201).json({message: 'Your account has been registered'})

    } catch(err){
            res.status(500).json({error:err})
        }
    })

    const login = (async (req,res) => {
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user) {
                return res.status(401).json({message: 'Invalid email or password'});
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password)

            if(!passwordMatch) {
                return res.status(401).json({message: 'Invalid email or password'})
            }

            const token = jwt.sign({ id: user._id, email: user.email}, 'secret');
            res.status(200).json({token})


        } catch(error){
            res.status(500).json({error:error})
        }
    })


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    register
}