import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: "desc" });
    res.status(200).json({ notes });
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: `Note with ${req.params.id} ID is not found.`,
      });
    }

    res.status(200).json({
      message: `Note found.`,
      note,
    });
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const note = await newNote.save();

    res.status(201).json({
      message: "Note created successfully!",
      note,
    });
  } catch (error) {
    console.error("Error in addNote controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const foundNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!foundNote) {
      return res.status(404).json({
        message: `Note with ${req.params.id} ID is not found`,
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: foundNote,
    });
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteToDelete = await Note.findByIdAndDelete(req.params.id);

    if (!noteToDelete) {
      return res.status(404).json({
        message: `Note with ${req.params.id} ID is not found`,
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: noteToDelete,
    });
  } catch (error) {
    console.error("Error in deleteNote controller: error");
    res.status(500).json({
      message: "Internal Server Error",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};
