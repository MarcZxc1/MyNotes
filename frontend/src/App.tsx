import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./index.css";
import axios from "axios";
import type { Note } from "./types /notes.type";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get<Note[]>("http://localhost:5000/api/notes");
        setNotes(res.data);
      } catch (error) {
        setError("Failed to load Notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
    console.log(fetchNotes());
  }, []);

  return (
    <main className="min-h-screen w-full  bg-[#000000] px-4 py-8 sm:px-6 md:px-10 ">
      <section className="mx-auto w-full max-w-5xl rounded-xl  bg-white/10 p-4 backdrop-blur sm:p-6 md:p-10 text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
          Notes
        </h1>
      </section>
      {loading && <p className="mt-4 text-white ">Loading...</p>}
      {error && <p className="mt-4 text-red-300">{error}</p>}
      {!loading && !error && <Card notes={notes} />}
    </main>
  );
}

export default App;
