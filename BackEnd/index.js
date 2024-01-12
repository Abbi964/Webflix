require('dotenv').config()

const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Adding all Routes
const userRoute = require('./routes/users');
const listRoute = require('./routes/lists');
const movieRoute = require('./routes/movies');
const authRoute = require('./routes/auth');

// using Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// connecting to the mongoDB server
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Successfully connected to mongoDB'))
    .catch(err => console.log(err))

// redirecting request at '/' to register page
app.get('/',(req,res)=>{
    res.redirect('/auth/register')
})

// redirecting to routes
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/movie',movieRoute);


// listening on port 3000    
app.listen(3000,()=>{
    console.log('Backend Server is running')
})