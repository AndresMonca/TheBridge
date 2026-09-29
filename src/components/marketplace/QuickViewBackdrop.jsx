function QuickViewBackdrop({ open, onClose }) {
  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className={`absolute inset-0 bg-[#1B0C12]/30 backdrop-blur-sm transition-[opacity,visibility] duration-300 motion-reduce:transition-none dark:bg-black/55 ${
        open ? "" : "invisible opacity-0"
      }`}
    />
  );
}

export default QuickViewBackdrop;
