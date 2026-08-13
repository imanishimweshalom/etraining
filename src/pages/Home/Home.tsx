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
    description:
      "Explore workplace safety situations through immersive virtual environments.",
    icon: ShieldCheck,
  },
  {
    title: "Interactive Scenarios",
    description:
      "Make decisions inside practical scenarios and understand the consequences.",
    icon: Target,
  },
  {
    title: "Immersive Learning",
    description:
      "Experience learning content through interactive visual environments.",
    icon: Headset,
  },
  {
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

const vrScenes = [
  {
    title: "Construction Safety",
    description:
      "Explore hazards and safe practices inside a virtual construction environment.",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Workplace Training",
    description:
      "Experience practical workplace learning through immersive technology.",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Immersive Education",
    description:
      "Discover a different way of learning using virtual environments.",
    image:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-white">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-screen pt-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[15%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute right-[-10%] top-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-28">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Immersive practical learning
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Learn beyond the
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300"
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
              {[
                "Interactive scenarios",
                "Virtual environments",
                "Practical learning",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero VR visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-cyan-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-2 shadow-2xl">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=1600&q=90"
                  alt="Person using a virtual reality headset"
                  className="h-[520px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                {/* Center play button */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-2xl backdrop-blur-xl"
                >
                  <Play className="ml-1 h-7 w-7 fill-white" />
                </motion.div>

                {/* Bottom information */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <Headset className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                          Immersive learning
                        </p>

                        <h2 className="mt-1 text-lg font-bold">
                          Experience the learning environment
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating VR card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-5 top-20 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Headset className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold">VR Training</p>
                  <p className="text-xs text-slate-500">Immersive experience</p>
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
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                A different way to learn
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
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
                className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
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
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
            Platform experience
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
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
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition group-hover:bg-cyan-400/20">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
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
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Immersive environments
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Explore learning scenarios
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Visualize how different practical training environments can
                become part of the learning experience.
              </p>
            </div>

            <Link
              to="/trainings"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
            >
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
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur">
                    VR Environment
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{scene.title}</h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {scene.description}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Headset className="h-5 w-5" />
                    </div>
                  </div>

                  <Link
                    to="/trainings"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Practical learning
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
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
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold">{area.title}</h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* VR image panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-2">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=1600&q=90"
                  alt="Immersive virtual reality learning"
                  className="h-[580px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                        <GraduationCap className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-blue-300">
                          Learning technology
                        </p>

                        <p className="mt-1 font-bold">
                          From information to experience
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
          WHO IT IS FOR
      ====================================================== */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Learning experience
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Designed around the learner
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
              eTraining provides a foundation for practical, visual and
              interactive learning experiences.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Learn",
                text: "Understand concepts through structured learning content.",
              },
              {
                icon: Headset,
                title: "Experience",
                text: "Explore immersive and interactive environments.",
              },
              {
                icon: Target,
                title: "Practice",
                text: "Apply knowledge through practical scenarios.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-7 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14),transparent_55%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Headset className="h-8 w-8" />
            </div>

            <h2 className="mt-7 text-4xl font-black sm:text-5xl">
              Ready to explore immersive learning?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              Explore the available training content and discover how
              eTraining can bring practical learning closer to the learner.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/trainings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
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