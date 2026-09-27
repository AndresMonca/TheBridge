function BookCopyNotes({ value, onChange }) {
  return (
    <div className="mt-5">
      <label
        htmlFor="book-notes"
        className="mb-2 block text-sm font-extrabold text-slate-800 dark:text-slate-100"
      >
        Notes about your copy{" "}
        <span className="font-normal text-slate-400">(optional)</span>
      </label>

      <textarea
        id="book-notes"
        rows="3"
        maxLength="300"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Describe the physical state of your copy: highlights, torn pages, spine condition..."
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />

      <p className="mt-1 text-right text-xs text-slate-400">
        {value.length}/300
      </p>
    </div>
  );
}

export default BookCopyNotes;
