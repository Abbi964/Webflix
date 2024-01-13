const User = require('../model/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const path = require('path')

exports.getRegister = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','login-register.html'))
}


exports.postRegister = async(req,res,next)=>{
    try{
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOJS_KEY).toString(),
        });

        let user = await newUser.save();
        res.status(201).json({user})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg : err})
    }  
}


exports.postLogin = async(req,res)=>{
    try{
        // trying to find user
        let user = await User.findOne({email : req.body.email});

        if (!user){
            res.status(401).json({msg : 'User not found'})
        }

        // decripting password to check if it matches
        let bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_KEY);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText != req.body.password){
            res.status(401).json({msg : 'Password is not correct'})
        }
        else{
            // sending jwt with id and admin info
            let accessToken = jwt.sign({id : user._id, isAdmin : user.isAdmin},process.env.JWT_KEY)
    
            const {password , ...otherdata} = user._doc
    
            res.status(201).json({user : otherdata,accessToken})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg : err})
    }
}