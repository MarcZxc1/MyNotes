import { Edit2, Trash2 } from "lucide-react"; // Import icons
import type { Note } from "../types /notes.type";

type CardProps = {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatNoteDate(note: Note) {
  const rawDate =
    note.createAt ?? note.createdAt ?? note.updatedAt ?? note.updateAt;
  if (!rawDate) return "";

  const parsedDate = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Card({ notes, onEdit, onDelete }: CardProps) {
  if (notes.length === 0) {
    return (
      <div className="mt-6 grid min-h-[50vh] w-full place-items-center text-center">
        <p className="text-white/90 text-lg md:text-xl font-medium">
          No notes yet
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => {
        const formattedDate = formatNoteDate(note);

        return (
          <article
            key={note.id}
            className="relative group rounded-lg bg-white p-5 text-left shadow-md transition-all hover:shadow-lg"
          >
            {/* Action Buttons Container */}
            <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              <button
                onClick={() => onEdit(note.id)}
                className="rounded-md p-1.5 text-black hover:bg-blue-50 hover:text-blue-600 transition-colors"
                title="Edit Note"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="rounded-md p-1.5 text-black hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Delete Note"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <h2 className="pr-12 text-lg font-bold text-gray-900 break-word whitespace-normal">
              {note.title}
            </h2>

            {formattedDate && (
              <p className="mt-1 text-xs font-medium text-gray-500">
                {formattedDate}
              </p>
            )}

            <p className="mt-2 line-clamp-4 text-sm text-gray-600 leading-relaxed">
              {note.content}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Card;
