type CreateNoteInput = {
    title: string;
    content: string;
    tags?: string[];
};
export declare class NoteService {
    createNote(data: CreateNoteInput): Promise<{
        id: string;
        title: string;
        content: string;
        tags: string[];
        createAt: Date;
        updatedAt: Date;
    }>;
    getAllNotes(): Promise<{
        id: string;
        title: string;
        content: string;
        tags: string[];
        createAt: Date;
        updatedAt: Date;
    }[]>;
    updateNotes(id: string, data: {
        title?: string;
        content?: string;
        tags?: string[];
    }): Promise<{
        id: string;
        title: string;
        content: string;
        tags: string[];
        createAt: Date;
        updatedAt: Date;
    }>;
    deleteNotes(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        tags: string[];
        createAt: Date;
        updatedAt: Date;
    }>;
    getNoteById(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        tags: string[];
        createAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
//# sourceMappingURL=note.service.d.ts.map