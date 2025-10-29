import e from "express";
import {
    addNote,
    deleteNote,
    getAllNotes,
    getNoteById,
    updateNote,
} from "../controllers/notesController.js";

const router = e.Router();

router.get(
    "/",
    (req, res, next) => {
        console.log("getAllNotes");
        next();
    },
    getAllNotes
);
router.get("/:id", getNoteById);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
