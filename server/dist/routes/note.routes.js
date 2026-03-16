import { Router } from "express";
import { NoteController } from "../controller/note.controller.js";
const noteController = new NoteController();
const router = Router();
router.post("/", (req, res) => {
    void noteController.create(req, res);
});
router.get("/", (req, res) => {
    void noteController.list(req, res);
});
router.put("/:id", (req, res) => {
    void noteController.updateByID(req, res);
});
router.delete("/deleteAll", (req, res) => {
    void noteController.deleteAllRecords(req, res);
});
router.delete("/:id", (req, res) => {
    void noteController.deleteByID(req, res);
});
router.get("/:id", (req, res) => {
    void noteController.getNoteByid(req, res);
});
export default router;
//# sourceMappingURL=note.routes.js.map