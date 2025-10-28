import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({ message: "Internal Server Error:", error });
    }
};

export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });

        const savedNote = await newNote.save();

        res.status(201).json({
            message: "Note created successfully!",
            ...savedNote.toObject(),
        });
    } catch (error) {
        console.error("Error in addNote controller:", error);
        res.status(500).json({ message: "Internal Server Error:", error });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const foundNote = await Note.findByIdAndUpdate(req.params.id, {
            title,
            content,
        });
        res.status(200).json({
            message: "Note updated successfully",
            ...foundNote,
        });
    } catch (error) {}
    res.status(200).json({
        message: "Note updated successfully!",
    });
};

export const deleteNote = (req, res) => {
    res.status(200).json({
        message: "Note deleted successfully!",
    });
};
