const express = require('express');
const app= express();
const port = 5010;
const cors= require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
const Notes= require('./notes');



app.get('/',(req,res)=>{
    res.send('Hello I am Dewmin Kasmitha Deniyegedara and I am a full-stack developer');

});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (err) {
        console.error(err); // Log the error to the console for debugging
        res.status(500).json({ message: err.message });
    }
});

app.post('/notes',async (req,res)=>{
    const note= new Notes(req.body);
    try{
        const newNote= await note.save();
        res.status(201).json(newNote);
    }catch(err){
        res.status(400).json({message: err.message})
    }
});

app.patch('/notes/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const note= await Notes.findById(req.params.id);
        if(note){
            note.set(req.body);
            const updatedNote = await note.save();
            res.json(updatedNote);
        }else{
            res.status(404).json({message: 'Saved note not found. Please Check your ID'});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.delete('/notes/:id', async(req,res)=>{
    try{
        const note= await Notes.findById(req.params.id);//params is an inbuilt function in express
        if(note){
            await Notes.deleteOne({_id:note._id});
            res.json({message: 'Note has been deleted successfully'});
        }else{
            res.status(404).json({message:'Note not found. Please check the ID'});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
});
