import {
  DurationSelect,
  inputClass,
  PriceInput,
} from "./ListingFieldControls.jsx";

function ListingDynamicFields({ modality, values, errors, onChange }) {
  if (modality === "Exchange") {
    return (
      <div>
        <label
          htmlFor="desiredBook"
          className="mb-2 block text-sm font-extrabold text-slate-800 dark:text-slate-100"
        >
          Desired book
        </label>

        <input
          id="desiredBook"
          value={values.desiredBook}
          onChange={(event) => onChange("desiredBook", event.target.value)}
          placeholder="Optional — leave blank if open to offers"
          className={inputClass}
        />
      </div>
    );
  }

  if (modality === "Loan") {
    return (
      <DurationSelect
        name="loanDuration"
        label="Loan duration"
        value={values.loanDuration}
        onChange={onChange}
        error={errors.loanDuration}
      />
    );
  }

  if (modality === "Rental") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <PriceInput
          name="rentalPrice"
          label="Rental price"
          placeholder="8000"
          value={values.rentalPrice}
          onChange={onChange}
          error={errors.rentalPrice}
        />

        <DurationSelect
          name="rentalDuration"
          label="Rental duration"
          value={values.rentalDuration}
          onChange={onChange}
          error={errors.rentalDuration}
        />
      </div>
    );
  }

  if (modality === "Sale") {
    return (
      <PriceInput
        name="salePrice"
        label="Sale price"
        placeholder="25000"
        value={values.salePrice}
        onChange={onChange}
        error={errors.salePrice}
      />
    );
  }

  return null;
}

export default ListingDynamicFields;
