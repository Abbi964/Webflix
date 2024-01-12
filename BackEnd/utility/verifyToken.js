const jwt = require('jsonwebtoken');
const User = require('../model/user')

async function verifyToken (req,res,next){
    try{
        let token = req.headers.authorization
        if (token){
            let data = jwt.verify(token,process.env.JWT_KEY);
            let userId = data.id;

            // finding user based on id passing it to next middleware
            let user = await User.findById(userId);
            req.user = user;
            next();
        }
        else{
            res.status(401).json({msg : 'You are not authorized'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : 'Some error happened'})
    }

}

module.exports = verifyToken;