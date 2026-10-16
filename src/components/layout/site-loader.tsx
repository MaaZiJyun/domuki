export default function SiteLoader({ isReady }: { isReady: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-[#f4f4f5] text-[#151517] transition-[opacity,visibility] duration-700 motion-reduce:transition-none ${
        isReady ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
    >
      <div>
        <span
          className="block size-12 animate-spin rounded-full border-2 border-black/10 border-t-[#b81522] border-r-[#b81522] motion-reduce:animate-pulse"
          aria-hidden="true"
        />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
