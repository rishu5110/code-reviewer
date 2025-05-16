const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    questions : {
        type: Array,
        default: []

        // {
        //     date : "",
        //     qid : "",
        //     title : "",
        // }

    }
})

module.exports = mongoose.model('userModel',userSchema);