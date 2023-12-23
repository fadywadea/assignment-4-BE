import express from 'express';
import { addNote, deleteNote, getAllNotes, getAllNotesWUsers , updateNote } from './note.controller.js';

const router = express.Router();
const baseUrl = "/note";


// Get all notes
router.get(baseUrl, getAllNotes);

// Add new note
router.post(`${baseUrl}/:userId`, addNote);

// Delete note
router.delete(`${baseUrl}/:id`, deleteNote);

// Update note
router.patch(`${baseUrl}/:id`, updateNote);

// Get all notes with their owners
router.get('/ownersNotes', getAllNotesWUsers);

export default router;