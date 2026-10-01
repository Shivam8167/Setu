"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// JS Date#getDay() is 0=Sunday..6=Saturday; convert to Monday-first index (0=Monday..6=Sunday)
function mondayFirstDay(date: Date) {
  return (date.getDay() + 6) % 7;
}

function buildGrid(year: number, month: number) {
  const firstDay = mondayFirstDay(new Date(year, month, 1));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; inMonth: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({ day: cells.length - (firstDay + daysInMonth) + 1, inMonth: false });
  }
  return cells;
}

export default function CalendarCard() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = buildGrid(cursor.getFullYear(), cursor.getMonth());
  const isCurrentMonth = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

  return (
    <div
      className="flex h-full w-full min-w-0 flex-col gap-2.5 rounded-[1.25rem] border border-[var(--divider)] bg-[var(--surface)] p-3.5 screen-xl:p-4"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div className="flex shrink-0 items-center justify-between">
        <div>
          <p className="text-sm font-bold leading-tight text-[var(--icon-chip-fg)]">
            {MONTH_NAMES[cursor.getMonth()]}
          </p>
          <p className="text-[0.6875rem] font-medium text-[var(--text-muted)]">{cursor.getFullYear()}</p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))}
            className="tap-pop flex h-6 w-6 items-center justify-center rounded-[0.5rem] text-[var(--text-muted)] transition-colors hover:bg-[var(--search-bg)] hover:text-[var(--icon-chip-fg)]"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))}
            className="tap-pop flex h-6 w-6 items-center justify-center rounded-[0.5rem] text-[var(--text-muted)] transition-colors hover:bg-[var(--search-bg)] hover:text-[var(--icon-chip-fg)]"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]/70">
            {w}
          </span>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-7 gap-y-1 text-center">
        {cells.map((cell, i) => {
          const isToday = isCurrentMonth && cell.inMonth && cell.day === today.getDate();
          const isWeekend = i % 7 === 5 || i % 7 === 6;
          return (
            <div key={i} className="flex items-center justify-center">
              <span
                className={`tap-pop flex h-6 w-6 items-center justify-center rounded-full text-[0.6875rem] transition-colors ${
                  isToday
                    ? "bg-[#2563EB] font-bold text-white shadow-sm"
                    : cell.inMonth
                      ? `cursor-pointer hover:bg-[var(--search-bg)] ${isWeekend ? "text-[var(--text-muted)]" : "text-[var(--text-secondary)] font-medium"}`
                      : "text-[var(--divider)]"
                }`}
              >
                {cell.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}