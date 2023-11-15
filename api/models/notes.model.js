import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userRef:{
        type: String,
        required: true
    }
},{timestamps: true})

const Note = mongoose.model("Note", notesSchema)

export default Note