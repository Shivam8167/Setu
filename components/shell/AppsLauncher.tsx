"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Pencil, Star } from "lucide-react";
import { LAUNCHER_APPS, type LauncherApp } from "@/lib/mock-data/apps-launcher";
import { useLauncherState } from "@/lib/use-launcher-state";

type SortMode = "alpha" | "recent";
type Zone = "favorites" | "all";
type DropTarget = { zone: Zone; index: number };

function sortApps(apps: LauncherApp[], mode: SortMode, lastUsed: Record<string, number>): LauncherApp[] {
  const copy = [...apps];
  if (mode === "alpha") {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    copy.sort((a, b) => (lastUsed[b.id] ?? 0) - (lastUsed[a.id] ?? 0));
  }
  return copy;
}

function AppIcon({ app, size }: { app: LauncherApp; size: number }) {
  const [errored, setErrored] = useState(false);

  if (app.logoUrl && !errored) {
    return (
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <img
          src={app.logoUrl}
          alt={app.name}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          className="product-logo-light pointer-events-none shrink-0 object-contain"
          draggable={false}
          onError={() => setErrored(true)}
        />
        <img
          src={app.darkLogoUrl || app.logoUrl}
          alt={app.name}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          className="product-logo-dark pointer-events-none shrink-0 object-contain"
          draggable={false}
          onError={() => setErrored(true)}
        />
      </div>
    );
  }

  if (app.icon) {
    const Icon = app.icon;
    return (
      <span
        className="pointer-events-none flex shrink-0 items-center justify-center rounded-full transition-transform"
        style={{ width: size, height: size }}
      >
        {/* Light mode circle */}
        <span
          className="flex dark:hidden items-center justify-center rounded-full w-full h-full shadow-xs"
          style={{ backgroundColor: app.bg ?? "#E2E8F0" }}
        >
          <Icon size={Math.round(size * 0.52)} color={app.fg ?? "#0B1B3B"} />
        </span>
        {/* Dark mode circle: sophisticated translucent badge */}
        <span
          className="hidden dark:flex items-center justify-center rounded-full w-full h-full border border-white/10 shadow-xs"
          style={{ backgroundColor: app.bg ? app.bg + "28" : "rgba(255,255,255,0.08)" }}
        >
          <Icon size={Math.round(size * 0.52)} color={app.fg ?? "#93C5FD"} />
        </span>
      </span>
    );
  }

  return (
    <span
      className="pointer-events-none flex shrink-0 items-center justify-center rounded-full bg-[var(--search-bg)] border border-[var(--divider)] text-sm font-semibold text-[var(--text-secondary)]"
      style={{ width: size, height: size }}
    >
      {app.name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function AppsLauncher({ onClose }: { onClose: () => void }) {
  const { favorites, lastUsed, toggleFavorite, setFavoritesOrder, recordUsed } = useLauncherState();
  const [sortMode, setSortMode] = useState<SortMode>("alpha");
  const [editMode, setEditMode] = useState(false);

  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<DropTarget | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const dragMoved = useRef(false);
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const tileRefs = useRef(new Map<string, HTMLElement>());
  const favoritesGridRef = useRef<HTMLDivElement>(null);
  const allGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const dragEnabled = editMode;

  const favoriteApps = useMemo(
    () =>
      favorites
        .map((id) => LAUNCHER_APPS.find((app) => app.id === id))
        .filter((app): app is LauncherApp => Boolean(app)),
    [favorites]
  );

  const otherApps = useMemo(
    () => sortApps(LAUNCHER_APPS.filter((app) => !favorites.includes(app.id)), sortMode, lastUsed),
    [favorites, sortMode, lastUsed]
  );

  function openApp(app: LauncherApp) {
    if (!app.liveUrl) return;
    recordUsed(app.id);
    window.open(app.liveUrl, "_blank", "noopener,noreferrer");
    onClose();
  }

  const registerTile = useCallback((id: string, el: HTMLElement | null) => {
    if (el) tileRefs.current.set(id, el);
    else tileRefs.current.delete(id);
  }, []);

  const findInZone = useCallback((zone: Zone, x: number, y: number): DropTarget | null => {
    const grid = zone === "favorites" ? favoritesGridRef.current : allGridRef.current;
    if (!grid) return null;
    const gridRect = grid.getBoundingClientRect();
    if (x < gridRect.left || x > gridRect.right || y < gridRect.top || y > gridRect.bottom) {
      return null;
    }
    const children = Array.from(grid.children) as HTMLElement[];
    let closestIndex = children.length;
    let minDistance = Number.POSITIVE_INFINITY;
    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(x - cx, y - cy);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = index;
      }
    });
    return { zone, index: closestIndex };
  }, []);

  function handlePointerDown(e: ReactPointerEvent, app: LauncherApp) {
    if (!dragEnabled) return;
    e.preventDefault();
    dragMoved.current = false;
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    setDragId(app.id);
    setPointer({ x: e.clientX, y: e.clientY });
  }

  function handlePointerMove(e: ReactPointerEvent) {
    if (!dragId) return;
    setPointer({ x: e.clientX, y: e.clientY });
    if (dragOrigin.current) {
      const dist = Math.hypot(e.clientX - dragOrigin.current.x, e.clientY - dragOrigin.current.y);
      if (dist > 4) dragMoved.current = true;
    }
    const target = findInZone("favorites", e.clientX, e.clientY) || findInZone("all", e.clientX, e.clientY);
    setDragOver(target);
  }

  function handlePointerUp() {
    if (!dragId) return;
    if (dragOver && dragMoved.current) {
      const isFavorite = favorites.includes(dragId);
      if (dragOver.zone === "favorites") {
        const next = favorites.filter((id) => id !== dragId);
        const insertIndex = Math.min(dragOver.index, next.length);
        next.splice(insertIndex, 0, dragId);
        setFavoritesOrder(next);
      } else if (dragOver.zone === "all" && isFavorite) {
        toggleFavorite(dragId);
      }
    }
    setDragId(null);
    setDragOver(null);
    setPointer(null);
    dragOrigin.current = null;
  }

  function handleTileClick(app: LauncherApp) {
    if (dragMoved.current) {
      dragMoved.current = false;
      return;
    }
    if (editMode) {
      toggleFavorite(app.id);
      return;
    }
    openApp(app);
  }

  const draggedApp = dragId ? LAUNCHER_APPS.find((app) => app.id === dragId) ?? null : null;

  function jiggleStyle(index: number): React.CSSProperties | undefined {
    return dragEnabled ? ({ "--jiggle-delay": ((index % 3) * 0.06) + "s" } as React.CSSProperties) : undefined;
  }

  return (
    <div
      className="
        absolute right-0 top-[calc(100%+var(--page-pad-y))] z-50
        flex max-h-[42rem] w-[28rem] max-w-[calc(100vw-1.5rem)]
        flex-col overflow-hidden rounded-2xl border border-[var(--divider)]
        bg-[var(--surface)] text-[var(--text-heading)]
        shadow-2xl backdrop-blur-xl
        animate-in fade-in-0 zoom-in-95 duration-150
      "
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--divider)]/50 px-4 py-3">
        <p className="text-sm font-bold tracking-tight text-[var(--text-heading)]">Sahayogi Apps</p>
        <button
          type="button"
          title={editMode ? "Done editing" : "Edit favorites"}
          onClick={() => setEditMode((v) => !v)}
          className={"tap-pop flex h-7 w-7 items-center justify-center rounded-lg transition-colors " + (
            editMode
              ? "bg-blue-600 text-white shadow-xs"
              : "text-[var(--text-muted)] hover:bg-[var(--search-bg)] hover:text-[var(--text-heading)]"
          )}
        >
          <Pencil size={14} />
        </button>
      </div>

      {/* App Lists */}
      <div
        className="min-h-0 flex-1 overflow-y-auto p-3 space-y-4"
        onPointerMove={dragId ? handlePointerMove : undefined}
        onPointerUp={dragId ? handlePointerUp : undefined}
        onPointerCancel={dragId ? handlePointerUp : undefined}
      >
        {favoriteApps.length > 0 && (
          <div className="rounded-2xl border border-[var(--divider)]/60 bg-[var(--search-bg)]/70 p-3 shadow-inner">
            <div className="flex items-center justify-between px-1 pb-2 pt-0.5">
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Your Favorites
              </p>
              {editMode && (
                <span className="text-[0.625rem] font-medium text-amber-500">
                  Tap &minus; to remove
                </span>
              )}
            </div>
            <div
              ref={favoritesGridRef}
              data-zone="favorites"
              className={"grid grid-cols-3 gap-1.5 rounded-xl pb-1 transition-colors " + (
                dragOver?.zone === "favorites" ? "bg-[var(--surface)] ring-2 ring-blue-500/40" : ""
              )}
            >
              {favoriteApps.map((app, index) => (
                <button
                  key={app.id}
                  ref={(el) => registerTile(app.id, el)}
                  type="button"
                  onClick={() => handleTileClick(app)}
                  onPointerDown={(e) => handlePointerDown(e, app)}
                  style={{ touchAction: dragEnabled ? "none" : undefined, ...jiggleStyle(index) }}
                  className={"group tap-pop flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-all cursor-pointer hover:bg-white/80 dark:hover:bg-white/[0.06] hover:shadow-xs active:scale-95 " + (
                    dragEnabled && dragId !== app.id ? "launcher-jiggle" : ""
                  ) + " " + (dragId === app.id ? "opacity-30" : "")}
                >
                  <span className="relative transition-transform duration-200 group-hover:scale-105">
                    <AppIcon app={app} size={56} />
                    {editMode && (
                      <span className="pointer-events-none absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[0.625rem] font-bold text-white shadow-sm">
                        &minus;
                      </span>
                    )}
                  </span>
                  <span className="text-[0.6875rem] font-medium leading-tight text-[var(--text-secondary)] group-hover:text-[var(--text-heading)] transition-colors">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between px-1 pb-2 pt-1">
            <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              All Products & Tools
            </p>
            {editMode ? (
              <p className="text-[0.625rem] text-[var(--text-muted)]">Drag to arrange</p>
            ) : (
              <div className="flex overflow-hidden rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)] p-0.5 text-[0.625rem]">
                <button
                  type="button"
                  onClick={() => setSortMode("alpha")}
                  className={"rounded px-2.5 py-0.5 font-semibold transition-all " + (
                    sortMode === "alpha"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-heading)]"
                  )}
                >
                  A&ndash;Z
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("recent")}
                  className={"rounded px-2.5 py-0.5 font-semibold transition-all " + (
                    sortMode === "recent"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-heading)]"
                  )}
                >
                  Recent
                </button>
              </div>
            )}
          </div>

          <div
            ref={allGridRef}
            data-zone="all"
            className={"grid grid-cols-3 gap-1.5 rounded-xl pb-2 transition-colors " + (
              dragOver?.zone === "all" ? "bg-[var(--search-bg)] ring-2 ring-blue-500/40" : ""
            )}
          >
            {otherApps.map((app, index) => (
              <div
                key={app.id}
                ref={(el) => registerTile(app.id, el)}
                role="button"
                tabIndex={0}
                onClick={() => handleTileClick(app)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleTileClick(app);
                }}
                onPointerDown={(e) => handlePointerDown(e, app)}
                style={{ touchAction: dragEnabled ? "none" : undefined, ...jiggleStyle(index) }}
                className={"group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-all hover:bg-[var(--search-bg)] hover:shadow-xs active:scale-95 " + (
                  dragEnabled && dragId !== app.id ? "launcher-jiggle" : ""
                ) + " " + (dragId === app.id ? "opacity-30" : "")}
              >
                <button
                  type="button"
                  title={favorites.includes(app.id) ? "Remove from favorites" : "Add to favorites"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(app.id);
                  }}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-[var(--text-muted)] opacity-0 transition-opacity hover:text-amber-400 group-hover:opacity-100"
                >
                  <Star
                    size={12}
                    fill={favorites.includes(app.id) ? "currentColor" : "none"}
                    className={favorites.includes(app.id) ? "text-amber-400 opacity-100" : ""}
                  />
                </button>
                <span className="transition-transform duration-200 group-hover:scale-105">
                  <AppIcon app={app} size={46} />
                </span>
                <span className="text-[0.6875rem] font-medium leading-tight text-[var(--text-secondary)] group-hover:text-[var(--text-heading)] transition-colors">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {draggedApp && pointer && (
        <div
          className="pointer-events-none fixed z-[60] flex flex-col items-center gap-1 opacity-90"
          style={{ left: pointer.x - 22, top: pointer.y - 22 }}
        >
          <AppIcon app={draggedApp} size={44} />
        </div>
      )}
    </div>
  );
}
