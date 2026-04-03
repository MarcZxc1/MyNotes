export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createAt: string;
  updatedAt: string;
  createdAt?: string;
  updateAt?: string;
};

export type NotePayload = {
  title: string;
  content: string;
  tags: string[];
  createdAt?: string;
};

export type CreateNotePayload = NotePayload;
export type UpdateNotePayload = Partial<NotePayload>;

export type AddNoteModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  submitError: string;
  onClose: () => void;
  onSubmit: (payload: CreateNotePayload | UpdateNotePayload) => Promise<void>;
  initialData?: Note;
};
