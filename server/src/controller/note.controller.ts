import type { Request, Response } from "express";
import { NoteService } from "../services/note.service.js";

const noteService = new NoteService();

type NotePayload = {
  title: string;
  content: string;
  tags: string[];
};

type UpdateNoteInput = Partial<NotePayload>;
type UpdateNoteBody = Partial<Record<keyof NotePayload, unknown>>;

function areStringArraysEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export class NoteController {
  async create(req: Request, res: Response) {
    try {
      const note = await noteService.createNote(req.body);
      return res.status(201).json(note);
    } catch {
      return res.status(500).json({
        error: "Failed to create note",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const getList = await noteService.getAllNotes();
      return res.json(getList);
    } catch {
      return res.status(500).json({
        error: "Failed to fetch notes",
      });
    }
  }

  async getNoteByid(req: Request, res: Response) {
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateByID(req: Request, res: Response) {
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

      const body = req.body as UpdateNoteBody;
      const updateData: UpdateNoteInput = {};

      if (typeof body.title === "string") {
        const title = body.title.trim();
        if (title.length === 0) {
          return res.status(400).json({ error: "Title cannot be empty" });
        }
        updateData.title = title;
      }

      if (typeof body.content === "string") {
        const content = body.content.trim();
        if (content.length === 0) {
          return res.status(400).json({ error: "Content cannot be empty" });
        }
        updateData.content = content;
      }

      if (
        Array.isArray(body.tags) &&
        body.tags.every((tag) => typeof tag === "string")
      ) {
        updateData.tags = body.tags;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          error: "No valid fields to update. Use title, content, or tags.",
        });
      }

      const unchangedTitle =
        updateData.title === undefined || updateData.title === existing.title;
      const unchangedContent =
        updateData.content === undefined ||
        updateData.content === existing.content;
      const unchangedTags =
        updateData.tags === undefined ||
        areStringArraysEqual(updateData.tags, existing.tags ?? []);

      if (unchangedTitle && unchangedContent && unchangedTags) {
        return res.status(409).json({
          error:
            "Note not updated: submitted data is the same as current data.",
          note: existing,
        });
      }

      const updated = await noteService.updateNotes(id, updateData);
      return res.json(updated);
    } catch {
      return res.status(500).json({ error: "Failed to update note" });
    }
  }

  async deleteByID(req: Request, res: Response) {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;

      if (!id) {
        return res.status(400).json({ error: "Note id is required" });
      }

      await noteService.deleteNotes(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2025"
      ) {
        return res.status(404).json({ error: "Note not found" });
      }

      return res.status(500).json({ error: "Failed to delete the note" });
    }
  }

  async deleteAllRecords(req: Request, res: Response) {
    try {
      const result = await noteService.deleteAllnotes();
      res.status(200).json({
        message: "All records were deleted",
        count: result.count,
      });
    } catch {
      res.status(500).json({
        message: "Failed to delete all notes",
      });
    }
  }
}
