import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Eye,
  Gamepad2,
  GraduationCap,
  Headset,
  Layers3,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trainingAreas = [
  {
    title: "VR Safety Simulation",
    description: "Immersive virtual environments for workplace safety education.",
    icon: ShieldCheck,
  },
  {
    title: "Interactive Scenarios",
    description: "Decision-making within dynamic, true-to-life workplace scenarios.",
    icon: Target,
  },
  {
    title: "Immersive Learning",
    description: "Visual learning experiences through interactive virtual environments.",
    icon: Headset,
  },
  {
    title: "Practical Skills",
    description: "Connecting core concepts to practical workplace situations.",
    icon: Layers3,
  },
];

const features = [
  {
    icon: Headset,
    title: "Virtual Reality",
    description: "Immersive environments designed for comprehensive simulations.",
  },
  {
    icon: Gamepad2,
    title: "Interactive",
    description: "Exploration-based activities with decision-making pathways.",
  },
  {
    icon: Eye,
    title: "Visual Learning",
    description: "Understanding concepts through compelling visual storytelling.",
  },
  {
    icon: Zap,
    title: "Practical Focus",
    description: "Knowledge and skills directly applicable to real-world tasks.",
  },
];

const vrScenes = [
  {
    title: "Construction Safety",
    description: "Identify hazards and practices in a virtual construction zone.",
    abstractVisual: (
      <div className="relative h-64 bg-[#0a1120] overflow-hidden">
        <div className="absolute -left-16 bottom-0 w-80 h-64 bg-cyan-950/40 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-12 left-20 w-32 h-32 rounded-lg bg-cyan-900 border-2 border-cyan-800 rotate-12 flex items-center justify-center shadow-lg shadow-cyan-950/50">
          <Layers3 className="w-12 h-12 text-cyan-500 opacity-80" />
        </div>
        <div className="absolute top-32 left-44 w-28 h-28 rounded-lg bg-blue-900/80 border-2 border-blue-800 -rotate-6 flex items-center justify-center shadow-lg shadow-blue-950/60">
          <ShieldCheck className="w-10 h-10 text-blue-500 opacity-90" />
        </div>
        <div className="absolute -bottom-8 -right-10 w-48 h-48 rounded-full border-[10px] border-slate-700/50"></div>
      </div>
    ),
  },
  {
    title: "Workplace Training",
    description: "Engage in practical workplace scenarios using immersive tech.",
    abstractVisual: (
      <div className="relative h-64 bg-[#0a1120] overflow-hidden">
        <div className="absolute right-[-30px] top-[40px] w-64 h-64 bg-blue-950/50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-32 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center gap-3 p-4 shadow-xl">
          <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-full bg-slate-600 rounded"></div>
            <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-lg bg-cyan-900/60 border-2 border-cyan-800 rotate-12 shadow-lg"></div>
      </div>
    ),
  },
  {
    title: "Immersive Education",
    description: "A transformative approach to learning using virtual experiences.",
    abstractVisual: (
      <div className="relative h-64 bg-[#0a1120] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <div className="w-20 h-28 rounded-lg bg-blue-900 border-2 border-blue-800 rotate-[-15deg] shadow-2xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-blue-400 opacity-80" />
          </div>
          <div className="w-20 h-28 rounded-lg bg-cyan-900 border-2 border-cyan-800 rotate-[10deg] mt-6 shadow-2xl flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-cyan-400 opacity-80" />
          </div>
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-96 h-32 bg-slate-800/80 rounded-t-full border border-slate-700"></div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#0a1120] text-slate-100 font-sans">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-screen pt-24">
        {/* Advanced Background Glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px] opacity-80" />
          <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-blue-700/10 blur-[160px] opacity-90" />
          <div className="absolute bottom-[-10%] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[150px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-600/30 bg-cyan-950/40 px-5 py-2.5 text-sm font-semibold text-cyan-300 backdrop-blur-lg shadow-sm">
              <Sparkles className="h-4 w-4" />
              Next-Generation Immersive Learning
            </div>

            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Learning that transcends the
              <span className="block mt-1.5 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                physical classroom.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              eTraining reimagines professional education, utilizing cutting-edge virtual reality, interactive concepts, and true-to-life scenarios for unparalleled engagement.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/trainings"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-50 px-8 py-4 font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-cyan-950/30 hover:shadow-lg"
              >
                Explore Training
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/40 px-8 py-4 font-semibold text-slate-200 backdrop-blur-lg transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60"
              >
                How It Works
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {[
                "Interactive scenarios",
                "Virtual environments",
                "Practical skill application",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-400"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Hero Illustration (replaces image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-[4rem] bg-cyan-600/15 blur-[50px] opacity-70" />

            {/* Illustration Canvas */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-700 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-sm">
              <div className="relative h-[560px] w-full rounded-[2rem] bg-[#0d1526] overflow-hidden flex items-center justify-center">
                
                {/* Simplified VR headset illustration */}
                <div className="relative w-72 h-44 bg-slate-800 rounded-3xl border border-slate-700 flex flex-col p-5 shadow-inner">
                  <div className="w-16 h-1.5 bg-cyan-500 rounded-full mx-auto"></div>
                  <div className="mt-4 flex gap-3 justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600"></div>
                    <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600"></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 bg-slate-700 rounded-b-2xl border border-slate-600"></div>
                </div>

                {/* Animated UI elements around headset */}
                <motion.div
                  animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-24 left-16 w-16 h-16 bg-cyan-900/60 rounded-xl border border-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-950/40"
                >
                  <Target className="w-7 h-7 text-cyan-400" />
                </motion.div>
                <motion.div
                  animate={{ x: [0, 15, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-32 right-20 w-14 h-14 bg-blue-900/60 rounded-xl border border-blue-700 flex items-center justify-center shadow-lg shadow-blue-950/40"
                >
                  <Zap className="w-6 h-6 text-blue-400" />
                </motion.div>
                
                {/* Center play button */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 text-slate-100 shadow-2xl backdrop-blur-xl group cursor-pointer hover:bg-slate-800/80 hover:border-slate-500"
                >
                  <Play className="ml-1.5 h-9 w-9 fill-slate-100" />
                </motion.div>

                {/* Subdued Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-[#0a1120]/40" />
              </div>
            </div>

            {/* Subdued Floating VR card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-8 top-28 hidden rounded-2xl border border-slate-700 bg-slate-900/90 p-5 shadow-xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800">
                  <Headset className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-100">Immersive VR</p>
                  <p className="text-sm text-slate-400">Experience-based learning</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                A transformative approach
              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Convert learning into an active experience.
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
                Move beyond passive content consumption. Our platform empowers learners to explore interactive modules and simulations, making intricate practical concepts intuitively understandable.
              </p>
            </div>

            <div className="flex items-center lg:justify-end">
              <Link
                to="/trainings"
                className="group inline-flex items-center gap-3 rounded-xl border border-cyan-800 bg-cyan-950/60 px-6 py-4 font-semibold text-cyan-300 transition-all hover:bg-cyan-950 hover:border-cyan-700 hover:shadow-cyan-950/20 hover:shadow-md"
              >
                Start Exploring
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Platform Capabilities
          </p>

          <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
            Engineered for deeper engagement
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Discover a comprehensive learning ecosystem built on interactive environments, critical scenarios, and rich visual narratives.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, borderColor: 'rgba(34, 211, 238, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.04)'}}
                className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 transition group-hover:bg-cyan-900 group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-50">{feature.title}</h3>

                <p className="mt-4 text-base leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          VR SCENES
      ====================================================== */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Dynamic Environments
              </p>

              <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
                Explore learning simulations
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Visualize how diverse, high-fidelity practical training environments can become an integral component of your learning journey.
              </p>
            </div>

            <Link
              to="/trainings"
              className="group inline-flex items-center gap-2.5 text-base font-semibold text-cyan-400 hover:text-cyan-300"
            >
              View All Trainings
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {vrScenes.map((scene, index) => (
              <motion.article
                key={scene.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -10, shadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg transition-all duration-400"
              >
                {/* Premium Abstract Visual (replaces image) */}
                <div className="relative overflow-hidden border-b border-slate-800">
                  {scene.abstractVisual}
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526] via-transparent to-transparent opacity-80" />

                  <div className="absolute left-5 top-5 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                    VR Environment
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-50">{scene.title}</h3>
                      <p className="mt-4 text-base leading-7 text-slate-400">
                        {scene.description}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 mt-1">
                      <Headset className="h-6 w-6" />
                    </div>
                  </div>

                  <Link
                    to="/trainings"
                    className="mt-8 inline-flex items-center gap-2.5 text-base font-semibold text-slate-100 group-hover:text-cyan-300"
                  >
                    Explore
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
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
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Practical Skill Mastery
            </p>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Learn through guided simulation.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Our platform structures training around crucial practical domains. Learners practice identifying environmental factors, evaluating risks, and making critical, informed decisions.
            </p>

            <div className="mt-12 space-y-5">
              {trainingAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <motion.div
                    key={area.title}
                    whileHover={{ x: 8, borderColor: 'rgba(34, 211, 238, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-50">{area.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Premium VR Illustration Panel (replaces image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-blue-600/15 blur-[60px] opacity-70" />

            {/* Illustration Canvas */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-700 bg-slate-900/70 p-3 shadow-2xl backdrop-blur-sm">
              <div className="relative h-[620px] w-full rounded-[2rem] bg-[#0d1526] overflow-hidden flex flex-col items-center justify-center p-10">
                
                {/* Abstract visualization of skill application */}
                <div className="w-full flex-1 flex items-center justify-center gap-6">
                    <div className="w-1/3 h-64 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col shadow-inner">
                        <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="h-3 w-full bg-slate-600 rounded-full mb-3"></div>
                        <div className="h-3 w-3/4 bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="w-2/3 h-80 bg-slate-800 rounded-2xl border border-slate-700 p-8 flex flex-col shadow-2xl relative">
                        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center absolute -top-7 -right-7 shadow-lg">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center mb-5">
                            <Layers3 className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="h-3 w-full bg-slate-600 rounded-full mb-3"></div>
                        <div className="h-3 w-5/6 bg-slate-600 rounded-full mb-3"></div>
                        <div className="h-3 w-1/2 bg-slate-700 rounded-full"></div>
                    </div>
                </div>

                <div className="w-full h-24 bg-slate-800 rounded-2xl border border-slate-700 mt-6 flex items-center gap-5 p-6 shadow-inner">
                   <div className="w-12 h-12 rounded-full bg-slate-700 border border-slate-600"></div>
                   <div className="flex-1 space-y-2.5">
                       <div className="h-3 w-1/3 bg-slate-600 rounded-full"></div>
                       <div className="h-3 w-2/3 bg-slate-700 rounded-full"></div>
                   </div>
                </div>

                {/* Gradient Overlay & Info Box */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-950 text-blue-400 border border-blue-800">
                        <GraduationCap className="h-7 w-7" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                          Experience-Driven
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-100">
                          Synthesizing knowledge through virtual exploration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          LEARNER EXPERIENCE
      ====================================================== */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              The Learning Journey
            </p>

            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
              Architected for the modern learner
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              eTraining provides the core framework for a progressive, visual, and highly interactive educational experience.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Acquire",
                text: "Build foundational knowledge through structured, rich learning content.",
              },
              {
                icon: Headset,
                title: "Immerse",
                text: "Deeply engage with concepts in high-fidelity, interactive virtual environments.",
              },
              {
                icon: Target,
                title: "Apply",
                text: "Reinforce and test skills through challenging, realistic practical scenarios.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                  className="rounded-3xl border border-slate-800 bg-slate-950 p-10 text-center shadow-lg"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-50">{item.title}</h3>

                  <p className="mt-5 text-base leading-7 text-slate-400">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#0d1526]">
        {/* Subdued Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-800 bg-cyan-950/60 text-cyan-400 shadow-xl">
              <Headset className="h-10 w-10" />
            </div>

            <h2 className="mt-10 text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight">
              Ready to redefine professional learning?
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-400">
              Discover how eTraining can elevate your educational strategy, bringing true-to-life practical experience directly to the learner.
            </p>

            <div className="mt-14 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/trainings"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-50 px-9 py-4.5 font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-cyan-950/30 hover:shadow-lg"
              >
                Explore All Trainings
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/40 px-9 py-4.5 font-semibold text-slate-200 backdrop-blur-lg transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60"
              >
                Request a Demo
                <Users className="h-5 w-5 text-slate-400" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}