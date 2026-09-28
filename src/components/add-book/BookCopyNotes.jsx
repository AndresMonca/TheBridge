import { fieldLabel, inputBase } from "../../styles/ui.js";

function BookCopyNotes({ value, onChange }) {
  return (
    <div className="mt-6">
      <label htmlFor="book-notes" className={fieldLabel}>
        Notes about your copy{" "}
        <span className="font-normal text-ink-muted">(optional)</span>
      </label>

      <textarea
        id="book-notes"
        rows="3"
        maxLength="300"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Describe the physical state of your copy: highlights, torn pages, spine condition..."
        className={`${inputBase} py-3 leading-6`}
      />

      <p className="mt-1 text-right text-xs text-ink-muted">
        {value.length}/300
      </p>
    </div>
  );
}

export default BookCopyNotes;
