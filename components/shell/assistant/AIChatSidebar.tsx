"use client";

import { Plus, PanelLeftClose, PanelLeftOpen, MessageSquare } from "lucide-react";
import { CHAT_GROUP_ORDER, type Conversation } from "@/lib/mock-data/assistant-chats";

export default function AIChatSidebar({
  conversations,
  activeId,
  collapsed,
  iconOnly = false,
  onToggleCollapse,
  onSelect,
  onNewChat,
}: {
  conversations: Conversation[];
  activeId: string | null;
  collapsed: boolean;
  iconOnly?: boolean;
  onToggleCollapse: () => void;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}) {
  const isCompact = collapsed || iconOnly;

  const grouped = CHAT_GROUP_ORDER.map((group) => ({
    group,
    items: conversations.filter((c) => c.group === group),
  })).filter((g) => g.items.length > 0);

  if (isCompact) {
    return (
      <aside
        aria-label="Chat history"
        className="flex h-full w-[3.5rem] shrink-0 flex-col items-center border-r border-black/5 bg-[#F7F8FC] py-3 transition-[width] duration-200 dark:border-white/10 dark:bg-[var(--assistant-sidebar-bg)]"
      >
        {/* Top Action */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onNewChat}
            title="New chat"
            className="tap-pop flex h-8 w-8 items-center justify-center rounded-lg border border-[#C7CAFF]/80 bg-white text-indigo-600 shadow-xs transition-all hover:bg-[#F1F3FF] dark:border-white/10 dark:bg-white/10 dark:text-indigo-400"
          >
            <Plus size={16} />
          </button>
          {!iconOnly && (
            <button
              type="button"
              title="Expand chat history"
              onClick={onToggleCollapse}
              className="tap-pop flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            >
              <PanelLeftOpen size={15} />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="my-2.5 h-px w-6 bg-black/10 dark:bg-white/10" />

        {/* Vertical Icon Chats List */}
        <nav className="flex flex-1 flex-col items-center gap-1.5 overflow-y-auto no-scrollbar px-1">
          {conversations.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                title={c.title}
                onClick={() => onSelect(c.id)}
                className={`tap-pop relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5 dark:bg-white/15 dark:text-indigo-400 dark:ring-white/10"
                    : "text-[var(--text-muted)] hover:bg-black/5 hover:text-[var(--text-heading)] dark:hover:bg-white/5"
                }`}
              >
                <MessageSquare size={16} />
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Chat history"
      className="flex h-full w-[16rem] shrink-0 flex-col overflow-hidden border-r border-black/5 bg-[#F7F8FC] transition-[width] duration-300 ease-out dark:border-white/10 dark:bg-[var(--assistant-sidebar-bg)]"
    >
      <div className="flex items-center justify-between gap-2 p-3">
        <button
          type="button"
          onClick={onNewChat}
          title="New chat"
          className="tap-pop flex h-8 min-w-0 items-center gap-1.5 rounded-full border border-[#C7CAFF] bg-white px-3.5 text-sm font-medium text-[var(--text-heading)] shadow-[0_1px_0.25rem_rgba(15,23,42,0.06)] transition-colors hover:bg-[#F1F3FF] dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          <Plus size={16} className="shrink-0" />
          <span className="truncate">New chat</span>
        </button>
        <button
          type="button"
          title="Collapse chat history"
          onClick={onToggleCollapse}
          className="tap-pop flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        >
          <PanelLeftClose size={16} />
        </button>
      </div>

      <nav className="mt-3 flex-1 overflow-y-auto px-2 pb-3">
        {grouped.map(({ group, items }) => (
          <div key={group} className="mb-3">
            <p className="px-2 pb-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {group}
            </p>
            <div className="flex flex-col gap-0.5">
              {items.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    title={c.title}
                    onClick={() => onSelect(c.id)}
                    className={`tap-pop flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-white font-medium text-[var(--text-heading)] shadow-[0_1px_0.25rem_rgba(15,23,42,0.06)] dark:bg-white/15 dark:text-white"
                        : "text-[var(--text-secondary)] hover:bg-white/70 dark:hover:bg-white/5"
                    }`}
                  >
                    <MessageSquare size={15} className="shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}