import { useState } from "react";
import {
  idleModalityMessage,
  modalityMessages,
} from "../../data/createListingData.js";
import { validateListing } from "../../services/listingValidation.js";
import { buttonPrimaryLg } from "../../styles/ui.js";
import ListingDynamicFields from "./ListingDynamicFields.jsx";
import ListingModalityOptions from "./ListingModalityOptions.jsx";

const initialValues = {
  desiredBook: "",
  desiredBookMeta: null,
  desiredBookQuery: "",
  loanDuration: "",
  rentalPrice: "",
  rentalDuration: "",
  salePrice: "",
};

function CreateListingForm({ onPublish }) {
  const [modality, setModality] = useState("");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleModalityChange = (nextModality) => {
    setModality(nextModality);
    setValues((current) => ({ ...current, desiredBookQuery: "" }));
    setErrors({});
  };

  const handleFieldChange = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateListing(modality, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onPublish({
      modality,
      values,
    });
  };

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
