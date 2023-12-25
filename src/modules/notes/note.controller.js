import { noteModel } from "../../../database/models/note.model.js";
import { userModel } from "../../../database/models/user.model.js";

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.findAll();
    res.json({ message: "All notes", notes })
  } catch (e) {
    console.log(e);
    res.status(500).send(`Server error, ${e.message}`);
  };
};

// Add note
export const addNote = async (req, res) => {
  try {
    const id = req.params.userId;
    const findUser = await userModel.findByPk(id);
    if (findUser !== null) {
      let { title, content } = req.body;
      if (title.length < 3) {
        res.status(400).json({ message: 'Invalid title' });
      } else {
        if (content.length < 3) {
          res.status(400).json({ message: 'Invalid content' });
        } else {
          const newNote = await noteModel.create(req.body);
          res.status(201).json({ message: 'Note created successfully', newNote });
        }
      }
    } else res.status(401).json({ message: "Not auth" });
  } catch (e) {
    console.error(e);
    res.status(500).send(`Server Error, ${e.message}`);
  };
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    // Find user
    const { id } = req.params;
    const findUser = await userModel.findByPk(id);
    if (findUser !== null) {
      // Find note
      const noteId = req.body.id;
      const findNote = await noteModel.findByPk(noteId);
      if (findNote !== null) {
        // Check if this creator the note
        if (findNote.dataValues.userId == id) {
          // Delete note
          await noteModel.destroy({ where: { id: noteId } });
          res.status(200).json({ message: "Successfully deleted the note." });
        } else res.status(401).json({ message: 'Not auth' });
      } else res.status(400).json({ message: 'Note note found.' });
    } else res.status(401).json({ message: 'Not auth' });
  } catch (e) {
    console.error(e);
    res.status(500).send(`Server Error, ${e.message}`);
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await userModel.findByPk(id);
    if (findUser !== null) {
      const noteId = req.body.id;
      const findNote = await noteModel.findByPk(noteId);
      if (findNote) {
        if (findNote.dataValues.userId == id) {
          await findNote.update(req.body);
          res.status(200).json({ message: 'Updated successfully.' });
        } else res.status(400).json({ message: 'Not auth' });
      } else res.status(400).json({ message: 'Not found note' });
    } else res.status(401).json({ message: 'Not auth' });
  } catch (e) {
    console.error(e);
    res.status(500).send(`Server Error, ${e.message}`);
  }
};

// Get all notes with owner
export const getAllNotesWUsers = async (req, res) => {
  try {
    const getAllNotesWUsers = await noteModel.findAll({
      include: {
        model: userModel,
        attributes: ['name', 'email', 'id', 'age']
      }
    })
    res.status(200).json({ message: "success", getAllNotesWUsers });
  } catch (e) {
    console.log("Error: ", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};