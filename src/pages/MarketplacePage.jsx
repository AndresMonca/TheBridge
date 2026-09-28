import AppShell from "../components/AppShell.jsx";
import FavoritesSection from "../components/FavoritesSection.jsx";
import ListingFilters from "../components/marketplace/ListingFilters.jsx";
import ListingGrid from "../components/marketplace/ListingGrid.jsx";
import ListingStats from "../components/marketplace/ListingStats.jsx";
import MarketplaceSearchPanel from "../components/marketplace/MarketplaceSearchPanel.jsx";
import OpenLibraryResults from "../components/marketplace/OpenLibraryResults.jsx";
import { useListingFilters } from "../hooks/useListingFilters.js";
import { useMarketplace } from "../hooks/useMarketplace.js";

function MarketplacePage() {
  const listingFilters = useListingFilters();
  const marketplace = useMarketplace();

  return (
    <AppShell
      activePage="marketplace"
      title="Marketplace"
      subtitle="Discover books from the university community"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <ListingFilters
            filters={listingFilters.filters}
            resultCount={listingFilters.filteredListings.length}
            hasActiveFilters={listingFilters.hasActiveFilters}
            onChange={listingFilters.updateFilter}
            onReset={listingFilters.resetFilters}
          />

          <div className="mt-6">
            <ListingGrid
              listings={listingFilters.filteredListings}
              onReset={listingFilters.resetFilters}
            />
          </div>
        </section>

        <aside>
          <ListingStats stats={listingFilters.stats} />
        </aside>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
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
            <OpenLibraryResults
              status={marketplace.status}
              error={marketplace.error}
              books={marketplace.books}
              favorites={marketplace.favorites}
              savedAt={marketplace.savedAt}
              onRetry={() => marketplace.runSearch(marketplace.activeQuery)}
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
