import { prisma } from "../lib/prisma.js";

type CreateNoteInput = {
  title: string;
  content: string;
  tags?: string[];
};

type UpdateNoteInput = {
  title?: string;
  content?: string;
  tags?: string[];
};

export class NoteService {
  async createNote(data: CreateNoteInput) {
    return prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags ?? [],
      },
    });
  }

  async getAllNotes() {
    return prisma.note.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
  }

  async updateNotes(
    id: string,
    data: { title?: string; content?: string; tags?: string[] },
  ) {
    return prisma.note.update({
      where: { id },
      data,
    });
  }

  async deleteNotes(id: string) {
    return prisma.note.delete({
      where: { id },
    });
  }

  async deleteAllnotes() {
    return prisma.note.deleteMany();
  }

  async getNoteById(id: string) {
    return prisma.note.findUnique({
      where: {
        id,
      },
    });
  }
}
