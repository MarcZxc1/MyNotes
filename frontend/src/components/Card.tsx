import type { Note } from "../types /notes.type";

type CardProps = {
  notes: Note[];
};
function Card({ notes }: CardProps) {
  if (notes.length === 0) {
    return <p className="mt-6 text-white/90">No notes yet </p>;
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <article
          key={note.id}
          className="rounded-lg bg-[#404040] p4 text-center shadow "
        >
          <h2 className="text-lg font-semibold text-white">{note.title}</h2>
          <p className="mt-2 line-clamp-4 text-sm text-white ">
            {note.content}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default Card;
