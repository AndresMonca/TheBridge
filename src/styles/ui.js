export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const buttonBase = `inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${focusRing} disabled:cursor-not-allowed disabled:opacity-50`;

const primaryTone = "bg-wine text-white hover:bg-wine-hover";

const secondaryTone =
  "border border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-muted";

export const buttonPrimary = `${buttonBase} h-11 px-5 ${primaryTone}`;
export const buttonPrimarySm = `${buttonBase} h-9 px-4 ${primaryTone}`;
export const buttonPrimaryLg = `${buttonBase} h-12 px-6 ${primaryTone}`;
export const buttonSecondary = `${buttonBase} h-11 px-5 ${secondaryTone}`;
export const buttonSecondarySm = `${buttonBase} h-9 px-4 ${secondaryTone}`;
export const buttonSuccess = `inline-flex h-11 cursor-default items-center justify-center gap-2 rounded-xl bg-[#3F6B4E] px-5 text-sm font-semibold text-white ${focusRing}`;
export const buttonGhost = `${buttonBase} h-9 px-3 text-wine-ink hover:bg-wine-soft`;

export const textLink = `rounded-md font-semibold text-wine-ink underline-offset-4 hover:underline ${focusRing}`;

const fieldBase =
  "w-full rounded-[14px] border border-line bg-surface px-4 text-ink transition-colors placeholder:text-ink-subtle hover:border-line-strong focus:border-wine focus:outline-none focus:ring-4 focus:ring-wine/15 aria-[invalid=true]:border-rose-500";

export const inputBase = `${fieldBase} text-[15px]`;

export const inputField = `${inputBase} h-12`;

export const fieldLabel = "mb-2 block text-sm font-semibold text-ink";

export const fieldError = "mt-2 text-sm font-medium text-rose-700 dark:text-rose-300";

const chipBase = `inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink ${focusRing} aria-pressed:border-wine aria-pressed:bg-wine aria-pressed:text-white`;

export const chip = `${chipBase} h-10 px-4`;
export const chipSm = `${chipBase} h-9 px-3.5`;

export const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.14em] text-wine-ink";

export const pageTitle =
  "text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.1]";

export const pageLead = "text-[15px] leading-7 text-ink-muted";

export const sectionTitle = "text-xl font-bold tracking-tight text-ink";

export const card = "rounded-2xl border border-line bg-surface";

export const cardInteractive = `${card} shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lift has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-wine has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas`;

export const badge =
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold";

export const tone = {
  plum: "bg-[#F2E6EE] text-[#6A2E57] dark:bg-[#35192C] dark:text-[#E4B8D6]",
  sage: "bg-[#E6EEE7] text-[#3F5E47] dark:bg-[#1E2A21] dark:text-[#B8D4BE]",
  amber: "bg-[#F5EBDA] text-[#7A5217] dark:bg-[#30221A] dark:text-[#E8C893]",
  rose: "bg-[#F7E5E5] text-[#8A3A3F] dark:bg-[#3A1A1F] dark:text-[#F0B8BA]",
};

export const modalityTone = {
  Exchange: tone.plum,
  Loan: tone.sage,
  Rental: tone.amber,
  Sale: tone.rose,
};

export const notice = {
  info: "rounded-xl bg-wine-soft px-4 py-3 text-sm leading-6 text-wine-ink",
  warning:
    "rounded-2xl border border-[#EAD9BC] bg-[#FBF4E8] p-4 text-[#6B4712] dark:border-[#4A3522] dark:bg-[#261A13] dark:text-[#E8C893]",
  danger:
    "rounded-2xl border border-[#EFCFCF] bg-[#FCF1F1] p-4 text-[#7E3238] dark:border-[#56222B] dark:bg-[#2A1117] dark:text-[#F0B8BA]",
};


export const coverFrame =
  "overflow-hidden rounded-xl bg-surface-muted ring-1 ring-inset ring-line";

const selectBase = `${fieldBase} cursor-pointer appearance-none pr-10`;

export const selectField = `${selectBase} h-11 text-sm`;
export const selectFieldLg = `${selectBase} h-12 text-[15px]`;
