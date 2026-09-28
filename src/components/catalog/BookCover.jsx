import { useState } from "react";

function BookCover({ src, title, className = "", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-muted p-2 text-center text-[11px] font-medium leading-tight text-ink-muted ${className}`}
      >
        {title || "Cover unavailable"}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title ? `Cover of ${title}` : ""}
      loading={loading}
      onError={() => setFailed(true)}
      className={`bg-surface-muted object-cover ${className}`}
    />
  );
}

export default BookCover;
