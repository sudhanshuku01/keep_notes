import  express from 'express';
import Note from '../Models/Notes.js'
import fetchUser from '../Middleware/fetchuser.js';
import  { body,validationResult } from 'express-validator'
const  router=express.Router();
//get all notes router
router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id});
        if(!notes){
          res.status(200).json({success:true,message:'Empty Notes.Please make the note for as your memory',notes:[]})
        }
        res.status(200).json({success:true,note:notes})
    }catch(error){
      console.error(error.message);
      res.status(500).json({success:false,message:"internal server error"});
    }
})
//add a new note
router.post('/addnote',fetchUser,[
    body('title',"title must be at least 3 character").isLength({min:3}),
    body('description',"desc. must be at least 5 character").isLength({min:5})
],async (req,res)=>{
 try{
      const {title,description,tag}=req.body;
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({success:false,message:errors.array()})
      }
    //   console.log(req.user.id)
      const note=new Note({
        title:title,
        description:description,
        tag:tag,
        user:req.user.id
      })
      const savedNote=await note.save();
      res.status(200).json({success:true,message:"note added succussfully",note:savedNote})
 }catch(error){
 console.error(error.message);
 res.status(500).json({success:false,message:"Internal Server Error!!"})
 }
})
// route 3 update note
router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    let note= await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({success:false,message:"notes not found"});
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).json({success:false,message:'action not allowed'})
    }
    note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({success:true,message:"note updated successfully",note:note})
}catch(error){
    console.error(error.message);
    res.status(500).json({success:false,message:"Internal Server Error"})
}
})
//route 4 delete note
router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
    try {
        let note =await Note.findById(req.params.id);
        if(!note){ return res.status(404).json({success:false,message:"item not found try again"})}
        if(note.user.toString() !==req.user.id){
          return res.status(401).json({success:false,message:'Action not allowed'})
        }
        note=await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true,message:'notes deleted successfully',note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
})

export default router;