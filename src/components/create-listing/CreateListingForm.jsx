import { useState } from "react";
import {
  idleModalityMessage,
  modalityMessages,
} from "../../data/createListingData.js";
import { validateListing } from "../../services/listingValidation.js";
import ListingDynamicFields from "./ListingDynamicFields.jsx";
import ListingModalityOptions from "./ListingModalityOptions.jsx";

const initialValues = {
  desiredBook: "",
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
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <ListingModalityOptions
        value={modality}
        onChange={handleModalityChange}
        error={errors.modality}
      />

      <p
        className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-500 dark:bg-slate-950 dark:text-slate-400"
        aria-live="polite"
      >
        {modalityMessages[modality] || idleModalityMessage}
      </p>

      {modality && (
        <div className="mt-6">
          <ListingDynamicFields
            modality={modality}
            values={values}
            errors={errors}
            onChange={handleFieldChange}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:justify-end">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950"
        >
          Publish Listing
        </button>
      </div>
    </form>
  );
}

export default CreateListingForm;
