import { useState } from "react";
import { listings } from "../../data/listings.js";

const HERO_IMAGE = `${import.meta.env.BASE_URL}assets/hero/library-shelves.webp`;

const FALLBACK_COVERS = listings.slice(0, 12).map((listing) => listing.cover);

function HeroVisual() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:aspect-[5/6] lg:max-w-none"
    >
      <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(closest-side,#000_40%,transparent)]">
        {imageFailed ? (
          <div className="grid h-full scale-105 grid-cols-4 content-center gap-2 blur-[1px] saturate-[.8] dark:opacity-75">
            {FALLBACK_COVERS.map((cover) => (
              <img
                key={cover}
                src={cover}
                alt=""
                loading="lazy"
                className="aspect-[2/3] w-full rounded-md bg-surface-muted object-cover"
              />
            ))}
          </div>
        ) : (
          <img
            src={HERO_IMAGE}
            alt=""
            onError={() => setImageFailed(true)}
            className="h-full w-full scale-105 object-cover blur-[1.5px] saturate-[.85] dark:opacity-75"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-wine/15 via-transparent to-canvas/40 mix-blend-multiply dark:from-wine-deep/50 dark:to-canvas/60 dark:mix-blend-normal" />
      </div>
    </div>
  );
}

export default HeroVisual;
