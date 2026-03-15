import { Router, type Request, type Response } from "express";
import { NoteController } from "../controller/note.controller.js";

const noteController = new NoteController();
const router = Router();

router.post("/", (req: Request, res: Response) => {
  void noteController.create(req, res);
});
router.get("/", (req: Request, res: Response) => {
  void noteController.list(req, res);
});
router.put("/:id", (req: Request, res: Response) => {
  void noteController.updateByID(req, res);
});

router.delete("/deleteAll", (req: Request, res: Response) => {
  void noteController.deleteAllRecords(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  void noteController.deleteByID(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  void noteController.getNoteByid(req, res);
});

export default router;
