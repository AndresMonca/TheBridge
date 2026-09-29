import { useState } from "react";
import { validateListing } from "../services/listingValidation.js";

const initialValues = {
  desiredBook: "",
  desiredBookMeta: null,
  desiredBookQuery: "",
  loanDuration: "",
  rentalPrice: "",
  rentalDuration: "",
  salePrice: "",
};

export function useListingForm(onPublish) {
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

  return {
    modality,
    values,
    errors,
    handleModalityChange,
    handleFieldChange,
    handleSubmit,
  };
}
