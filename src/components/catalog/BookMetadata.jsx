const MARC_TO_ISO = {
  alb: "sqi",
  arm: "hye",
  baq: "eus",
  bur: "mya",
  chi: "zho",
  cze: "ces",
  dut: "nld",
  fre: "fra",
  geo: "kat",
  ger: "deu",
  gre: "ell",
  ice: "isl",
  mac: "mkd",
  may: "msa",
  per: "fas",
  rum: "ron",
  slo: "slk",
  tib: "bod",
  wel: "cym",
};

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

function formatLanguage(code) {
  if (!code) {
    return null;
  }

  try {
    return languageNames.of(MARC_TO_ISO[code] || code);
  } catch {
    return code;
  }
}

const FIELDS = {
  year: { label: "Year", read: (book) => book.publicationYear || book.year },
  publisher: { label: "Publisher", read: (book) => book.publisher },
  language: { label: "Language", read: (book) => formatLanguage(book.language) },
  isbn: { label: "ISBN", read: (book) => book.isbn },
  editions: {
    label: "Editions",
    read: (book) => (book.editionCount > 1 ? book.editionCount : null),
  },
};

function BookMetadata({
  book,
  fields = ["year", "publisher", "language", "isbn", "editions"],
  className = "",
}) {
  const rows = fields
    .map((field) => ({ field, ...FIELDS[field] }))
    .map((row) => ({ ...row, value: row.read(book) }))
    .filter((row) => row.value);

  if (rows.length === 0) {
    return null;
  }

  return (
    <dl className={`divide-y divide-line ${className}`}>
      {rows.map(({ field, label, value }) => (
        <div
          key={field}
          className="flex items-baseline justify-between gap-4 py-2 text-sm"
        >
          <dt className="text-ink-muted">{label}</dt>
          <dd className="min-w-0 truncate text-right font-medium text-ink">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default BookMetadata;
