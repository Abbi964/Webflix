const path = require('path')

exports.getAdminDashboardPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','adminDashboard.html'))
}

exports.verify = (req,res)=>{
    try{
        let user = req.user;

        if(user.isAdmin){
            res.status(200).json({isAdmin : true})
        }
        else{
            res.json({msg  : 'not admin'})
        }
    }
    catch(err){
        console.log(err)
    }
}