const User = require('../model/user');
const CryptoJS = require('crypto-js');

exports.updateUser = async(req,res)=>{
    try{
        // checking if user has autherization to update user
        if (req.user.id === req.params.id || req.user.isAdmin){
            // checking if it is a password updation req then encrypting the password before updating
            if (req.body.password){
                req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOJS_KEY).toString()
            }

            // updating user
            let updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new : true})

            res.status(200).json({updatedUser})
        }
        else{
            res.status(401).json({msg : "You are not Autherized"})
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : 'Some error happened'})
    }
}


exports.deleteUser = async(req,res)=>{
    try{
        // checking if user has autherization to update user
        if (req.user.id === req.params.id || req.user.isAdmin){

            // deleting user
            await User.findByIdAndDelete(req.params.id)

            res.status(201).json({msg : "User has been deleted"})
        }
        else{
            res.status(401).json({msg : "You are not Autherized"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : 'Some error happened'})
    }
}


exports.findUser = async(req,res)=>{
    try{
        let user = await User.findById(req.params.id)
        const {password, ...otherData} = user._doc
        res.status(201).json({user : otherData});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : 'Some error happened'})
    }
}

exports.findAllUsers = async(req,res)=>{
    try{
        let onlyNew = req.query.new;
        // checking if user is Admin
        if (req.user.isAdmin){

            // finding users based on query (in desc order of _id)
            let users = onlyNew ? await User.find().sort({_id : -1}).limit(10) : await User.find()

            res.status(201).json({users})
        }
        else{
            res.status(401).json({msg : "You are not Autherized"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : 'Some error happened'})
    }
}