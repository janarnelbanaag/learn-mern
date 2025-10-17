import e from "express";
import {
    addNote,
    deleteNote,
    getAllNotes,
    updateNote,
} from "../controllers/notesController.js";

const router = e.Router();

router.get("/", getAllNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
