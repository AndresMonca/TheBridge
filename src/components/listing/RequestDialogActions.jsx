import { buttonPrimary, buttonSecondary, notice } from "../../styles/ui.js";

function RequestDialogActions({ sendDisabled, onCancel }) {
  return (
    <>
      <p className={`mt-6 text-xs ${notice.info}`}>
        Prototype only: this request is simulated. No message, payment, or
        transaction will be sent.
      </p>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className={buttonSecondary}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={sendDisabled}
          className={buttonPrimary}
        >
          Send request
        </button>
      </div>
    </>
  );
}

export default RequestDialogActions;
