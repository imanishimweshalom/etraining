/**
 * Home.jsx — eTraining
 *
 * Design notes:
 * - No stock photography anywhere. Every "image" area is a generated
 *   SVG/CSS diagram built from the training content itself (radar HUD,
 *   scenario floor-plans, layered environment rings).
 * - Fonts: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono
 *   (telemetry / coordinate labels). Add to index.html <head>:
 *
 *   <link rel="preconnect" href="https://fonts.googleapis.com">
 *   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
 *
 * - Palette: void #080B14, panel #0F1526, signal (teal) #46E1D0,
 *   hazard (amber) #FFB13C, text #F4F6FB / #8B93A8.
 */

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Compass,
  Eye,
  Gamepad2,
  GraduationCap,
  Headset,
  Layers3,
  Play,
  Radar,
  Radio,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Type tokens (inline so this drops into any Tailwind setup)         */
/* ------------------------------------------------------------------ */

const fontDisplay = { fontFamily: "'Space Grotesk', sans-serif" };
const fontBody = { fontFamily: "'IBM Plex Sans', sans-serif" };
const fontMono = { fontFamily: "'IBM Plex Mono', monospace" };

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const trainingAreas = [
  {
    tag: "N-01",
    title: "VR Safety Simulation",
    description:
      "Explore workplace safety situations through immersive virtual environments.",
    icon: ShieldCheck,
  },
  {
    tag: "N-02",
    title: "Interactive Scenarios",
    description:
      "Make decisions inside practical scenarios and understand the consequences.",
    icon: Target,
  },
  {
    tag: "N-03",
    title: "Immersive Learning",
    description:
      "Experience learning content through interactive visual environments.",
    icon: Headset,
  },
  {
    tag: "N-04",
    title: "Practical Skills",
    description:
      "Connect learning concepts with situations that can happen in real workplaces.",
    icon: Layers3,
  },
];

const features = [
  {
    icon: Headset,
    title: "Virtual Reality",
    description:
      "A learning experience designed around immersive environments and simulations.",
  },
  {
    icon: Gamepad2,
    title: "Interactive",
    description:
      "Learning activities can involve exploration, decisions and practical scenarios.",
  },
  {
    icon: Eye,
    title: "Visual Learning",
    description:
      "Understand concepts through visual environments rather than text alone.",
  },
  {
    icon: Zap,
    title: "Practical Focus",
    description:
      "Focus on knowledge and skills that can be connected to real situations.",
  },
];

const vrScenes: {
  title: string;
  description: string;
  coord: string;
  variant: "construction" | "workplace" | "education";
}[] = [
  {
    title: "Construction Safety",
    description:
      "Explore hazards and safe practices inside a virtual construction environment.",
    coord: "SITE // 41.2",
    variant: "construction",
  },
  {
    title: "Workplace Training",
    description:
      "Experience practical workplace learning through immersive technology.",
    coord: "FLOOR // 08.5",
    variant: "workplace",
  },
  {
    title: "Immersive Education",
    description:
      "Discover a different way of learning using virtual environments.",
    coord: "LAYER // 03.1",
    variant: "education",
  },
];

const journey = [
  {
    phase: "PHASE — 01",
    icon: GraduationCap,
    title: "Learn",
    text: "Understand concepts through structured learning content.",
  },
  {
    phase: "PHASE — 02",
    icon: Headset,
    title: "Experience",
    text: "Explore immersive and interactive environments.",
  },
  {
    phase: "PHASE — 03",
    icon: Target,
    title: "Practice",
    text: "Apply knowledge through practical scenarios.",
  },
];

/* ------------------------------------------------------------------ */
/*  Signature visual — scenario HUD radar (hero)                       */
/* ------------------------------------------------------------------ */

