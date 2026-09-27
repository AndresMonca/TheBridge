import AppShell from "../components/AppShell.jsx";
import BookList from "../components/BookList.jsx";
import ErrorState from "../components/ErrorState.jsx";
import FavoritesSection from "../components/FavoritesSection.jsx";
import LoadingState from "../components/LoadingState.jsx";
import MarketplaceSearchPanel from "../components/marketplace/MarketplaceSearchPanel.jsx";
import { useMarketplace } from "../hooks/useMarketplace.js";

function MarketplaceResults({
  status,
  error,
  books,
  favorites,
  onRetry,
  onToggle,
}) {
  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  return (
    <BookList
      books={books}
      favorites={favorites}
      onToggleFavorite={onToggle}
    />
  );
}

function MarketplacePage() {
  const marketplace = useMarketplace();

  return (
    <AppShell
      activePage="marketplace"
      title="Marketplace"
      subtitle="Discover books from the university community"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <MarketplaceSearchPanel
            searchInput={marketplace.searchInput}
            searchError={marketplace.searchError}
            status={marketplace.status}
            onChange={marketplace.handleSearchChange}
            onSubmit={marketplace.handleSearchSubmit}
            onSearch={marketplace.runSearch}
          />

          <div className="mt-6">
            <MarketplaceResults
              status={marketplace.status}
              error={marketplace.error}
              books={marketplace.books}
              favorites={marketplace.favorites}
              onRetry={() =>
                marketplace.runSearch(marketplace.activeQuery)
              }
              onToggle={marketplace.toggleFavorite}
            />
          </div>
        </section>

        <aside>
          <FavoritesSection
            favorites={marketplace.favorites}
            onToggleFavorite={marketplace.toggleFavorite}
          />
        </aside>
      </div>
    </AppShell>
  );
}

export default MarketplacePage;
