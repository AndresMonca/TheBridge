import { useState } from "react";
import AppShell from "../components/AppShell.jsx";
import FavoritesSection from "../components/FavoritesSection.jsx";
import ListingFilters from "../components/marketplace/ListingFilters.jsx";
import ListingGrid from "../components/marketplace/ListingGrid.jsx";
import ListingQuickView from "../components/marketplace/ListingQuickView.jsx";
import ListingStats from "../components/marketplace/ListingStats.jsx";
import MarketplaceSearchPanel from "../components/marketplace/MarketplaceSearchPanel.jsx";
import OpenLibraryResults from "../components/marketplace/OpenLibraryResults.jsx";
import { useListingFilters } from "../hooks/useListingFilters.js";
import { useMarketplace } from "../hooks/useMarketplace.js";

function MarketplacePage() {
  const listingFilters = useListingFilters();
  const marketplace = useMarketplace();
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <AppShell
      activePage="marketplace"
      title="Marketplace"
      subtitle="Discover books from the university community"
    >
      <section>
        <ListingFilters
          filters={listingFilters.filters}
          resultCount={listingFilters.filteredListings.length}
          hasActiveFilters={listingFilters.hasActiveFilters}
          onChange={listingFilters.updateFilter}
          onReset={listingFilters.resetFilters}
        />

        <div className="mt-4">
          <ListingGrid
            listings={listingFilters.filteredListings}
            onReset={listingFilters.resetFilters}
            onSelect={setSelectedListing}
          />
        </div>

        <div className="mt-10">
          <ListingStats stats={listingFilters.stats} />
        </div>
      </section>

      <div className="mt-20 grid gap-10 border-t border-line pt-14 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section>
          <MarketplaceSearchPanel
            searchInput={marketplace.searchInput}
            searchError={marketplace.searchError}
            status={marketplace.status}
            onChange={marketplace.handleSearchChange}
            onSubmit={marketplace.handleSearchSubmit}
            onSearch={marketplace.runSearch}
          />

          <div className="mt-8">
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

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <FavoritesSection
            favorites={marketplace.favorites}
            onToggleFavorite={marketplace.toggleFavorite}
          />
        </aside>
      </div>

      <ListingQuickView
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </AppShell>
  );
}

export default MarketplacePage;
