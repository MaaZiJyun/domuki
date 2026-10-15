type VisualizerToggleProps = {
  title: string;
  isExpanded: boolean;
  controls: string;
  onToggle: () => void;
};

export default function VisualizerToggle({
  title,
  isExpanded,
  controls,
  onToggle,
}: VisualizerToggleProps) {
  return (
    <div className={`flex items-center gap-2 ${isExpanded ? "mb-3" : ""}`}>
      <span className="text-[11px] leading-5 text-current/50">{title}</span>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={controls}
        aria-label={`${isExpanded ? "关闭" : "展开"}${title}`}
        className="grid size-6 shrink-0 place-items-center rounded-full border border-current/20 text-current/55 transition hover:border-current/50 hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-3 fill-none stroke-current stroke-[1.5] [stroke-linecap:round]"
        >
          <path d="M3 8h10" />
          {!isExpanded && <path d="M8 3v10" />}
        </svg>
      </button>
    </div>
  );
}
