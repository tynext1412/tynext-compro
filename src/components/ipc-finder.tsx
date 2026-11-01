"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import type { IpcCatalog } from "@/content/ipc-products";
import type { Dictionary } from "@/i18n";
import { Icon } from "./icon";

type Texts = Dictionary["ipcPage"];
type Sort = { key: string; dir: "asc" | "desc" } | null;

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

// Titik warna di kolom status supaya produk yang tidak disarankan untuk proyek baru mudah dikenali saat memindai.
const statusDot: Record<string, string> = {
  "regular delivery": "bg-teal",
  "product announcement": "bg-lime",
};

// "CX7000 | Embedded PC with ..." -> kode tebal dan deskripsi di bawahnya, seperti product finder Beckhoff.
function splitProduct(value: string) {
  const [code, ...rest] = value.split(" | ");
  return { code: code.trim(), name: rest.join(" | ").trim() };
}

export function IpcFinder({ catalog, t, downloadHref }: { catalog: IpcCatalog; t: Texts; downloadHref: string }) {
  const specColumns = catalog.columns.filter((c) => c.key !== "product");
  const columnLabels: Record<string, string> = t.columns;
  const valueLabels: Record<string, string> = t.values;
  const labelOf = (column: { key: string; label: string }) => columnLabels[column.key] ?? column.label;
  const show = (value: string) => valueLabels[value] ?? value;

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [sort, setSort] = useState<Sort>(null);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [compareOnly, setCompareOnly] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelButtonRef = useRef<HTMLButtonElement>(null);
  const searchId = useId();
  const panelId = useId();

  const comparing = compareOnly && selected.size > 0;
  const visibleColumns = specColumns.filter((c) => !hidden.has(c.key));

  const rows = useMemo(() => {
    const tokens = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const list = catalog.rows
      .map((row) => ({ row, ...splitProduct(row.product) }))
      .filter(({ row, code }) => {
        if (comparing && !selected.has(code)) return false;
        if (!tokens.length) return true;
        const haystack = Object.values(row)
          .flatMap((v) => [v, valueLabels[v] ?? ""])
          .join(" ")
          .toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      });
    if (!sort) return list;
    const sign = sort.dir === "asc" ? 1 : -1;
    // Sel kosong selalu di bawah, apa pun arah urutannya.
    return [...list].sort((a, b) => {
      const x = a.row[sort.key] ?? "";
      const y = b.row[sort.key] ?? "";
      if (!x || !y) return x ? -1 : y ? 1 : 0;
      return collator.compare(x, y) * sign;
    });
  }, [catalog.rows, comparing, deferredQuery, selected, sort, valueLabels]);

  useEffect(() => {
    if (!panelOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setPanelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPanelOpen(false);
      panelButtonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));

  const toggleSet = (set: ReadonlySet<string>, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const resetView = () => {
    setQuery("");
    setCompareOnly(false);
  };

  const toolbarButton =
    "inline-flex min-h-11 items-center gap-gr-xs rounded-xs px-gr-sm text-sm font-medium text-paper transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:text-mist/60 disabled:hover:bg-transparent";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-gr-sm gap-y-gr-xs rounded-t-xs bg-navy p-gr-sm text-paper">
        <div className="relative w-full sm:w-72">
          <label htmlFor={searchId} className="sr-only">
            {t.searchLabel}
          </label>
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-gr-sm size-5 -translate-y-1/2 text-ink-2"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="min-h-11 w-full rounded-xs bg-paper pr-gr-sm pl-gr-xl text-sm text-ink placeholder:text-ink-2"
          />
        </div>

        <div ref={panelRef} className="relative">
          <button
            ref={panelButtonRef}
            type="button"
            aria-expanded={panelOpen}
            aria-controls={panelId}
            onClick={() => setPanelOpen((o) => !o)}
            className={toolbarButton}
          >
            <Icon name="columns" className="size-5" />
            {t.columnsButton}
          </button>
          <div
            id={panelId}
            hidden={!panelOpen}
            className="absolute top-full left-0 z-30 mt-gr-xs w-[min(22rem,calc(100vw-2rem))] rounded-xs border border-rule bg-paper p-gr-md text-ink shadow-[0_1rem_2.618rem_-1rem_rgb(14_40_70/0.45)]"
          >
            <ul className="grid gap-y-gr-xs">
              {specColumns.map((column) => (
                <li key={column.key}>
                  <label className="flex min-h-9 cursor-pointer items-center gap-gr-sm text-sm">
                    <input
                      type="checkbox"
                      checked={!hidden.has(column.key)}
                      onChange={() => setHidden((h) => toggleSet(h, column.key))}
                      className="size-4 accent-navy"
                    />
                    {labelOf(column)}
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setHidden(new Set())}
              disabled={hidden.size === 0}
              className="mt-gr-sm min-h-9 text-sm font-semibold text-blue underline underline-offset-4 disabled:text-ink-2 disabled:no-underline"
            >
              {t.showAllColumns}
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-pressed={comparing}
          disabled={selected.size === 0}
          onClick={() => setCompareOnly((c) => !c)}
          className={`${toolbarButton} aria-pressed:bg-lime aria-pressed:text-ink aria-pressed:hover:bg-lime`}
        >
          {t.compare}
          <span className="min-w-6 rounded-xs bg-white/15 px-gr-xs text-center font-mono text-gr-xs">
            {selected.size}
          </span>
        </button>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={() => {
              setSelected(new Set());
              setCompareOnly(false);
            }}
            className={toolbarButton}
          >
            {t.clearSelection}
          </button>
        )}

        <p aria-live="polite" className="font-mono text-gr-xs text-mist sm:ml-auto">
          {t.count.replace("{shown}", String(rows.length)).replace("{total}", String(catalog.rows.length))}
        </p>
        <a href={downloadHref} download className={toolbarButton}>
          <Icon name="download" className="size-5" />
          {t.download}
        </a>
      </div>

      {/* Tabel menggulir di dalam kotaknya sendiri supaya judul kolom dan kolom produk tetap terlihat. Di ponsel hanya kolom produk (dipersempit) yang menempel, supaya kolom spesifikasi masih kebagian tempat. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={t.finderTitle}
        className="max-h-[calc(100svh-var(--header-h)-6.854rem)] min-h-[20rem] overflow-auto rounded-b-xs border border-t-0 border-rule bg-paper"
      >
        <table className="w-max min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 z-20 w-24 max-w-24 min-w-24 border-b sm:left-0 border-rule bg-paper-2 px-gr-sm py-gr-sm align-top text-gr-xs font-semibold"
              >
                {t.compareColumn}
              </th>
              <SortHeader
                label={labelOf(catalog.columns[0])}
                sort={sort}
                columnKey="product"
                onSort={toggleSort}
                className="sticky top-0 left-0 z-20 w-32 max-w-32 min-w-32 border-r sm:left-24 sm:w-auto sm:max-w-none sm:min-w-64"
              />
              {visibleColumns.map((column) => (
                <SortHeader
                  key={column.key}
                  label={labelOf(column)}
                  sort={sort}
                  columnKey={column.key}
                  onSort={toggleSort}
                  className="sticky top-0 z-10"
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ row, code, name }) => {
              const isSelected = selected.has(code);
              const cell = "border-b border-rule bg-paper px-gr-sm py-gr-sm align-top group-hover:bg-paper-2";
              return (
                <tr key={code} className="group">
                  <td
                    className={`${cell} z-[5] text-center sm:sticky sm:left-0 ${isSelected ? "shadow-[inset_3px_0_0_var(--color-lime)]" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => setSelected((s) => toggleSet(s, code))}
                      aria-label={`${t.selectRow}: ${code}`}
                      className="mt-0.5 size-4 cursor-pointer accent-navy"
                    />
                  </td>
                  <th scope="row" className={`${cell} sticky left-0 z-[5] w-32 max-w-32 min-w-32 border-r font-normal sm:left-24 sm:w-auto sm:max-w-none sm:min-w-64`}>
                    <span className="block font-semibold text-ink">{code}</span>
                    <span className="block max-w-72 text-gr-xs text-ink-2 sm:text-sm">{name}</span>
                  </th>
                  {visibleColumns.map((column) => {
                    const value = row[column.key] ?? "";
                    return (
                      <td key={column.key} className={cell}>
                        <div className="max-w-72 min-w-24 text-ink">
                          {column.key === "productStatus" && value ? (
                            <span className="flex items-start gap-gr-xs">
                              <span
                                aria-hidden="true"
                                className={`mt-[0.45em] size-2 shrink-0 rounded-full ${statusDot[value] ?? "bg-mist"}`}
                              />
                              {show(value)}
                            </span>
                          ) : value ? (
                            show(value)
                          ) : (
                            <span className="text-mist">–</span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={visibleColumns.length + 2} className="px-gr-md py-gr-xl">
                  {/* Dibatasi selebar layar supaya pesan tidak ikut tergulir ke samping. */}
                  <div className="sticky left-gr-md max-w-[calc(100vw-4rem)] sm:max-w-md">
                    <p className="text-ink-2">{t.empty}</p>
                    <button
                      type="button"
                      onClick={resetView}
                      className="mt-gr-sm min-h-11 font-semibold text-ink underline decoration-teal decoration-2 underline-offset-[6px]"
                    >
                      {t.showAll}
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortHeader({
  label,
  columnKey,
  sort,
  onSort,
  className,
}: {
  label: string;
  columnKey: string;
  sort: Sort;
  onSort: (key: string) => void;
  className: string;
}) {
  const dir = sort?.key === columnKey ? sort.dir : null;
  return (
    <th
      scope="col"
      aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : undefined}
      className={`border-b border-rule bg-paper-2 p-0 align-top text-gr-xs font-semibold ${className}`}
    >
      <button
        type="button"
        onClick={() => onSort(columnKey)}
        className="flex min-h-11 w-full items-start justify-between gap-gr-sm px-gr-sm py-gr-sm text-left hover:text-blue"
      >
        <span className="max-w-48">{label}</span>
        <Icon
          name={dir === "asc" ? "sort-asc" : dir === "desc" ? "sort-desc" : "sort-none"}
          className={`size-4 shrink-0 ${dir ? "text-blue" : "text-ink-2/60"}`}
        />
      </button>
    </th>
  );
}
