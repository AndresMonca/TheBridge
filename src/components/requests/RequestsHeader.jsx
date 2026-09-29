import { eyebrow, pageLead, pageTitle } from "../../styles/ui.js";

function RequestsHeader() {
  return (
    <>
      <p className={eyebrow}>
        Request center
      </p>

      <h1 className={`mt-3 ${pageTitle}`}>
        Requests
      </h1>

      <p className={`mt-2 max-w-xl ${pageLead}`}>
        Review requests you received and track the ones you sent.
      </p>
    </>
  );
}

export default RequestsHeader;
