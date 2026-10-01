"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mic, Paperclip, Send, X, Maximize2, Minimize2, PanelLeft } from "lucide-react";
import type { Conversation } from "@/lib/mock-data/assistant-chats";

export default function AIConversationPanel({
  variant,
  conversation,
  onPrimaryAction,
  onClose,
  onSend,
  onToggleMobileHistory,
}: {
  variant: "docked" | "workspace";
  conversation: Conversation | null;
  onPrimaryAction: () => void;
  onClose: () => void;
  onSend: (text: string) => void;
  onToggleMobileHistory?: () => void;
}) {
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isWorkspace = variant === "workspace";
  const widthClass = isWorkspace ? "mx-auto w-full max-w-3xl" : "w-full";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [conversation?.messages.length]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMessage("");
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-[#EEF1FF] via-[#F1F6FF] to-white dark:from-[var(--assistant-panel-from)] dark:via-[var(--assistant-panel-via)] dark:to-[var(--assistant-panel-to)]">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-black/5 px-4 py-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          {isWorkspace && onToggleMobileHistory && (
            <button
              type="button"
              title="Chat history"
              onClick={onToggleMobileHistory}
              className="tap-pop flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-black/5 dark:hover:bg-white/5 screen-sm:hidden"
            >
              <PanelLeft size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title={isWorkspace ? "Collapse" : "Expand"}
            onClick={onPrimaryAction}
            className="tap-pop flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            {isWorkspace ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <span className="h-4 w-px bg-black/10 dark:bg-white/10" />
          <button
            type="button"
            title="Close"
            onClick={onClose}
            aria-label="Close assistant"
            className="tap-pop flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Body: Bot centered in the middle when no conversation */}
      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5">
        <div className={`flex flex-1 flex-col ${widthClass} ${!conversation ? "items-center justify-center" : ""}`}>
          {!conversation ? (
            <div className="relative my-auto flex flex-col items-center justify-center py-8 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.18),transparent)]"
              />
              <Image
                src="/bot-icon.svg"
                alt="Sahayogi Bot"
                width={104}
                height={140}
                className="relative drop-shadow-xl transition-transform hover:scale-105"
                priority
              />
              <p className="relative mt-4 text-base font-medium text-[var(--text-secondary)]">
                Hello! I&rsquo;m <span className="font-bold text-[var(--text-heading)]">Sahayogi</span>
              </p>
              <p className="relative mt-1 text-sm text-[var(--text-muted)]">
                How can I help you today?
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-3 py-4">
              {conversation.messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-[0_1px_0.25rem_rgba(15,23,42,0.06)] ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white"
                        : "bg-white text-[var(--text-heading)] dark:bg-[var(--surface)] dark:text-[var(--text-heading)] dark:border dark:border-white/5"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="flex shrink-0 flex-col items-center px-4 pb-4 pt-2">
        <div className={`flex w-full flex-col ${widthClass}`}>
          {/* Search / Input bar */}
          <div
            className="flex items-center gap-2 rounded-full border border-[#C7CAFF] bg-white/95 py-2 pl-4 pr-2 shadow-[0_2px_0.625rem_rgba(99,102,241,0.15)] transition-shadow focus-within:shadow-[0_2px_0.875rem_rgba(99,102,241,0.22)] dark:border-white/10 dark:bg-[var(--surface)]"
          >
            <button
              type="button"
              title="Voice input"
              className="tap-pop flex h-6 w-6 shrink-0 items-center justify-center text-[var(--text-muted)] transition-transform hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Mic size={16} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(message);
              }}
              placeholder="Ask anything..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--search-placeholder)]"
            />
            <button
              type="button"
              title="Attach a file"
              className="tap-pop flex h-6 w-6 shrink-0 items-center justify-center text-[var(--text-muted)] transition-transform hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Paperclip size={16} />
            </button>
            <button
              type="button"
              title="Send"
              onClick={() => handleSend(message)}
              disabled={message.trim().length === 0}
              className="tap-pop flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}