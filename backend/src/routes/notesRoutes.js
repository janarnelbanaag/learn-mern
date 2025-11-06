import e from "express";
import {
    addNote,
    deleteNote,
    getAllNotes,
    getNoteById,
    updateNote,
} from "../controllers/notesController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { rateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const notesRoutes = e.Router();

notesRoutes.use(verifyToken);
notesRoutes.use(rateLimitMiddleware(2, 60 * 1000));

notesRoutes.get("/", getAllNotes);
notesRoutes.get("/:id", getNoteById);
notesRoutes.post("/", addNote);
notesRoutes.put("/:id", updateNote);
notesRoutes.delete("/:id", deleteNote);

export default notesRoutes;