function ScenarioHUD() {
  const nodes = [
    { x: 240, y: 90, label: "A1", risk: "hazard" },
    { x: 130, y: 200, label: "B4", risk: "signal" },
    { x: 330, y: 230, label: "C2", risk: "signal" },
    { x: 220, y: 320, label: "D7", risk: "hazard" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F1526] p-2 shadow-2xl">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0B1120]">
        <svg viewBox="0 0 460 460" className="h-[520px] w-full">
          <defs>
            <radialGradient id="hudGlow" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stopColor="#46E1D0" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#46E1D0" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="hudGrid"
              width="23"
              height="23"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 23 0 L 0 0 0 23"
                fill="none"
                stroke="#46E1D0"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="460" height="460" fill="url(#hudGrid)" />
          <rect width="460" height="460" fill="url(#hudGlow)" />

          {/* concentric scan rings */}
          <g transform="translate(230,215)">
            {[150, 110, 70].map((r) => (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke="#46E1D0"
                strokeOpacity="0.16"
                strokeWidth="1"
              />
            ))}
            <line x1="-170" y1="0" x2="170" y2="0" stroke="#46E1D0" strokeOpacity="0.14" />
            <line x1="0" y1="-170" x2="0" y2="170" stroke="#46E1D0" strokeOpacity="0.14" />

            {/* animated sweep */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <path
                d="M 0 0 L 0 -150 A 150 150 0 0 1 106 -106 Z"
                fill="#46E1D0"
                opacity="0.08"
              />
            </motion.g>
          </g>

          {/* hazard / signal nodes */}
          {nodes.map((n) => (
            <g key={n.label} transform={`translate(${n.x},${n.y})`}>
              <motion.circle
                r="16"
                fill="none"
                stroke={n.risk === "hazard" ? "#FFB13C" : "#46E1D0"}
                strokeWidth="1.5"
                animate={{ r: [16, 24, 16], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <circle
                r="5"
                fill={n.risk === "hazard" ? "#FFB13C" : "#46E1D0"}
              />
              <text
                x="14"
                y="4"
                fill={n.risk === "hazard" ? "#FFB13C" : "#8FF3E6"}
                fontSize="11"
                style={fontMono}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        {/* telemetry readout */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
          <div
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#080B14]/70 px-3 py-1.5 text-[11px] text-[#8FF3E6] backdrop-blur"
            style={fontMono}
          >
            <Radio className="h-3.5 w-3.5" />
            SCENARIO LIVE
          </div>
          <div
            className="rounded-full border border-white/10 bg-[#080B14]/70 px-3 py-1.5 text-[11px] text-slate-400 backdrop-blur"
            style={fontMono}
          >
            NODES: 04
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <div className="rounded-2xl border border-white/10 bg-[#080B14]/80 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#46E1D0]/10 text-[#46E1D0]">
                <Headset className="h-6 w-6" />
              </div>
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#46E1D0]"
                  style={fontMono}
                >
                  Hazard scan · Construction site
                </p>
                <h2 className="mt-1 text-lg font-bold text-white" style={fontDisplay}>
                  Two risk nodes flagged
                </h2>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-[42%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl"
        >
          <Play className="ml-1 h-6 w-6 fill-white" />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scenario diagrams — one distinct pattern per training scene        */
/* ------------------------------------------------------------------ */

type ScenarioVariant = "construction" | "workplace" | "education";

function ScenarioDiagram({ variant }: { variant: ScenarioVariant }) {
  if (variant === "construction") {
    return (
      <svg viewBox="0 0 400 260" className="h-64 w-full">
        <rect width="400" height="260" fill="#0B1120" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={30 + i * 55}
            y1="20"
            x2={30 + i * 55}
            y2="240"
            stroke="#FFB13C"
            strokeOpacity="0.12"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="20"
            y1={40 + i * 45}
            x2="380"
            y2={40 + i * 45}
            stroke="#FFB13C"
            strokeOpacity="0.12"
          />
        ))}
        {/* scaffold uprights */}
        {[85, 195, 305].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="55" x2={x} y2="225" stroke="#46E1D0" strokeOpacity="0.35" strokeWidth="2" />
            <line x1={x - 40} y1="140" x2={x + 40} y2="140" stroke="#46E1D0" strokeOpacity="0.25" />
            <motion.circle
              cx={x}
              cy={80 + i * 35}
              r="6"
              fill="#FFB13C"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}
      </svg>
    );
  }

  if (variant === "workplace") {
    return (
      <svg viewBox="0 0 400 260" className="h-64 w-full">
        <rect width="400" height="260" fill="#0B1120" />
        {Array.from({ length: 4 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 6 }).map((_, col) => (
              <rect
                key={col}
                x={22 + col * 62}
                y={20 + row * 58}
                width="46"
                height="40"
                rx="4"
                fill="none"
                stroke="#46E1D0"
                strokeOpacity="0.18"
              />
            ))}
          </g>
        ))}
        {[
          [53, 40],
          [239, 98],
          [363, 156],
          [115, 214],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="5"
            fill="#46E1D0"
            animate={{ r: [5, 9, 5], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </svg>
    );
  }

  // education — layered holographic rings
  return (
    <svg viewBox="0 0 400 260" className="h-64 w-full">
      <rect width="400" height="260" fill="#0B1120" />
      <g transform="translate(200,130)">
        {[100, 70, 40].map((r, i) => (
          <motion.ellipse
            key={r}
            rx={r}
            ry={r * 0.4}
            fill="none"
            stroke="#46E1D0"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          />
        ))}
        <circle r="6" fill="#FFB13C" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Layered environment panel (training areas section)                 */
/* ------------------------------------------------------------------ */

function LayeredEnvironment() {
  const layers = [
    { r: 190, label: "MASTERY", delay: 0 },
    { r: 145, label: "FEEDBACK", delay: 0.15 },
    { r: 100, label: "INTERACTION", delay: 0.3 },
    { r: 55, label: "SIMULATION", delay: 0.45 },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F1526] p-2">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0B1120]">
        <svg viewBox="0 0 460 580" className="h-[580px] w-full">
          <defs>
            <radialGradient id="layerGlow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#46E1D0" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#46E1D0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="460" height="580" fill="url(#layerGlow)" />

          <g transform="translate(230,260)">
            {layers.map((l) => (
              <motion.circle
                key={l.label}
                r={l.r}
                fill="none"
                stroke="#46E1D0"
                strokeOpacity="0.22"
                strokeWidth="1"
                strokeDasharray="3 6"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30 + l.r,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: "0px 0px" }}
              />
            ))}
            <circle r="30" fill="#46E1D0" fillOpacity="0.12" stroke="#46E1D0" strokeOpacity="0.5" />
            <Headset x="-14" y="-14" width="28" height="28" color="#46E1D0" />

            {layers.map((l) => (
              <text
                key={l.label}
                x="6"
                y={-l.r - 8}
                fill="#5B6478"
                fontSize="10"
                style={fontMono}
                letterSpacing="1.5"
              >
                {l.label}
              </text>
            ))}
          </g>
        </svg>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="rounded-2xl border border-white/10 bg-[#080B14]/80 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB13C]/10 text-[#FFB13C]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.22em] text-[#FFB13C]"
                  style={fontMono}
                >
                  Learning technology
                </p>
                <p className="mt-1 font-bold text-white" style={fontDisplay}>
                  From information to experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#080B14] text-white" style={fontBody}>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-screen pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[15%] h-[400px] w-[400px] rounded-full bg-[#46E1D0]/10 blur-[120px]" />
          <div className="absolute right-[-10%] top-[25%] h-[500px] w-[500px] rounded-full bg-[#1E3A5F]/20 blur-[140px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#FFB13C]/5 blur-[130px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#46E1D0]/20 bg-[#46E1D0]/5 px-4 py-2 text-sm font-medium text-[#46E1D0] backdrop-blur"
              style={fontMono}
            >
              <Sparkles className="h-4 w-4" />
              Immersive practical learning
            </div>

            <h1
              className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
              style={fontDisplay}
            >
              Learn beyond the
              <span className="block bg-gradient-to-r from-[#46E1D0] via-[#5FC6E8] to-[#8FA6FF] bg-clip-text text-transparent">
                classroom.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              eTraining brings practical education closer to learners through
              interactive experiences, virtual reality concepts and real-world
              scenarios.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trainings"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#080B14] transition-all duration-300 hover:-translate-y-1 hover:bg-[#46E1D0]"
              >
                Explore Training
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                How It Works
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {["Interactive scenarios", "Virtual environments", "Practical learning"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-[#46E1D0]" />
                    {item}
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Hero signature visual — scenario HUD, no photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-[#46E1D0]/10 blur-3xl" />
            <ScenarioHUD />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-20 hidden rounded-2xl border border-white/10 bg-[#0F1526]/90 p-4 shadow-2xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#46E1D0]/10 text-[#46E1D0]">
                  <Radar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">VR Training</p>
                  <p className="text-xs text-slate-500" style={fontMono}>
                    Live scenario feed
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p
                className="text-sm font-semibold uppercase tracking-[0.22em] text-[#46E1D0]"
                style={fontMono}
              >
                A different way to learn
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl" style={fontDisplay}>
                Turn learning into an experience.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
                Instead of only reading about a situation, learners can
                explore interactive content and simulations designed to make
                practical concepts easier to understand.
              </p>
            </div>

            <div className="flex items-center lg:justify-end">
              <Link
                to="/trainings"
                className="group inline-flex items-center gap-2 rounded-xl border border-[#46E1D0]/20 bg-[#46E1D0]/5 px-5 py-3 font-semibold text-[#46E1D0] transition hover:bg-[#46E1D0]/10"
              >
                Start exploring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#46E1D0]" style={fontMono}>
            Platform experience
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={fontDisplay}>
            Built for interactive learning
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Explore learning through virtual environments, practical
            scenarios and visual experiences.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -7 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-[#46E1D0]/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#46E1D0]/10 text-[#46E1D0] transition group-hover:bg-[#46E1D0]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold" style={fontDisplay}>
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          VR SCENES — abstract scenario diagrams, no photography
      ====================================================== */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#46E1D0]" style={fontMono}>
                Immersive environments
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={fontDisplay}>
                Explore learning scenarios
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Visualize how different practical training environments can
                become part of the learning experience.
              </p>
            </div>
            <Link to="/trainings" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#46E1D0]">
              View trainings
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {vrScenes.map((scene, index) => (
              <motion.article
                key={scene.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]"
              >
                <div className="relative overflow-hidden">
                  <ScenarioDiagram variant={scene.variant} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
                  <div
                    className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#080B14]/70 px-3 py-1.5 text-[11px] font-semibold text-[#46E1D0] backdrop-blur"
                    style={fontMono}
                  >
                    {scene.coord}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold" style={fontDisplay}>
                        {scene.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500">{scene.description}</p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#46E1D0]/10 text-[#46E1D0]">
                      <Headset className="h-5 w-5" />
                    </div>
                  </div>

                  <Link to="/trainings" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAINING AREAS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#46E1D0]" style={fontMono}>
              Practical learning
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl" style={fontDisplay}>
              Learn by exploring situations.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-slate-400">
              The platform can organize training around practical areas where
              learners need to understand situations, identify risks and make
              informed decisions.
            </p>

            <div className="mt-8 space-y-4">
              {trainingAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#46E1D0]/20"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#46E1D0]/10 text-[#46E1D0]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold" style={fontDisplay}>
                          {area.title}
                        </h3>
                        <span className="text-[10px] text-slate-600" style={fontMono}>
                          {area.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{area.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Layered environment visual — replaces photo panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-[#1E3A5F]/20 blur-3xl" />
            <LayeredEnvironment />
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          WHO IT IS FOR
      ====================================================== */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#46E1D0]" style={fontMono}>
              Learning experience
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl" style={fontDisplay}>
              Designed around the learner
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
              eTraining provides a foundation for practical, visual and
              interactive learning experiences.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-[#0B1120] p-7 text-center"
                >
                  <p className="text-[11px] font-medium tracking-[0.2em] text-slate-600" style={fontMono}>
                    {item.phase}
                  </p>
                  <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#46E1D0]/10 text-[#46E1D0]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold" style={fontDisplay}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(70,225,208,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#46E1D0]/20 bg-[#46E1D0]/10 text-[#46E1D0]">
              <Compass className="h-8 w-8" />
            </div>
            <h2 className="mt-7 text-4xl font-bold sm:text-5xl" style={fontDisplay}>
              Ready to explore immersive learning?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              Explore the available training content and discover how
              eTraining can bring practical learning closer to the learner.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/trainings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#080B14] transition hover:bg-[#46E1D0]"
              >
                Explore Trainings
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Create Account
                <Users className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}