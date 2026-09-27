import { loadMyBooks } from "./myBooksStorage.js";

export function loadAvailableExchangeBooks() {
  return loadMyBooks().filter(
    (book) =>
      book.status === "Available" &&
      typeof book.title === "string",
  );
}

export function getListingOfferRows(listing) {
  if (listing.modality === "Exchange") {
    return [
      {
        label: "Wants in exchange",
        value: listing.desiredBook || "Open to offers",
      },
    ];
  }

  if (listing.modality === "Loan") {
    return [
      {
        label: "Loan duration",
        value: listing.duration || "To be agreed",
      },
    ];
  }

  if (listing.modality === "Rental") {
    return [
      {
        label: "Rental price",
        value: formatPrice(listing.price),
      },
      {
        label: "Rental duration",
        value: listing.duration || "To be agreed",
      },
    ];
  }

  return [
    {
      label: "Sale price",
      value: formatPrice(listing.price),
    },
  ];
}

export function getRequestCtaLabel(modality) {
  const labels = {
    Exchange: "Request Exchange",
    Loan: "Request Loan",
    Rental: "Request Rental",
    Sale: "Request Purchase",
  };

  return labels[modality] || "Send Request";
}

function formatPrice(value) {
  if (typeof value !== "number") {
    return "To be agreed";
  }

  return new Intl.NumberFormat("en-CO", {
    style: "currency",
    currency: "COP",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(value);
}
