const router = require('express').Router();
const CryptoJS = require("crypto-js");
const User = require('../model/user')

// Register
router.post('/register',async(req,res)=>{
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
        res.status(500).json({msg : err})
    }  
})

// Login
router.post('/login',async(req,res)=>{
    try{
        // trying to find user
        let user = await User.findOne({email : req.body.email});

        if (!user){
            res.status(401).json({msg : 'User not found'})
        }

        // decripting password to check if it matches
        let bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_KEY);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
    }
    catch(err){
        res.status(500).json({msg : err})
    }
})

module.exports = router;