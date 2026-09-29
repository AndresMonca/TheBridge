import {
  idleModalityMessage,
  modalityMessages,
} from "../../data/createListingData.js";
import { useListingForm } from "../../hooks/useListingForm.js";
import { buttonPrimaryLg } from "../../styles/ui.js";
import ListingDynamicFields from "./ListingDynamicFields.jsx";
import ListingModalityOptions from "./ListingModalityOptions.jsx";

function CreateListingForm({ onPublish }) {
  const {
    modality,
    values,
    errors,
    handleModalityChange,
    handleFieldChange,
    handleSubmit,
  } = useListingForm(onPublish);

  return (
    <form
      onSubmit={handleSubmit}
    >
      <ListingModalityOptions
        value={modality}
        onChange={handleModalityChange}
        error={errors.modality}
      />

      <p
        className="mt-4 text-sm leading-6 text-ink-muted"
        aria-live="polite"
      >
        {modalityMessages[modality] || idleModalityMessage}
      </p>

      {modality && (
        <div className="mt-8">
          <ListingDynamicFields
            modality={modality}
            values={values}
            errors={errors}
            onChange={handleFieldChange}
          />
        </div>
      )}

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          className={buttonPrimaryLg}
        >
          Publish Listing
        </button>
      </div>
    </form>
  );
}

export default CreateListingForm;
