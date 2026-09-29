import { buttonPrimarySm, buttonSecondarySm } from "../../styles/ui.js";

function RequestActions({ onAccept, onReject }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onAccept}
        className={buttonPrimarySm}
      >
        Accept
      </button>

      <button
        type="button"
        onClick={onReject}
        className={buttonSecondarySm}
      >
        Reject
      </button>
    </div>
  );
}

export default RequestActions;
