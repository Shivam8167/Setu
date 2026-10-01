"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Users,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Sunrise,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  ShieldAlert,
  Flag,
  GitBranch,
  Zap,
  ArrowUp,
} from "lucide-react";
import Card from "@/components/shared/Card";
import CalendarCard from "@/components/shared/CalendarCard";
import GreetingCard from "@/components/shared/GreetingCard";
import KPITile from "@/components/shared/KPITile";
import {
  mockCurrentUser,
  mockProducts,
  mockFeatures,
  mockFeatureFlags,
  mockLimitPressures,
  mockAdoptionTrend,
  mockRecentActivity,
  mockReleases,
} from "@/lib/mockData";

// Smooth Cubic Bezier Spline calculation (Catmull-Rom to Cubic Bezier)
function getCurvedPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

const TIMEFRAME_OPTIONS = [
  { value: "30d", shortLabel: "30D", label: "Last 30 Days", velocity: "+1.6% WoW growth" },
  { value: "3m", shortLabel: "3M", label: "Last 3 Months", velocity: "+3.2% MoM growth" },
  { value: "6m", shortLabel: "6M", label: "Last 6 Months", velocity: "+4.8% MoM growth" },
  { value: "ytd", shortLabel: "YTD", label: "Year to Date", velocity: "+9.4% YTD growth" },
  { value: "1y", shortLabel: "1Y", label: "Last 12 Months", velocity: "+14.6% YoY growth" },
];

const TIMEFRAME_DATA: Record<string, { month: string; overall: number; aiAssistant: number; whatsappCloud: number; multiAgent: number }[]> = {
  "30d": [
    { month: "W1", overall: 76.2, aiAssistant: 71.0, whatsappCloud: 90.5, multiAgent: 35.8 },
    { month: "W2", overall: 77.1, aiAssistant: 72.4, whatsappCloud: 91.2, multiAgent: 36.9 },
    { month: "W3", overall: 77.8, aiAssistant: 73.6, whatsappCloud: 91.9, multiAgent: 37.8 },
    { month: "W4", overall: 78.4, aiAssistant: 74.5, whatsappCloud: 92.4, multiAgent: 38.6 },
  ],
  "3m": [
    { month: "Jul", overall: 73, aiAssistant: 66, whatsappCloud: 88, multiAgent: 31 },
    { month: "Aug", overall: 76, aiAssistant: 71, whatsappCloud: 90, multiAgent: 35 },
    { month: "Sep", overall: 78.4, aiAssistant: 74.5, whatsappCloud: 92.4, multiAgent: 38.6 },
  ],
  "6m": mockAdoptionTrend,
  ytd: [
    { month: "Jan", overall: 48, aiAssistant: 32, whatsappCloud: 62, multiAgent: 12 },
    { month: "Mar", overall: 54, aiAssistant: 38, whatsappCloud: 68, multiAgent: 15 },
    { month: "May", overall: 64, aiAssistant: 51, whatsappCloud: 78, multiAgent: 22 },
    { month: "Jul", overall: 73, aiAssistant: 66, whatsappCloud: 88, multiAgent: 31 },
    { month: "Sep", overall: 78.4, aiAssistant: 74.5, whatsappCloud: 92.4, multiAgent: 38.6 },
  ],
  "1y": [
    { month: "Oct '25", overall: 42, aiAssistant: 24, whatsappCloud: 54, multiAgent: 8 },
    { month: "Dec '25", overall: 46, aiAssistant: 29, whatsappCloud: 60, multiAgent: 11 },
    { month: "Feb '26", overall: 52, aiAssistant: 36, whatsappCloud: 66, multiAgent: 14 },
    { month: "Apr", overall: 58, aiAssistant: 42, whatsappCloud: 72, multiAgent: 18 },
    { month: "Jun", overall: 69, aiAssistant: 59, whatsappCloud: 84, multiAgent: 27 },
    { month: "Sep", overall: 78.4, aiAssistant: 74.5, whatsappCloud: 92.4, multiAgent: 38.6 },
  ],
};

