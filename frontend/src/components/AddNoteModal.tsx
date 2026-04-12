import { useEffect, useState, type FormEvent } from "react";
import type {
  AddNoteModalProps,
  CreateNotePayload,
  UpdateNotePayload,
} from "../types /notes.type";

function AddNoteModal({
  isOpen,
  isSubmitting,
  submitError,
  onClose,
  onSubmit,
  initialData,
}: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    setTitle(initialData?.title ?? "");
    setContent(initialData?.content ?? "");
    setTagsInput(initialData?.tags.join(", ") ?? "");
    setLocalError("");
  }, [isOpen, initialData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTitle = title.trim();
    const nextContent = content.trim();
    const nextTags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!initialData) {
      if (!nextTitle || !nextContent) {
        setLocalError("Title and content are required.");
        return;
      }

      const createPayload: CreateNotePayload = {
        title: nextTitle,
        content: nextContent,
        tags: nextTags,
        createdAt: new Date().toISOString(),
      };

      setLocalError("");
      await onSubmit(createPayload);
      return;
    }

    if (nextTitle === "") {
      setLocalError("Title cannot be empty.");
      return;
    }

    if (nextContent === "") {
      setLocalError("Content cannot be empty.");
      return;
    }

    const updatePayload: UpdateNotePayload = {};

    if (nextTitle !== initialData.title) {
      updatePayload.title = nextTitle;
    }

    if (nextContent !== initialData.content) {
      updatePayload.content = nextContent;
    }

    const initialTags = initialData.tags;
    const tagsChanged =
      nextTags.length !== initialTags.length ||
      nextTags.some((tag, index) => tag !== initialTags[index]);

    if (tagsChanged) {
      updatePayload.tags = nextTags;
    }

    if (Object.keys(updatePayload).length === 0) {
      setLocalError("No changes detected.");
      return;
    }

    setLocalError("");
    await onSubmit(updatePayload);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-[#161616] p-5 text-left shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white">
          {initialData ? "Update Note" : "Create Note"}
        </h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-white/80" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-md border border-white/20 bg-[#222] px-3 py-2 text-white outline-none focus:border-white/50"
              placeholder="Write a short title"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-white/80"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              className="w-full resize-none rounded-md border border-white/20 bg-[#222] px-3 py-2 text-white outline-none focus:border-white/50"
              placeholder="Write your note"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/80" htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              className="w-full rounded-md border border-white/20 bg-[#222] px-3 py-2 text-white outline-none focus:border-white/50"
              placeholder="work, idea, personal"
            />
          </div>

          {(localError || submitError) && (
            <p className="text-sm text-red-300">{localError || submitError}</p>
          )}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                  ? "Update Note"
                  : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteModal;
