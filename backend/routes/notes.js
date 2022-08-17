const express = require('express');
const router = express.Router();
const Note = require('../models/content')
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

router.get("/fetchnotes",fetchuser,async(req,res)=>{
    try {
        const note = await Note.find({user:req.user})
        res.status(200).json(note);
    } catch (error) { 
        res.status(500).json({error:"Internal server error"});
    }
})

router.post("/addnote",fetchuser,[
    body('title','invalid email').isLength({ min: 3 }),
    body('description','username must be of min 5 characters').isLength({ min: 5 }),
],async(req,res)=>{

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {title,description} = req.body
        const note =  new Note({
            user : req.user,
            title : title,
            description : description
        })
        const saveNote  = await note.save();
        res.status(200).json({saveNote})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
    
})

router.put("/updatenote/:id",fetchuser,async(req,res)=>{

    try {

    const {title,description} = req.body;

    const newNote = {}
    if(title){
        newNote.title = title
    }
    if(description){
        newNote.description = description
    }

    let note = await Note.findById(req.params.id);

    if(!note){
        return res.status(404).json({error:"page not found"});
    }
    if(note.user.toString() !== req.user){
        return res.status(404).json({error:"page not found"});
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.status(200).json(note);

    } 
    catch (error) {
        console.log(error);
        res.send(400).json({error:"bad request"});
    }
})

router.delete("/deletenote/:id",fetchuser,async(req,res)=>{

    try {

    let note = await Note.findById(req.params.id);

    if(!note){
        return res.status(404).json({error:"page not found"});
    }
    if(note.user.toString() !== req.user){
        return res.status(404).json({error:"page not found"});
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({success:"successfully deleted"});

    } 
    catch (error) {
        console.log(error);
        res.send(400).json({error:"bad request"});
    }
})
module.exports = router;