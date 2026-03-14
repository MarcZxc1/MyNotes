import { prisma } from "../lib/prisma.js";
export class NoteService {
    async createNote(data) {
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
    async updateNotes(id, data) {
        return prisma.note.update({
            where: { id },
            data,
        });
    }
    async deleteNotes(id) {
        return prisma.note.delete({
            where: { id },
        });
    }
    async getNoteById(id) {
        return prisma.note.findUnique({
            where: {
                id,
            },
        });
    }
}
//# sourceMappingURL=note.service.js.map