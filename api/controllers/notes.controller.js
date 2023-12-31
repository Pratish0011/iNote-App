import Note from "../models/notes.model.js"
import { errorHandler } from "../utils/error.js";


export const createNote = async(req,res,next)=>{
   console.log(req.body);
   try {
    const newNote = await Note.create(req.body)
    res.status(200).json({
      message:"Added Successfully"
   })
   } catch (error) {
    next(error)
   }
}

export const updateNote = async(req,res,next)=>{
   const note = await Note.findById(req.params.id)
   if(!note){
      return next(errorHandler(404,'Note not found'))
   }
   try {
      const updatedNote = await Note.findByIdAndUpdate(
         req.params.id,
         req.body,
         {new:true}
      )
      res.status(200).json(updatedNote)
   } catch (error) {
      next(error)
   }
}

export const getNotes = async(req, res, next)=>{
  try {
   const userNotes = await Note.find({
      userRef: req.params.id
   })
   res.status(200).json(userNotes)
  } catch (error) {
   next(error)
  }
}


export const getNote = async(req, res, next)=>{
   try {
      const note = await Note.findById(req.params.id)
      if(!note){
         return next(errorHandler(404,'Note not found'))
      }
      res.status(200).json(note)
   } catch (error) {
      next(error)
   }
}

export const deleteNote = async(req, res, next)=>{
   const note = await Note.findById(req.params.id)
    if(!note){
        return next(errorHandler(404,'Note not found'))
    }
    if (req.user.id !== note.userRef){
      return next(errorHandler(401,'You can only delete your note'))
    }
   try {
      await Note.findByIdAndDelete(req.params.id)
      res.status(200).json({message:'Listing deleted Successfully'})
   } catch (error) {
      next(error)
   }
}

export const getSearchNotes = async (req, res,next) =>{
   try {
      const searchterm = req.query.searchTerm

       if(!searchterm){
         return next(errorHandler(400,"No result found"))
       }

       if (req.user.id === req.params.id) {
         const note = await Note.find({
            userRef: req.params.id,
           title: { $regex: new RegExp(searchterm, 'i') }
         })
  
           res.status(200).json(note)
       }else{
         next(errorHandler(400,"No result found"))
       }

   } catch (error) {
      next(error)
   }
}