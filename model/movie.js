const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    desc : {type : String},
    img : {type : String},
    imgTitle : {type : String},
    banner : {type : String},
    trailer : {type : String},
    video : {type : String},
    year : {type : String},
    limit : {type : Number},
    genre : {type : String},
    isSeries : {type : Boolean, default : false},
},{timestamps : true});

module.exports = mongoose.model('Movie',movieSchema);