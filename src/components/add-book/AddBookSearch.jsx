import AddBookSearchForm from "./AddBookSearchForm.jsx";
import AddBookSearchState from "./AddBookSearchState.jsx";
import { useAddBookSearch } from "../../hooks/useAddBookSearch.js";

function AddBookSearch({ onSelect }) {
  const search = useAddBookSearch();

  return (
    <section>
      <AddBookSearchForm
        query={search.query}
        validationError={search.validationError}
        onQueryChange={search.handleQueryChange}
        onSubmit={search.handleSubmit}
      />

      <AddBookSearchState
        search={search}
        onSelect={onSelect}
      />
    </section>
  );
}

export default AddBookSearch;
