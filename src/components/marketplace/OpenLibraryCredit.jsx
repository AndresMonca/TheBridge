import { textLink } from "../../styles/ui.js";

function OpenLibraryCredit() {
  return (
    <p className="mt-3 text-xs text-ink-muted">
      Book data powered by{" "}
      <a
        href="https://openlibrary.org"
        target="_blank"
        rel="noreferrer"
        className={textLink}
      >
        Open Library
      </a>
    </p>
  );
}

export default OpenLibraryCredit;
