export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updateAt: string;
};

export type AddNotePayload = {
  title: string;
  content: string;
  tags: string[];
};

export type AddNoteModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  submitError: string;
  onClose: () => void;
  onSubmit: (payload: AddNotePayload) => Promise<void>;
};
