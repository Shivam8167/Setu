"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Layers,
  HeartPulse,
  BarChart3,
  Flag,
  GitBranch,
} from "lucide-react";

type NavItem = {
  label: string;
  slug: string;
  href: string;
  bg: string;
  fg: string;
  icon: (color: string) => ReactNode;
};

// Product Manager primary navigation pillars
const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    slug: "products",
    href: "/products",
    bg: "#EDE9FE",
    fg: "#7C3AED",
    icon: (color) => <Layers color={color} size={20} />,
  },
  {
    label: "Health",
    slug: "health",
    href: "/health",
    bg: "#FFE4E6",
    fg: "#E11D48",
    icon: (color) => <HeartPulse color={color} size={20} />,
  },
  {
    label: "Usage",
    slug: "usage",
    href: "/usage",
    bg: "#CCFBF1",
    fg: "#0D9488",
    icon: (color) => <BarChart3 color={color} size={20} />,
  },
  {
    label: "Flags",
    slug: "feature-flags",
    href: "/feature-flags",
    bg: "#FEF3C7",
    fg: "#D97706",
    icon: (color) => <Flag color={color} size={20} />,
  },
  {
    label: "Releases",
    slug: "releases",
    href: "/releases",
    bg: "#D1FAE5",
    fg: "#059669",
    icon: (color) => <GitBranch color={color} size={20} />,
  },
];

const INDICATOR_COLOR = "#0B1B3B";
const INACTIVE_ICON_COLOR = "#475569";

export default function Sidebar() {
  const pathname = usePathname();
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ top: number; height: number } | null>(null);

  const activeIndex = NAV_ITEMS.findIndex((item) => {
    if (item.slug === "products") {
      return (
        pathname === "/products" ||
        pathname.startsWith("/products/") ||
        pathname === "/features" ||
        pathname.startsWith("/features/")
      );
    }
    if (item.slug === "health") {
      return pathname === "/health" || pathname.startsWith("/health/");
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  });

  useEffect(() => {
    function measure() {
      const el = iconRefs.current[activeIndex];
      setIndicator(el ? { top: el.offsetTop, height: el.offsetHeight } : null);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <aside
      className="
        fixed inset-x-0 bottom-0 z-40
        flex h-[4rem] w-full
        flex-row items-center justify-around
        gap-1 overflow-x-auto
        bg-[var(--shell-bg)]
        px-1 py-1

        screen-sm:relative
        screen-sm:h-full
        screen-sm:w-[var(--sidebar-w)]
        screen-sm:flex-col
        screen-sm:items-center
        screen-sm:justify-start
        screen-sm:gap-1
        screen-sm:overflow-visible
        screen-sm:px-0
        screen-sm:py-0
      "
      aria-label="Primary navigation"
    >
      {/* Active indicator */}
      {indicator && (
        <span
          aria-hidden="true"
          className="hidden screen-sm:block absolute left-0 w-1 rounded-full transition-all duration-300 ease-out"
          style={{ top: indicator.top, height: indicator.height, backgroundColor: INDICATOR_COLOR }}
        />
      )}
      {/* Logo — Top-left corner link to return to Dashboard / Home */}
      <Link
        href="/dashboard"
        aria-label="Go to overview"
        title="Sahayogi Setu — Return to Overview"
        className="
          hidden
          w-full
          shrink-0
          items-center
          justify-center
          tap-pop
          transition-transform
          hover:scale-105

          screen-sm:flex
          screen-sm:h-[var(--header-h)]
        "
      >
        <Image
          src="/logo.svg"
          alt="Setu"
          width={63}
          height={77}
          className="h-[2.5rem] w-[2rem] transition-opacity hover:opacity-80 dark:hidden"
          priority
        />
        <Image
          src="/logo-dark.svg"
          alt="Setu"
          width={63}
          height={77}
          className="hidden h-[2.5rem] w-[2rem] transition-opacity hover:opacity-80 dark:block"
          priority
        />
      </Link>

      {/* Navigation */}
      <nav
        className="
          flex
          w-full
          flex-row
          items-center
          justify-around
          gap-1

          screen-sm:flex-1
          screen-sm:flex-col
          screen-sm:justify-start
          screen-sm:gap-1.5
          screen-sm:overflow-y-auto
          screen-sm:overflow-x-hidden
          screen-sm:px-1
          screen-sm:pt-1
        "
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex;
          const iconColor = isActive ? item.fg : INACTIVE_ICON_COLOR;

          return (
            <Link
              key={item.slug}
              href={item.href}
              title={item.label}
              aria-current={isActive ? "page" : undefined}
              className="
                group
                tap-pop
                flex
                shrink-0
                flex-col
                items-center
                gap-1
              "
            >
              {/* Icon */}
              <span
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="
                  flex
                  h-[2.75rem] w-[2.75rem]
                  items-center
                  justify-center
                  rounded-lg
                  transition-all
                  duration-200
                  group-hover:scale-105
                  group-hover:bg-[var(--search-bg)]
                "
              >
                {item.icon(iconColor)}
              </span>

              {/* Label */}
              <span
                className={`
                  hidden
                  min-h-[1.5rem]
                  max-w-full
                  text-center
                  text-[0.75rem]
                  font-medium
                  leading-[0.875rem]
                  tracking-tight

                  screen-sm:block

                  ${isActive ? "font-semibold text-blue-600 dark:text-blue-400" : "text-[var(--text-muted)] group-hover:text-[var(--text-heading)]"}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
