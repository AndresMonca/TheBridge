import { initialRequests } from "../data/requests.js";

const STORAGE_KEY = "thebridge:requests";
export const REQUESTS_EVENT = "thebridge:requests-changed";

function today() {
  return new Date().toISOString().split("T")[0];
}

function seedRequests() {
  return initialRequests.map((request) => ({ ...request }));
}

export function loadRequests() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : seedRequests();
  } catch {
    return seedRequests();
  }
}

function saveRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  window.dispatchEvent(new CustomEvent(REQUESTS_EVENT));
}

export function updateRequestStatus(requestId, status) {
  let updatedRequest = null;

  const requests = loadRequests().map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    updatedRequest = { ...request, status, updatedAt: today() };
    return updatedRequest;
  });

  saveRequests(requests);
  return updatedRequest;
}

export function addSentRequest({ listing, offeredBook }) {
  const request = {
    id: `req-${Date.now()}`,
    direction: "sent",
    listingId: listing.id,
    counterpart: listing.owner,
    status: "Pending",
    note: offeredBook
      ? `Offered ${offeredBook.title} in exchange for this copy.`
      : `Sent a ${listing.modality.toLowerCase()} request through TheBridge.`,
    updatedAt: today(),
    ...(offeredBook ? { offeredBookId: offeredBook.id } : {}),
  };

  saveRequests([request, ...loadRequests()]);
  return request;
}

export function hasActiveSentRequest(listingId) {
  return loadRequests().some(
    (request) =>
      request.direction === "sent" &&
      request.listingId === listingId &&
      request.status !== "Rejected",
  );
}
