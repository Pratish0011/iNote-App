import express from 'express'
import { createNote,getNotes,getNote,updateNote} from '../controllers/notes.controller.js'

const router = express.Router()

router.post('/create', createNote )
router.get('/getNotes/:id', getNotes )
router.get('/getNote/:id', getNote )
router.post('/updateNote/:id', updateNote )

export default router