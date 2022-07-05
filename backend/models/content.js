const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Note = mongoose.model('Note',contentSchema)

module.exports = Note;