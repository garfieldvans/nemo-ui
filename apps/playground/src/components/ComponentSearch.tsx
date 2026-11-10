export function ComponentSearch({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Class tambahan untuk mengatur lebar/posisi. */
  className?: string;
}) {
  return (
    <div className={className ? `site-search ${className}` : "site-search"}>
      <svg
        className="site-search__icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        className="site-search__input"
        placeholder="Cari komponen…"
        aria-label="Cari komponen"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="site-search__clear"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          title="Hapus pencarian"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
