const List = require('../model/list');
const path = require('path')

exports.getCreateListPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','create-list.html'))
}

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


exports.getAllLists = async(req,res)=>{
    try{
        if(req.user.isAdmin){
            let lists = await List.find()
            res.status(200).json({lists})
        }
        else{
            res.status(401).json({msg : "You are not autherized"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg : "Something Went Wrong"})
    }
}


exports.getLists = async (req, res) => {
    try {
        let typeQuery = req.query.type;
        let genreQuery = req.query.genre;
        let lists = [];

        // initiating a pipeline 'filter' for aggrigation later
        let pipeline = [
            { $sample: { size: 10 } }
        ];

        if (typeQuery !== 'all') {
            if (genreQuery) {
                // A particular genre is selected
                pipeline.push(
                    // adding match filter into pipeline
                    { $match: { type: typeQuery, genre: genreQuery } }
                );
            } else {
                pipeline.push(
                    { $match: { type: typeQuery } }
                );
            }
        }

        // Adding $lookup stage to populate 'content' field with 'Movie' documents
        pipeline.push(
            {
                $lookup: {
                    from: 'movies', 
                    localField: 'content',
                    foreignField: '_id',
                    as: 'contentDetails'
                }
            }
        );

        // Execute the aggregation
        lists = await List.aggregate(pipeline);

        // sending lists
        res.status(200).json({ lists });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong" });
    }
}
