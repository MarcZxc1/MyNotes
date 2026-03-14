import { NoteService } from "../services/note.service.js";
import { error } from "node:console";
const noteService = new NoteService();
function areStringArraysEqual(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}
export class NoteController {
    async create(req, res) {
        try {
            const note = await noteService.createNote(req.body);
            return res.status(201).json(note);
        }
        catch {
            return res.status(500).json({
                error: "Failed to create note",
            });
        }
    }
    async list(req, res) {
        try {
            const getList = await noteService.getAllNotes();
            return res.json(getList);
        }
        catch {
            return res.status(500).json({
                error: "Failed to fetch notes",
            });
        }
    }
    async getNoteByid(req, res) {
        try {
            const rawId = req.params.id;
            const id = Array.isArray(rawId) ? rawId[0] : rawId;
            if (!id) {
                return res.status(400).json({ error: "Id is required" });
            }
            const note = await noteService.getNoteById(id);
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            return res.json(note);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async updateByID(req, res) {
        try {
            const rawId = req.params.id;
            const id = Array.isArray(rawId) ? rawId[0] : rawId;
            if (!id) {
                return res.status(400).json({ error: "Note id is required" });
            }
            const existing = await noteService.getNoteById(id);
            if (!existing) {
                return res.status(404).json({ error: "Note not found" });
            }
            const body = req.body;
            const updateData = {};
            if (typeof body.title === "string") {
                updateData.title = body.title.trim();
            }
            if (body.title == "") {
                return res.json({ error: "dasdsadsd" });
            }
            if (typeof body.content === "string") {
                updateData.content = body.content.trim();
            }
            if (Array.isArray(body.tags) &&
                body.tags.every((tag) => typeof tag === "string")) {
                updateData.tags = body.tags;
            }
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    error: "No valid fields to update. Use title, content, or tags.",
                });
            }
            const unchangedTitle = updateData.title === undefined || updateData.title === existing.title;
            const unchangedContent = updateData.content === undefined ||
                updateData.content === existing.content;
            const unchangedTags = updateData.tags === undefined ||
                areStringArraysEqual(updateData.tags, existing.tags ?? []);
            if (unchangedTitle && unchangedContent && unchangedTags) {
                return res.status(409).json({
                    error: "Note not updated: submitted data is the same as current data.",
                    note: existing,
                });
            }
            const updated = await noteService.updateNotes(id, updateData);
            return res.json(updated);
        }
        catch {
            return res.status(500).json({ error: "Failed to update note" });
        }
    }
    async deleteByID(req, res) {
        try {
            const rawId = req.params.id;
            const id = Array.isArray(rawId) ? rawId[0] : rawId;
            if (!id) {
                return res.status(400).json({ error: "Note id is required" });
            }
            await noteService.deleteNotes(id);
            return res.status(204).send();
        }
        catch (error) {
            if (typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === "P2025") {
                return res.status(404).json({ error: "Note not found" });
            }
            return res.status(500).json({ error: "Failed to delete the note" });
        }
    }
}
//# sourceMappingURL=note.controller.js.map