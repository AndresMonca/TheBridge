import { useMemo, useState } from "react";
import AppShell from "../components/AppShell.jsx";
import RequestCard from "../components/requests/RequestCard.jsx";
import RequestsTabs from "../components/requests/RequestsTabs.jsx";
import { initialRequests } from "../data/requests.js";
import { getRequestStatusMessage } from "../services/requestStatus.js";
import { eyebrow, pageLead, pageTitle } from "../styles/ui.js";

function RequestsPage() {
  const [activeTab, setActiveTab] = useState("received");
  const [requests, setRequests] = useState(() =>
    initialRequests.map((request) => ({ ...request })),
  );
  const [announcement, setAnnouncement] = useState("");

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
    let updatedRequest;

    setRequests((current) =>
      current.map((request) => {
        if (request.id !== requestId) {
          return request;
        }

        updatedRequest = { ...request, status };
        return updatedRequest;
      }),
    );

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
