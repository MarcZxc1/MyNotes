import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./index.css";
import axios from "axios";
import type { Note } from "./types /notes.type";
import AddNoteModal, { type AddNotePayload } from "./components/AddNoteModal";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleCreateNote = async (payload: AddNotePayload) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      await axios.post(API_BASE_URL, payload);
      await fetchNotes();
      setIsModalOpen(false);
    } catch {
      setSubmitError("Failed to create note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full  bg-[#000000] px-4 py-8 sm:px-6 md:px-10  ">
      <section className="mx-auto w-full max-w-5xl rounded-xl bg-white/10 p-4 backdrop-blur sm:p-6 md:p-10">
        <div className="grid grid-cols-3 items-center">
          <div />
          <h1 className="text-center text-base font-bold  text-white sm:text-xl md:text-3xl">
            Notes
          </h1>
          <div className="justify-self-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="
    rounded-md bg-white text-black font-semibold
    px-2.5 py-1.5 text-xs
    sm:px-3 sm:py-2 sm:text-sm
    md:px-4 md:py-2 md:text-base
    w-auto max-w-full
    hover:bg-gray-200
    focus:outline-none focus:ring-2 focus:ring-white/60
  "
            >
              Add Notes
            </button>
          </div>
        </div>
      </section>

      {loading && <p className="mt-4 text-white ">Loading...</p>}
      {error && <p className="mt-4 text-red-300">{error}</p>}
      {!loading && !error && <Card notes={notes} />}

      <AddNoteModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNote}
      />
    </main>
  );
}

export default App;
