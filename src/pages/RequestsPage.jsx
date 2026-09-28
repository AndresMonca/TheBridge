import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell.jsx";
import RequestCard from "../components/requests/RequestCard.jsx";
import RequestsTabs from "../components/requests/RequestsTabs.jsx";
import { loadMyBooks } from "../services/myBooksStorage.js";
import { getRequestStatusMessage } from "../services/requestStatus.js";
import {
  loadRequests,
  REQUESTS_EVENT,
  updateRequestStatus,
} from "../services/requestsStorage.js";
import { eyebrow, pageLead, pageTitle } from "../styles/ui.js";

function RequestsPage() {
  const [activeTab, setActiveTab] = useState("received");
  const [requests, setRequests] = useState(loadRequests);
  const [myBooks] = useState(loadMyBooks);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const refreshRequests = () => setRequests(loadRequests());

    window.addEventListener(REQUESTS_EVENT, refreshRequests);
    window.addEventListener("storage", refreshRequests);

    return () => {
      window.removeEventListener(REQUESTS_EVENT, refreshRequests);
      window.removeEventListener("storage", refreshRequests);
    };
  }, []);

  const myBooksById = useMemo(
    () => new Map(myBooks.map((book) => [book.id, book])),
    [myBooks],
  );

  const counts = useMemo(
    () => ({
      received: requests.filter((request) => request.direction === "received")
        .length,
      sent: requests.filter((request) => request.direction === "sent").length,
    }),
    [requests],
  );

  const visibleRequests = requests.filter(
    (request) => request.direction === activeTab,
  );

  const handleStatusChange = (requestId, status) => {
    const updatedRequest = updateRequestStatus(requestId, status);
    setRequests(loadRequests());

    if (updatedRequest) {
      setAnnouncement(getRequestStatusMessage(updatedRequest));
    }
  };

  return (
    <AppShell
      activePage="requests"
      title="Requests"
      subtitle="Manage book requests between members"
    >
      <section>
        <p className={eyebrow}>
          Request center
        </p>

        <h1 className={`mt-3 ${pageTitle}`}>
          Requests
        </h1>

        <p className={`mt-2 max-w-xl ${pageLead}`}>
          Review requests you received and track the ones you sent.
        </p>

        <div className="mt-8">
          <RequestsTabs
            activeTab={activeTab}
            counts={counts}
            onChange={setActiveTab}
          />
        </div>

        <div className="mt-6 space-y-3">
          {visibleRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              myBook={myBooksById.get(request.myBookId)}
              offeredBook={myBooksById.get(request.offeredBookId)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </section>
    </AppShell>
  );
}

export default RequestsPage;
