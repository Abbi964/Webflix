const path = require('path')

exports.getAdminDashboardPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','adminDashboard.html'))
}