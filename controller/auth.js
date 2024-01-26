const User = require('../model/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')

exports.getRegister = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','login-register.html'))
}


exports.postRegister = async(req,res,next)=>{
    try{
        // first checking if user already exists or not
        let result = await User.findOne({
            $or : [{username : req.body.username},{email : req.body.email}]
        })
        console.log(result)
        if (result){
            res.json({msg : "User already exists"})
        }
        else{
            // hashing the password and creating new user
            bcrypt.hash(req.body.password,10,async(err,hash)=>{
                if(err){
                    res.json({msg : "Something went wrong"})
                }
                else{
                    const newUser = new User({
                        username : req.body.username,
                        email : req.body.email,
                        password : hash,

                    });
                    let user = await newUser.save();
                    res.status(201).json({user})
                }
            })
        }
    
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
        else{
            // comparing password to check if it matches
            bcrypt.compare(req.body.password,user.password,(err,same)=>{
                if(err){
                    res.json({msg : 'Something went wrong'})
                }
                else if(same){
                    // sending jwt with id and admin info
                    let accessToken = jwt.sign({id : user._id, isAdmin : user.isAdmin},process.env.JWT_KEY)
            
                    const {password , ...otherdata} = user._doc
            
                    res.status(201).json({user : otherdata,accessToken})
                }
                else{
                    res.status(401).json({msg : 'Password is not correct'})
                }
            })
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({msg : err})
    }
}