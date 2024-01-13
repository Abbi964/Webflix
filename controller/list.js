const List = require('../model/list');

exports.createList = async(req,res)=>{
    try{
        // checking if user is admin or not
        if (req.user.isAdmin){
            let newList = new List(req.body);

            let savedList = await newList.save();

            res.status(201).json({list : savedList})
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


exports.deleteList = async(req,res)=>{
    try{
        // checking if user is admin or not
        if (req.user.isAdmin){
            await List.findByIdAndDelete(req.params.id); 

            res.status(200).json({msg : "List has been deleted...."})
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


exports.getLists = async (req,res)=>{
    try{
        let typeQuery = req.query.type;
        let genreQuery = req.query.genre;
        let lists = [];

        if(typeQuery){
            if(genreQuery){
                // A perticular genre is selected
                lists = await List.aggregate([
                    {$sample : {size : 10}},
                    {$match : {type : typeQuery, genre : genreQuery}}
                ])
            }
            else{
                lists = await List.aggregate([
                    {$sample : {size : 10}},
                    {$match : {type : typeQuery}}
                ]) 
            }
        }
        else{
            // we are in homepage
            lists = await List.aggregate([
                {$sample : {size : 10}}
            ])
        }

        // sending lists
        res.status(200).json({lists})
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Something went wrong"})
    }
}