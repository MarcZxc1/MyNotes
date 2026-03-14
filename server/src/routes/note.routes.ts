import { Router } from "express";
import { NoteController } from "../controller/note.controller.js";

const noteController = new NoteController();
const router = Router();

router.post("/", (req, res) => noteController.create(req, res));
router.get("/", (req, res) => noteController.list(req, res));
router.put("/:id", (req, res) => noteController.updateByID(req, res));
router.delete("/:id", (req, res) => noteController.deleteByID(req, res));

router.get("/:id", (req, res) => noteController.getNoteByid(req, res));
export default router;