const SERIES_META: Record<string, { label: string; color: string; bg: string }> = {
  overall: { label: "Overall Feature Adoption", color: "#0058DD", bg: "rgba(0, 88, 221, 0.08)" },
  aiAssistant: { label: "AI Assistant V2", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.08)" },
  whatsappCloud: { label: "WhatsApp Cloud API", color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
  multiAgent: { label: "Multi-Agent Routing", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
};

export default function DashboardOverviewPage() {
  const [flags, setFlags] = useState(mockFeatureFlags);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("6m");
  const [activeSeries, setActiveSeries] = useState<"overall" | "aiAssistant" | "whatsappCloud" | "multiAgent">("overall");
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>("all");
  const [updatedAt] = useState<Date>(() => new Date());

  const [confirmModal, setConfirmModal] = useState<{ open: boolean; flagId: string; flagName: string; action: "kill" | "pause" | "resume" }>({
    open: false,
    flagId: "",
    flagName: "",
    action: "pause",
  });

  const trendData = TIMEFRAME_DATA[selectedTimeframe] || TIMEFRAME_DATA["6m"];
  const currentVelocity = TIMEFRAME_OPTIONS.find((t) => t.value === selectedTimeframe)?.velocity || "+4.8% MoM growth";

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(680);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setChartWidth(Math.round(entry.contentRect.width));
        }
      }
    });
    ro.observe(chartContainerRef.current);
    return () => ro.disconnect();
  }, []);

  const plotLeft = 45;
  const plotRight = Math.max(plotLeft + 100, chartWidth - 25);
  const plotWidth = plotRight - plotLeft;
  const plotTop = 18;
  const plotHeight = 170;
  const plotBottom = plotTop + plotHeight;

  const activePts = useMemo(() => {
    return trendData.map((d, i) => ({
      x: Number((plotLeft + (i / Math.max(1, trendData.length - 1)) * plotWidth).toFixed(1)),
      y: Number((plotTop + (1 - d[activeSeries] / 100) * plotHeight).toFixed(1)),
      val: d[activeSeries],
      month: d.month,
    }));
  }, [trendData, activeSeries, plotWidth, plotLeft, plotTop, plotHeight]);

  const activeCurvePath = useMemo(() => getCurvedPath(activePts), [activePts]);

  const activeAreaPath = useMemo(() => {
    if (activePts.length === 0) return "";
    return `${activeCurvePath} L ${activePts[activePts.length - 1].x} ${plotBottom} L ${activePts[0].x} ${plotBottom} Z`;
  }, [activeCurvePath, activePts, plotBottom]);

  // Filter products if needed
  const displayProducts = useMemo(() => {
    if (selectedProductFilter === "all") return mockProducts;
    return mockProducts.filter((p) => p.id === selectedProductFilter);
  }, [selectedProductFilter]);

  // Top 5 features sorted by adoption
  const topFeatures = useMemo(() => {
    return [...mockFeatures].sort((a, b) => b.adoptionRate - a.adoptionRate).slice(0, 5);
  }, []);

  const handleFlagAction = (flagId: string, flagName: string, action: "kill" | "pause" | "resume") => {
    setConfirmModal({ open: true, flagId, flagName, action });
  };

  const confirmFlagAction = () => {
    const { flagId, action } = confirmModal;
    setFlags((prev) =>
      prev.map((f) => {
        if (f.id !== flagId) return f;
        if (action === "kill") return { ...f, status: "RolledBack", rolloutPercentage: 0 };
        if (action === "pause") return { ...f, status: "Paused" };
        if (action === "resume") return { ...f, status: "Active" };
        return f;
      })
    );
    setConfirmModal({ open: false, flagId: "", flagName: "", action: "pause" });
  };

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Overview Section: 8 Product Manager KPI Cards (4x2 Grid) + Mini CalendarCard */}
      <div className="grid grid-cols-1 items-stretch gap-4 screen-xl:grid-cols-[minmax(0,4fr)_minmax(0,1fr)]">
        {/* 4x2 Grid for 8 Top Product Manager Cards */}
        <div className="grid min-w-0 grid-cols-2 gap-2.5 screen-sm:gap-4 screen-lg:grid-cols-4">
          {/* Card 1: Greeting Card */}
          <div className="col-span-2 screen-sm:col-span-1 min-w-0">
            <GreetingCard name={mockCurrentUser.name} />
          </div>

          {/* Card 2: Monitored Products */}
          <div className="min-w-0">
            <KPITile
              title="Monitored Products"
              value="8"
              trendDirection="up"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
                  +4 Added
                </span>
              }
              status="healthy"
              drillHref="/founder/products"
              icon={<Layers size={18} />}
              iconBg="#EFF6FF"
              iconFg="#2563EB"
              secondary={[
                { label: "Healthy", value: "7", color: "#16A34A" },
                { label: "Degraded", value: "1", color: "#DC2626" },
              ]}
            />
          </div>

          {/* Card 3: Active Workspaces */}
          <div className="min-w-0">
            <KPITile
              title="Active Workspaces"
              value="2,150"
              trendDirection="up"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">
                  <ArrowUp size={11} /> +16.8% MoM
                </span>
              }
              status="healthy"
              drillHref="/founder/usage"
              icon={<Users size={18} />}
              iconBg="#ECFDF5"
              iconFg="#059669"
            />
          </div>

          {/* Card 4: Limit Pressure Alerts */}
          <div className="min-w-0">
            <KPITile
              title="Limit Pressure Alerts"
              value="8"
              status="warning"
              drillHref="/founder/usage"
              icon={<AlertTriangle size={18} />}
              iconBg="#FFF7ED"
              iconFg="#EA580C"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-semibold text-amber-700">
                  Quota Watch
                </span>
              }
              secondary={[
                { label: "Critical", value: "2", color: "#DC2626" },
                { label: "Warning", value: "6", color: "#D97706" },
              ]}
            />
          </div>

          {/* Card 5: Managed Features */}
          <div className="min-w-0">
            <KPITile
              title="Managed Features"
              value="16"
              trendDirection="up"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-semibold text-purple-700">
                  +8 New
                </span>
              }
              status="healthy"
              drillHref="/founder/features"
              icon={<Sparkles size={18} />}
              iconBg="#F5F3FF"
              iconFg="#7C3AED"
            />
          </div>

          {/* Card 6: Average Feature Adoption */}
          <div className="min-w-0">
            <KPITile
              title="Avg Feature Adoption"
              value="85.6%"
              trendDirection="up"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-[var(--trend-up-bg)] px-1.5 py-0.5 text-xs font-semibold text-[var(--trend-up-fg)]">
                  <ArrowUp size={11} /> +5.4%
                </span>
              }
              status="healthy"
              drillHref="/founder/features/adoption"
              icon={<TrendingUp size={18} />}
              iconBg="#F0FDF4"
              iconFg="#16A34A"
            />
          </div>

          {/* Card 7: Controlled Feature Flags */}
          <div className="min-w-0">
            <KPITile
              title="Controlled Flags"
              value="10"
              status="healthy"
              trendDirection="up"
              drillHref="/founder/feature-flags"
              icon={<Flag size={18} />}
              iconBg="#EEF2FF"
              iconFg="#4F46E5"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-semibold text-indigo-700">
                  4 Staged
                </span>
              }
              secondary={[
                { label: "Active", value: "8", color: "#16A34A" },
                { label: "Canary", value: "1", color: "#0284C7" },
                { label: "Paused", value: "1", color: "#D97706" },
              ]}
            />
          </div>

          {/* Card 8: Active Releases & Deployments */}
          <div className="col-span-2 screen-sm:col-span-1 min-w-0">
            <KPITile
              title="Active Releases"
              value="8"
              trendDirection="up"
              status="healthy"
              drillHref="/founder/releases"
              icon={<GitBranch size={18} />}
              iconBg="#F0FDFA"
              iconFg="#0D9488"
              trend={
                <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-1.5 py-0.5 text-xs font-semibold text-teal-700">
                  99.9% SLA
                </span>
              }
              secondary={[
                { label: "Production", value: "7", color: "#16A34A" },
                { label: "Canary", value: "1", color: "#0284C7" },
              ]}
            />
          </div>
        </div>

        {/* Right Section: Mini Calendar Widget */}
        <div className="hidden screen-xl:block">
          <CalendarCard />
        </div>
      </div>

      {/* Row 1: Feature Adoption Trend & Top Feature Adoption Leaderboard */}
      <div className="grid grid-cols-1 items-stretch gap-[var(--space-md)] screen-lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Adoption Trend Chart */}
        <Card
          title="Feature Adoption Trend"
          subtitle={`Adoption trajectories across Sahayogi ecosystem products (${selectedTimeframe.toUpperCase()})`}
          badge={{ text: currentVelocity, variant: "success" }}
          action={
            <div className="flex items-center gap-2">
              {/* Modern Segmented Timeframe Control */}
              <div className="inline-flex items-center rounded-lg border border-[var(--divider)]/90 bg-[var(--surface-muted)]/90 p-0.5 shadow-2xs">
                {TIMEFRAME_OPTIONS.map((t) => {
                  const isSelected = selectedTimeframe === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => {
                        setSelectedTimeframe(t.value);
                        setHoveredIdx(null);
                      }}
                      className={`tap-pop relative rounded-md px-2.5 py-1 text-[0.6875rem] font-semibold transition-all duration-150 ${
                        isSelected
                          ? "bg-[var(--surface)] text-[var(--text-heading)] shadow-xs"
                          : "text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--surface-muted)]"
                      }`}
                    >
                      {t.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Deep Dive Action Link */}
              <Link
                href="/founder/features/adoption"
                className="tap-pop inline-flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--text-heading)] shadow-2xs hover:bg-[var(--surface-muted)] transition-colors"
              >
                <span>Deep Dive</span>
                <ArrowUpRight size={13} className="text-[var(--text-muted)]" />
              </Link>
            </div>
          }
        >
          {/* Series Toggle Pills — inset border prevents top-left clipping */}
          <div className="mb-4 flex flex-wrap items-center gap-2 px-1 pt-0.5">
            {(Object.keys(SERIES_META) as (keyof typeof SERIES_META)[]).map((key) => {
              const meta = SERIES_META[key];
              const isActive = activeSeries === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveSeries(key);
                    setHoveredIdx(null);
                  }}
                  className={`tap-pop inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all duration-150 ${
                    isActive
                      ? "font-semibold shadow-2xs"
                      : "font-medium opacity-70 hover:opacity-100 hover:bg-[var(--surface-muted)]"
                  }`}
                  style={{
                    backgroundColor: isActive ? meta.bg : "transparent",
                    color: meta.color,
                    boxShadow: isActive ? `inset 0 0 0 1.5px ${meta.color}` : "inset 0 0 0 1px rgba(203, 213, 225, 0.7)",
                  }}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>

          {/* SVG Multi-line Responsive Spline Chart */}
          <div ref={chartContainerRef} className="relative h-64 w-full select-none">
            <svg
              className="h-full w-full"
              viewBox={`0 0 ${chartWidth} 230`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SERIES_META[activeSeries].color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={SERIES_META[activeSeries].color} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((v) => {
                const y = Math.round(plotTop + (1 - v / 100) * plotHeight);
                return (
                  <g key={v}>
                    <line
                      x1={plotLeft}
                      y1={y}
                      x2={plotRight}
                      y2={y}
                      stroke="rgba(15, 23, 42, 0.06)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={plotLeft - 10}
                      y={y + 3.5}
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="500"
                      fill="#94A3B8"
                    >
                      {v}%
                    </text>
                  </g>
                );
              })}

              {/* Area Fill for Active Series */}
              {activeAreaPath && (
                <path d={activeAreaPath} fill="url(#chartGrad)" />
              )}

              {/* Non-active series curves (subtle background reference) */}
              {(["overall", "aiAssistant", "whatsappCloud", "multiAgent"] as const)
                .filter((k) => k !== activeSeries)
                .map((key) => {
                  const meta = SERIES_META[key];
                  const keyPts = trendData.map((d, i) => ({
                    x: Number((plotLeft + (i / Math.max(1, trendData.length - 1)) * plotWidth).toFixed(1)),
                    y: Number((plotTop + (1 - d[key] / 100) * plotHeight).toFixed(1)),
                  }));
                  const curvePath = getCurvedPath(keyPts);

                  return (
                    <g key={key}>
                      <path
                        d={curvePath}
                        fill="none"
                        stroke={meta.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.32"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {keyPts.map((p, idx) => (
                        <circle
                          key={idx}
                          cx={p.x}
                          cy={p.y}
                          r="2.5"
                          fill="#FFFFFF"
                          stroke={meta.color}
                          strokeWidth="1.5"
                          opacity="0.5"
                        />
                      ))}
                    </g>
                  );
                })}

              {/* Active Series Curved Line (Prominent & Smooth Spline) */}
              {activeCurvePath && (
                <path
                  d={activeCurvePath}
                  fill="none"
                  stroke={SERIES_META[activeSeries].color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Active Series Data Points (100% Round Circles, Never Distorted!) */}
              {activePts.map((p, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Vertical hover guide */}
                    {isHovered && (
                      <line
                        x1={p.x}
                        y1={plotTop}
                        x2={p.x}
                        y2={plotBottom}
                        stroke={SERIES_META[activeSeries].color}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        opacity="0.4"
                      />
                    )}
                    {/* Outer glow ring on hover */}
                    {isHovered && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="8"
                        fill={SERIES_META[activeSeries].color}
                        opacity="0.15"
                      />
                    )}
                    {/* Main white circle with colored ring */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 5.5 : 4}
                      fill="#FFFFFF"
                      stroke={SERIES_META[activeSeries].color}
                      strokeWidth={isHovered ? 2.5 : 2}
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}

              {/* X Axis Month Labels */}
              {trendData.map((d, i) => {
                const x = Number((plotLeft + (i / Math.max(1, trendData.length - 1)) * plotWidth).toFixed(1));
                const isHovered = hoveredIdx === i;
                return (
                  <text
                    key={i}
                    x={x}
                    y={224}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isHovered ? "700" : "500"}
                    fill={isHovered ? "#0F172A" : "#64748B"}
                    className="transition-colors"
                  >
                    {d.month}
                  </text>
                );
              })}
            </svg>

            {/* Floating Value Tooltip on Hover */}
            {hoveredIdx !== null && activePts[hoveredIdx] && (
              <div
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-[var(--divider)] bg-[var(--surface)]/95 px-2.5 py-1 text-center shadow-md backdrop-blur-xs transition-all duration-75"
                style={{
                  left: `${(activePts[hoveredIdx].x / chartWidth) * 100}%`,
                  top: `${(activePts[hoveredIdx].y / 230) * 100}%`,
                  marginTop: "-10px",
                }}
              >
                <p className="text-[0.6875rem] font-medium text-[var(--text-muted)]">{trendData[hoveredIdx].month}</p>
                <p className="text-xs font-bold" style={{ color: SERIES_META[activeSeries].color }}>
                  {trendData[hoveredIdx][activeSeries]}%
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Top Feature Adoption Leaderboard */}
        <Card
          title="Top Feature Adoption"
          subtitle="Highest engaging capabilities"
          badge={{ text: "Live", variant: "info" }}
          action={
            <Link
              href="/founder/features"
              className="tap-pop inline-flex items-center gap-1 text-xs font-semibold text-[var(--icon-chip-fg)] hover:underline"
            >
              All Features <ArrowUpRight size={13} />
            </Link>
          }
        >
          <div className="flex flex-col gap-3.5">
            {topFeatures.map((f, idx) => {
              const isHigh = f.adoptionRate >= 80;
              return (
                <div key={f.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--search-bg)] text-[0.6875rem] font-bold text-[var(--icon-chip-fg)]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-[var(--text-heading)]">{f.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--text-heading)]">{f.adoptionRate}%</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[0.625rem] font-semibold ${
                          isHigh ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {f.tier}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--search-bg)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${f.adoptionRate}%`,
                        backgroundColor: isHigh ? "#10B981" : "#0058DD",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 2: Product Performance & Adoption Table */}
      <Card
        title="Product Performance & Adoption Overview"
        subtitle="Operational telemetry, tier category, active tenants, and release versions across all 9 products"
        badge={{ text: `${mockProducts.length} Products`, variant: "neutral" }}
        action={
          <div className="flex items-center gap-2">
            <select
              value={selectedProductFilter}
              onChange={(e) => setSelectedProductFilter(e.target.value)}
              className="rounded-lg border border-[var(--input-border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--icon-chip-fg)] shadow-sm focus:outline-none"
            >
              <option value="all">All Ecosystem Products</option>
              {mockProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <Link
              href="/founder/products"
              className="tap-pop inline-flex items-center gap-1 rounded-md border border-[var(--input-border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--icon-chip-fg)] hover:bg-[var(--search-bg)]"
            >
              Manage Products <ArrowUpRight size={13} />
            </Link>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--card-border)] text-[var(--text-muted)]">
                <th className="pb-3 font-semibold">Product Name</th>
                <th className="pb-3 font-semibold">Tier Category</th>
                <th className="pb-3 font-semibold">Operational Status</th>
                <th className="pb-3 font-semibold">Health Score</th>
                <th className="pb-3 font-semibold">Active Workspaces</th>
                <th className="pb-3 font-semibold">Adoption Rate</th>
                <th className="pb-3 font-semibold">Release</th>
                <th className="pb-3 text-right font-semibold">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {displayProducts.map((p) => {
                const isHealthy = p.status === "Healthy";
                return (
                  <tr key={p.id} className="transition-colors hover:bg-[var(--search-bg)]/50">
                    <td className="py-3 font-medium text-[var(--text-heading)]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--icon-chip-bg)] text-[var(--icon-chip-fg)] font-bold text-xs">
                          {p.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold text-[var(--text-heading)]">{p.name}</p>
                          <p className="max-w-[240px] truncate text-[0.6875rem] text-[var(--text-muted)]">{p.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">{p.tier}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ${
                          isHealthy
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isHealthy ? "bg-emerald-600" : "bg-amber-500"}`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-[var(--text-heading)]">
                      {p.health?.score ? `${p.health.score}%` : "99.9%"}
                    </td>
                    <td className="py-3 font-medium text-[var(--text-heading)]">
                      {p.workspaceCount.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--search-bg)]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${p.adoptionRate}%`,
                              backgroundColor: p.adoptionRate >= 80 ? "#10B981" : "#0058DD",
                            }}
                          />
                        </div>
                        <span className="font-bold text-[var(--text-heading)]">{p.adoptionRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-[0.6875rem] text-[var(--text-muted)]">
                      {p.release || "v1.0.0"}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/founder/products/${p.id}`}
                        className="tap-pop inline-flex items-center gap-1 rounded bg-[var(--search-bg)] px-2 py-1 text-[0.6875rem] font-medium text-[var(--icon-chip-fg)] hover:bg-[var(--icon-chip-bg)]"
                      >
                        360 View <ArrowUpRight size={11} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Row 3: Controlled Feature Flags & Staged Rollouts Table */}
      <Card
        title="Controlled Feature Flags & Staged Rollouts"
        subtitle="Manage progressive rollouts, kill switches, and targeted customer segments in real time"
        badge={{ text: `${flags.length} Flags Tracked`, variant: "purple" }}
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/founder/feature-flags"
              className="tap-pop inline-flex items-center gap-1 rounded-md border border-[var(--input-border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--icon-chip-fg)] hover:bg-[var(--search-bg)]"
            >
              Flags Console <ArrowUpRight size={13} />
            </Link>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--card-border)] text-[var(--text-muted)]">
                <th className="pb-3 font-semibold">Flag Identifier</th>
                <th className="pb-3 font-semibold">Associated Feature</th>
                <th className="pb-3 font-semibold">Environment</th>
                <th className="pb-3 font-semibold">Rollout %</th>
                <th className="pb-3 font-semibold">Target Segment</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Safety Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {flags.slice(0, 6).map((flag) => {
                const isActive = flag.status === "Active" || flag.status === "GA";
                const isPaused = flag.status === "Paused";
                const isCanary = flag.status === "Canary";
                return (
                  <tr key={flag.id} className="transition-colors hover:bg-[var(--search-bg)]/50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Flag size={14} className="text-purple-600" />
                        <div>
                          <p className="font-semibold text-[var(--text-heading)]">{flag.name}</p>
                          <p className="font-mono text-[0.65rem] text-[var(--text-muted)]">{flag.key}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">{flag.featureName}</td>
                    <td className="py-3">
                      <span className="badge-pill badge-pill-sm badge-env font-mono">{flag.environment}</span>
                    </td>
                    <td className="py-3 font-bold text-[var(--text-heading)]">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-[var(--search-bg)]">
                          <div
                            className="h-full rounded-full bg-purple-600"
                            style={{ width: `${flag.rolloutPercentage}%` }}
                          />
                        </div>
                        <span>{flag.rolloutPercentage}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-[var(--text-muted)]">{flag.targetAudience}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : isCanary
                              ? "bg-blue-50 text-blue-700"
                              : isPaused
                                ? "bg-amber-50 text-amber-700"
                                : "bg-red-50 text-red-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive
                              ? "bg-emerald-500"
                              : isCanary
                                ? "bg-blue-500"
                                : isPaused
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                          }`}
                        />
                        {flag.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isActive ? (
                          <button
                            onClick={() => handleFlagAction(flag.id, flag.name, "pause")}
                            title="Pause Flag Rollout"
                            className="tap-pop flex h-6 w-6 items-center justify-center rounded border border-[var(--input-border)] bg-[var(--surface)] text-amber-600 hover:bg-amber-50"
                          >
                            <Pause size={12} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFlagAction(flag.id, flag.name, "resume")}
                            title="Resume Flag Rollout"
                            className="tap-pop flex h-6 w-6 items-center justify-center rounded border border-[var(--input-border)] bg-[var(--surface)] text-emerald-600 hover:bg-emerald-50"
                          >
                            <Play size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => handleFlagAction(flag.id, flag.name, "kill")}
                          title="Instant Kill Switch (Rollback to 0%)"
                          className="tap-pop flex h-6 w-6 items-center justify-center rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <ShieldAlert size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Row 4: Quota Limit Pressure & Recent Activity */}
      <div className="grid grid-cols-1 items-stretch gap-[var(--space-md)] screen-lg:grid-cols-2">
        {/* Limit Pressure Alerts */}
        <Card
          title="Active Limit Pressure Alerts"
          subtitle="Workspaces currently exceeding 80% of plan consumption limits"
          badge={{ text: `${mockLimitPressures.length} Affected`, variant: "warning" }}
          action={
            <Link
              href="/founder/usage"
              className="tap-pop inline-flex items-center gap-1 rounded-md border border-[var(--input-border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--icon-chip-fg)] hover:bg-[var(--search-bg)]"
            >
              Usage Hub <ArrowUpRight size={13} />
            </Link>
          }
        >
          <div className="flex flex-col gap-3">
            {mockLimitPressures.map((lp) => {
              const isCritical = lp.pressurePercentage >= 95;
              return (
                <div
                  key={lp.id}
                  className="rounded-lg border border-[var(--card-border)] bg-[var(--surface)] p-3 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--text-heading)]">{lp.workspaceName}</span>
                      <span className="badge-pill badge-pill-sm badge-plan">{lp.plan} Plan</span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.625rem] font-bold ${
                        isCritical ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400" : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}
                    >
                      {lp.status}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[0.7rem] text-[var(--text-muted)]">
                    <span>{lp.meter}</span>
                    <span className="font-semibold text-[var(--text-heading)]">
                      {lp.consumed} / {lp.limit}
                    </span>
                  </div>

                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--search-bg)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${lp.pressurePercentage}%`,
                        backgroundColor: isCritical ? "#DC2626" : "#F59E0B",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent System & Team Activity */}
        <Card
          title="Recent System & Team Activity"
          subtitle="Correlated releases, feature adjustments, and incident notifications"
          badge={{ text: "Realtime", variant: "info" }}
          action={
            <Link
              href="/founder/releases"
              className="tap-pop inline-flex items-center gap-1 rounded-md border border-[var(--input-border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--icon-chip-fg)] hover:bg-[var(--search-bg)]"
            >
              Audit Log <ArrowUpRight size={13} />
            </Link>
          }
        >
          <div className="flex flex-col gap-3">
            {mockRecentActivity.map((act) => {
              const getIcon = () => {
                switch (act.type) {
                  case "feature-flag":
                    return <Flag size={14} className="text-purple-600" />;
                  case "incident":
                    return <AlertTriangle size={14} className="text-red-600" />;
                  case "release":
                    return <GitBranch size={14} className="text-emerald-600" />;
                  case "limit-pressure":
                    return <Zap size={14} className="text-amber-600" />;
                  default:
                    return <Zap size={14} className="text-blue-600" />;
                }
              };

              const getBadgeStyle = () => {
                switch (act.badgeColor) {
                  case "blue":
                    return "bg-blue-50 text-blue-700 border-blue-200";
                  case "red":
                    return "bg-red-50 text-red-700 border-red-200";
                  case "yellow":
                    return "bg-amber-50 text-amber-700 border-amber-200";
                  case "green":
                    return "bg-emerald-50 text-emerald-700 border-emerald-200";
                  default:
                    return "bg-[var(--surface-muted)] text-[var(--text-heading)] border-[var(--divider)]";
                }
              };

              const getIconBg = () => {
                switch (act.type) {
                  case "feature-flag":
                    return "bg-purple-50";
                  case "incident":
                    return "bg-red-50";
                  case "release":
                    return "bg-emerald-50";
                  case "limit-pressure":
                    return "bg-amber-50";
                  default:
                    return "bg-blue-50";
                }
              };

              return (
                <div
                  key={act.id}
                  className="flex items-start gap-3 rounded-lg border border-[var(--card-border)] bg-[var(--surface)] p-3 shadow-xs transition-colors hover:bg-[var(--search-bg)]/50"
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${getIconBg()}`}
                  >
                    {getIcon()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-[var(--text-heading)]">{act.title}</p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`rounded-full border px-1.5 py-0.5 text-[0.625rem] font-semibold ${getBadgeStyle()}`}
                        >
                          {act.badge}
                        </span>
                        <span className="text-[0.6875rem] text-[var(--text-muted)]">{act.timestamp}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-[0.7rem] leading-relaxed text-[var(--text-muted)]">{act.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Flag Action Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div
            className="w-full max-w-md rounded-xl border border-[var(--card-border)] bg-[var(--surface)] p-5 shadow-2xl"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  confirmModal.action === "kill"
                    ? "bg-red-50 text-red-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <ShieldAlert size={20} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-heading)]">
                  {confirmModal.action === "kill"
                    ? "Activate Emergency Kill Switch?"
                    : confirmModal.action === "pause"
                      ? "Pause Feature Flag Rollout?"
                      : "Resume Feature Flag Rollout?"}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">Flag: {confirmModal.flagName}</p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
              {confirmModal.action === "kill"
                ? "This will immediately roll back rollout traffic to 0% across all production fleets. Use only for incident containment."
                : confirmModal.action === "pause"
                  ? "Traffic evaluation will halt at current percentage until resumed."
                  : "Traffic evaluation will resume according to configured rollout schedule."}
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmModal({ open: false, flagId: "", flagName: "", action: "pause" })}
                className="rounded-lg border border-[var(--divider)] px-3 py-1.5 text-xs font-semibold text-[var(--text-heading)] hover:bg-[var(--surface-muted)]"
              >
                Cancel
              </button>
              <button
                onClick={confirmFlagAction}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white ${
                  confirmModal.action === "kill"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                Confirm {confirmModal.action.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
