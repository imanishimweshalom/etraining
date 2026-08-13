import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const trainings = [
  {
    title: "Construction Safety",
    description:
      "Learn how to identify hazards, use PPE correctly and respond to emergencies.",
    category: "Safety",
    level: "Beginner",
  },
  {
    title: "Electrical Safety",
    description:
      "Build practical awareness around electrical hazards and safe working practices.",
    category: "Technical",
    level: "Intermediate",
  },
  {
    title: "Fire Safety",
    description:
      "Understand fire prevention, emergency procedures and safe evacuation.",
    category: "Emergency",
    level: "Beginner",
  },
];

const stats = [
  { value: "25+", label: "Training topics" },
  { value: "100+", label: "Practical scenarios" },
  { value: "24/7", label: "Learning access" },
  { value: "100%", label: "Interactive focus" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative min-h-screen pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(37,99,235,0.18),transparent_35%)]" />

        <div className="absolute left-10 top-40 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Practical learning, reimagined
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Learn skills.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Practice safely.
              </span>
              Build confidence.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              eTraining brings practical training, interactive scenarios and
              immersive learning together in one modern platform.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trainings"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Trainings
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                to="/vr-experience"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <Play className="h-4 w-4 fill-current" />
                Experience VR
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              {[
                "Interactive learning",
                "Real-world scenarios",
                "Progress tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* HERO VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -inset-8 rounded-[3rem] bg-cyan-400/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-3 shadow-2xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Training simulation
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        Construction Site
                      </h3>
                    </div>

                    <div className="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300">
                      LIVE
                    </div>
                  </div>

                  <div className="relative mt-6 h-72 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-950 via-slate-800 to-slate-950">
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-slate-900/80" />

                    <div className="absolute bottom-12 left-8 h-32 w-5 rotate-12 rounded bg-orange-400/80" />
                    <div className="absolute bottom-12 left-14 h-4 w-44 rounded bg-orange-300/70" />

                    <div className="absolute bottom-12 right-12 h-24 w-16 rounded-lg border-4 border-yellow-400/60" />

                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-16 left-1/2 flex h-24 w-14 -translate-x-1/2 flex-col items-center"
                    >
                      <div className="h-7 w-7 rounded-full bg-orange-300" />
                      <div className="mt-1 h-14 w-9 rounded-t-xl bg-blue-500" />
                    </motion.div>

                    <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-xs backdrop-blur">
                      Hazard detected
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      ["PPE", "Required"],
                      ["Hazards", "03"],
                      ["Progress", "72%"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/10 bg-white/5 p-3"
                      >
                        <p className="text-[10px] uppercase text-slate-500">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-8 top-20 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur sm:block"
              >
                <ShieldCheck className="h-6 w-6 text-cyan-300" />
                <p className="mt-2 text-xs font-semibold">Safety first</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-8 bottom-16 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur sm:block"
              >
                <Target className="h-6 w-6 text-blue-300" />
                <p className="mt-2 text-xs font-semibold">Practice</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-10 sm:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-white/10 px-5 py-4 text-center sm:border-r last:border-r-0"
            >
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRAININGS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Explore learning
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Start with practical training
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400">
              Explore courses designed around real situations and practical
              decision-making.
            </p>
          </div>

          <Link
            to="/trainings"
            className="group flex items-center gap-2 text-sm font-semibold text-cyan-300"
          >
            View all trainings
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trainings.map((training, index) => (
            <motion.div
              key={training.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                  {training.level}
                </span>
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {training.category}
              </p>

              <h3 className="mt-2 text-xl font-bold">{training.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {training.description}
              </p>

              <Link
                to="/trainings"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY ETRAINING */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Why eTraining
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight">
              Training that goes beyond watching a video.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Learn through practical scenarios, interactive experiences and
              structured training designed to help you understand what to do
              when real situations happen.
            </p>

            <Link
              to="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Practical",
                text: "Focus on real-world situations.",
              },
              {
                icon: Zap,
                title: "Interactive",
                text: "Learn by exploring and making decisions.",
              },
              {
                icon: Users,
                title: "Learner focused",
                text: "Designed around the learner experience.",
              },
              {
                icon: ShieldCheck,
                title: "Safety first",
                text: "Practice safely before facing reality.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-950 p-6"
              >
                <Icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            Ready to learn?
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Turn knowledge into practical confidence.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Explore the platform and discover a better way to learn practical
            skills.
          </p>

          <Link
            to="/trainings"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore Trainings
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}