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
            // "new : true" insures that new updated movie is returned and not the old one 

            res.status(200).json({updatedMovie})
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


exports.deleteMovie = async(req,res)=>{
    try{
        // checking if user is admin or not
        if (req.user.isAdmin){
            await Movie.findByIdAndDelete(req.params.id); 

            res.status(200).json({msg : "Movie has been deleted...."})
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


exports.findMovie = async(req,res)=>{
    try{
        let movie = await Movie.findById(req.params.id);

        res.status(200).json({movie})
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Something went wrong"})
    }
}


exports.findRandomMovie = async(req,res)=>{
    try{
        let type = req.query.type;

        let movie;
        // sending movie ir series based on type
        if (type === 'series'){
            movie = await Movie.aggregate([
                {$match : {isSeries : true}},
                {$sample : {size : 1}}
            ])
        }
        else{
            movie = await Movie.aggregate([
                {$match : {isSeries : false}},
                {$sample : {size : 1}}
            ])
        }

        res.status(200).json({movie})
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Something went wrong"})
    }
}


exports.findAllMovies = async(req,res)=>{
    try{
        if (req.user.isAdmin){
            let movies = await Movie.find();

            res.status(200).json({movies : movies.reverse()});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Something went wrong"})
    }
}