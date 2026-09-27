import { useState } from "react";
import AppShell from "../components/AppShell.jsx";
import AddBookConfirm from "../components/add-book/AddBookConfirm.jsx";
import AddBookSearch from "../components/add-book/AddBookSearch.jsx";
import AddBookSuccess from "../components/add-book/AddBookSuccess.jsx";

function AddBookPage() {
  const [phase, setPhase] = useState("search");
  const [selectedBook, setSelectedBook] = useState(null);
  const [savedBook, setSavedBook] = useState(null);
  const [searchSession, setSearchSession] = useState(0);

  const handleSelect = (book) => {
    setSelectedBook(book);
    setPhase("confirm");
  };

  const handleSaved = (book) => {
    setSavedBook(book);
    setPhase("success");
  };

  const handleAddAnother = () => {
    setSelectedBook(null);
    setSavedBook(null);
    setSearchSession((current) => current + 1);
    setPhase("search");
  };

  return (
    <AppShell
      activePage="add-book"
      title="Add a Book"
      subtitle="Add a physical book to your personal library"
    >
      <div className={phase === "search" ? "block" : "hidden"}>
        <AddBookSearch
          key={searchSession}
          onSelect={handleSelect}
        />
      </div>

      {phase === "confirm" && selectedBook && (
        <AddBookConfirm
          book={selectedBook}
          onBack={() => setPhase("search")}
          onSaved={handleSaved}
        />
      )}

      {phase === "success" && savedBook && (
        <AddBookSuccess
          book={savedBook}
          onAddAnother={handleAddAnother}
        />
      )}
    </AppShell>
  );
}

export default AddBookPage;
