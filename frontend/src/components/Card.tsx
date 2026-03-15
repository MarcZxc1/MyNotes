import type { Note } from "../types /notes.type";

type CardProps = {
  notes: Note[];
};
function Card({ notes }: CardProps) {
  if (notes.length === 0) {
    return (
      /* Added min-h-[50vh] to give it space to center vertically, 
     or use h-full if the parent has a fixed height */
      <div className="mt-6 grid min-h-[50vh] w-full place-items-center text-center">
        <p className="text-white/90 text-lg md:text-xl font-medium">
          No notes yet
        </p>
        {/* Optional: you can add a sub-text or icon here */}
      </div>
    );
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <article
          key={note.id}
          className="rounded-lg bg-white text-center shadow "
        >
          <h2 className="text-lg font-semibold text-black">{note.title}</h2>
          <p className="mt-2 line-clamp-4 text-sm text-black ">
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
