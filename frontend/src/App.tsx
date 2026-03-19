import { useEffect, useState } from "react";
import Card from "./components/Card.tsx";
import "./index.css";
import axios from "axios";
import type {
  CreateNotePayload,
  Note,
  UpdateNotePayload,
} from "./types /notes.type";
import AddNoteModal from "./components/AddNoteModal";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add state for Editing
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchNotes = async () => {
    try {
      setError("");
      const res = await axios.get<Note[]>(API_BASE_URL);
      setNotes(res.data);
    } catch {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {
      alert("Failed to delete note. Please try again.");
    }
  };

  const handleEditClick = (id: string) => {
    const noteToEdit = notes.find((n) => n.id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsModalOpen(true);
    }
  };

  const handleCreateOrUpdateNote = async (
    payload: CreateNotePayload | UpdateNotePayload,
  ) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      if (editingNote) {
        await axios.put(`${API_BASE_URL}/${editingNote.id}`, payload);
      } else {
        await axios.post(API_BASE_URL, payload);
      }

      await fetchNotes();
      handleCloseModal();
    } catch {
      setSubmitError(
        editingNote ? "Failed to update note" : "Failed to create note",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setSubmitError("");
  };

  return (
    <main className="min-h-screen w-full bg-[#000000] px-4 py-8 sm:px-6 md:px-10">
      <section className="mx-auto w-full max-w-5xl rounded-xl bg-white/10 p-4 backdrop-blur sm:p-6 md:p-10">
        <div className="grid grid-cols-3 items-center">
          <div />
          <h1 className="text-center text-base font-bold text-white sm:text-xl md:text-3xl">
            Notes
          </h1>
          <div className="justify-self-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-white text-black font-semibold px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-2 md:text-base hover:bg-gray-200"
            >
              Add Notes
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-6 w-full max-w-5xl">
        {!loading && !error && (
          <Card
            notes={notes}
            onDelete={handleDeleteNote}
            onEdit={handleEditClick}
          />
        )}
      </div>

      <AddNoteModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        submitError={submitError}
        initialData={editingNote ?? undefined}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrUpdateNote}
      />
    </main>
  );
}

export default App;
