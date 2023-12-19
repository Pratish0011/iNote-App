import express from 'express'
import { createNote,getNotes,getNote,updateNote,deleteNote, getSearchNotes} from '../controllers/notes.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create',verifyToken, createNote )
router.get('/getNotes/:id', getNotes )
router.get('/searchNotes/:id',verifyToken, getSearchNotes )
router.get('/getNote/:id', getNote )
router.post('/updateNote/:id', updateNote )
router.delete('/deleteNote/:id',verifyToken, deleteNote)

export default router