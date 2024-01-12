const Movie = require('../model/movie');

exports.createMovie = async(req,res)=>{
    try{
        // checking if user is admin or not
        if (req.user.isAdmin){
            let newMovie = new Movie(req.body);

            let savedMovie = await newMovie.save();

            res.status(201).json({movie : savedMovie})
        }
        else{
            res.json({msg : "You are not authorized"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Something went wrong"})
    }
}


exports.updateMovie = async(req,res)=>{
    try{
        // checking if user is admin or not
        if (req.user.isAdmin){
            let updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new : true});

            res.status(201).json({updatedMovie})
        }
        else{
            res.json({msg : "You are not authorized"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Something went wrong"})
    }
}