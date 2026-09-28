# REFLECTION — Array methods in TheBridge

## The operation

The Marketplace shows a **Listing stats** panel next to the community listings. Every time the user types in the search box or changes a filter (modality, genre, or condition), the panel recalculates:

- how many listings are currently shown;
- how many of them belong to each sharing modality (Exchange, Loan, Rental, Sale);
- the average sale price and the average rental price.

Sale and Rental prices are kept separate on purpose: a sale price is a one-time total (for example COP 35,000), while a rental price is charged per period (for example COP 8,000 for 7 days). Mixing both in a single average would produce a number that means nothing.

The calculation lives in `computeListingStats` inside `src/services/listingFilters.js`, and it receives the array that `filterListings` already returned.

## Version with `reduce`

```js
export function computeListingStats(items) {
  return items.reduce(
    (stats, listing) => {
      const current = stats.byModality[listing.modality] ?? {
        count: 0,
        priceTotal: 0,
        pricedCount: 0,
      };
      const hasPrice = typeof listing.price === "number";

      return {
        total: stats.total + 1,
        byModality: {
          ...stats.byModality,
          [listing.modality]: {
            count: current.count + 1,
            priceTotal: current.priceTotal + (hasPrice ? listing.price : 0),
            pricedCount: current.pricedCount + (hasPrice ? 1 : 0),
          },
        },
      };
    },
    { total: 0, byModality: {} },
  );
}
```

`reduce` starts from the initial value `{ total: 0, byModality: {} }`. For each listing, the callback receives the accumulated `stats` and returns a **new** stats object: the total grows by one and the entry for that listing's modality is replaced by an updated copy. The value returned by the last call is the final result. Exchange and Loan listings have `price: null`, so they increase `count` but not `pricedCount`, which keeps the averages correct.

## Equivalent version with `forEach`

```js
export function computeListingStats(items) {
  const stats = { total: 0, byModality: {} };

  items.forEach((listing) => {
    if (!stats.byModality[listing.modality]) {
      stats.byModality[listing.modality] = {
        count: 0,
        priceTotal: 0,
        pricedCount: 0,
      };
    }

    const current = stats.byModality[listing.modality];
    stats.total += 1;
    current.count += 1;

    if (typeof listing.price === "number") {
      current.priceTotal += listing.price;
      current.pricedCount += 1;
    }
  });

  return stats;
}
```

Both versions return exactly the same object for the same input.

## Which one is clearer and why

For this operation we prefer the **`reduce` version**.

The `forEach` version is easier to read line by line for someone new to JavaScript, because it looks like a normal loop that adds numbers to a variable. However, it depends on an outer variable (`stats`) that is mutated from inside the callback, so the reader has to track how that object changes on every iteration.

The `reduce` version expresses the intent directly: "turn this array of listings into one summary object". It does not mutate anything outside the callback, which matches how the rest of the React code treats data — state is replaced with new objects instead of being modified in place. That makes the function safe to call from `useMemo` on every filter change, and easy to reuse: the Home page calls the same function to build its "community at a glance" summary.

The trade-off is that the object spread inside `reduce` is more verbose, and a beginner may need a moment to understand the accumulator. For a short, single-purpose calculation like this one, the clarity of "one input array → one returned summary" is worth it.
