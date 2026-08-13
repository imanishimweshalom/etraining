
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HardHat,
  GraduationCap,
  ShieldCheck,
  Target,
  Users,
  BriefcaseBusiness,
  TrendingUp,
  BookOpen,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    value: "8.5M",
    label: "Working-age population",
    description: "People aged 16+ in Rwanda in 2025",
  },
  {
    value: "4.8M",
    label: "Employed people",
    description: "Approximately employed in 2025",
  },
  {
    value: "12.4%",
    label: "Unemployment rate",
    description: "Rwanda annual rate in 2025",
  },
  {
    value: "8.9%",
    label: "Construction employment",
    description: "Share of employment in construction",
  },
];

const learningAreas = [
  {
    title: "Hazard Identification",
    description:
      "Learn to recognize common workplace hazards before they become incidents.",
    icon: Target,
  },
  {
    title: "PPE Inspection",
    description:
      "Understand the importance of checking personal protective equipment before use.",
    icon: ShieldCheck,
  },
  {
    title: "Working at Height",
    description:
      "Explore the safety principles involved when work takes place at height.",
    icon: HardHat,
  },
  {
    title: "Emergency Response",
    description:
      "Learn the basic principles of responding to workplace emergencies.",
    icon: BriefcaseBusiness,
  },
];

const labourFacts = [
  {
    title: "Labour force participation",
    value: "63.0%",
    text: "The labour force participation rate was reported at about 63% in 2025.",
  },
  {
    title: "Employment-to-population ratio",
    value: "55.9%",
    text: "The employment-to-population ratio increased from 53.5% in 2024.",
  },
  {
    title: "Female unemployment",
    value: "14.2%",
    text: "The unemployment rate among females was 14.2% in 2025.",
  },
  {
    title: "Youth unemployment",
    value: "14.7%",
    text: "Youth had a higher unemployment rate of 14.7% in 2025.",
  },
];

const images = {
  rwandaInspection:
    "https://www.minaloc.gov.rw/fileadmin/user_upload/Minaloc/News_Images/Gakenke__Ruli.jpg",
  constructionSite:
    "https://images.squarespace-cdn.com/content/v1/63191ca050f3d72d999492fd/1669526333760-JSWRQY0J8D41J79DDBZC/NOUS_HST_MUN_1920x12802.jpg",
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-screen pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,182,212,0.14),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(37,99,235,0.16),transparent_32%)]" />

        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
          {/* HERO TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
              <GraduationCap className="h-4 w-4" />
              Practical learning platform
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Learn skills.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Practice safely.
              </span>
              Build confidence.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              eTraining is being built around practical learning, real-world
              scenarios and interactive safety education.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trainings"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Training
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                How It Works
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Interactive scenarios",
                "Practical safety content",
                "Self-paced learning",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-cyan-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-2 shadow-2xl">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={images.rwandaInspection}
                  alt="Safety inspection team at a construction site in Rwanda"
                  className="h-[520px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                          Real-world context
                        </p>

                        <h2 className="mt-2 text-xl font-bold">
                          Construction safety in Rwanda
                        </h2>

                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="h-4 w-4 text-cyan-400" />
                          Rwanda
                        </div>
                      </div>

                      <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                        <HardHat className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-6 top-20 hidden rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl backdrop-blur-xl sm:block"
            >
              <ShieldCheck className="h-7 w-7 text-cyan-300" />

              <p className="mt-2 text-xs font-bold text-white">
                Safety education
              </p>

              <p className="mt-1 text-[11px] text-slate-500">
                Learn before the real situation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          VERIFIED RWANDA LABOUR DATA
      ========================================================== */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              <TrendingUp className="h-4 w-4" />
              Rwanda labour market
            </div>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Real data behind the need for skills development
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              These figures come from Rwanda's National Institute of Statistics
              and are presented here as context for the platform. They are not
              eTraining user statistics.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:border-cyan-400/20"
              >
                <p className="text-4xl font-black tracking-tight text-white">
                  {stat.value}
                </p>

                <h3 className="mt-3 font-semibold text-cyan-300">
                  {stat.label}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-white">
                Source: National Institute of Statistics of Rwanda
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Labour Force Survey — Annual Report 2025
              </p>
            </div>

            <a
              href="https://statistics.gov.rw/data-sources/surveys/Labour-Force-Survey/labour-force-survey-2025/labour-force-survey-annual-report-2025"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Verify the source
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY ETRAINING
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <img
                src={images.constructionSite}
                alt="Workers at a construction site in Rwanda"
                className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Why practical learning?
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight">
              Knowledge becomes more useful when learners can practice it.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              eTraining is designed to move beyond static information by
              presenting learners with practical situations, decisions and
              safety concepts that can be explored before entering a real
              workplace.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Target,
                  title: "Recognize hazards",
                  text: "Understand what to look for in a work environment.",
                },
                {
                  icon: ShieldCheck,
                  title: "Understand protection",
                  text: "Learn the role of personal protective equipment and safe practices.",
                },
                {
                  icon: BookOpen,
                  title: "Build knowledge",
                  text: "Study structured content at your own pace.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">{title}</h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CURRENT TRAINING CONTENT
      ========================================================== */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Construction safety
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Explore practical safety topics
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                These are the learning areas currently represented in the
                project's Construction Safety training content.
              </p>
            </div>

            <Link
              to="/trainings"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
            >
              View training
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learningAreas.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:border-cyan-400/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition group-hover:bg-cyan-400/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <Link
                    to="/trainings"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          LABOUR FACTS
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              More verified data
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight">
              A closer look at Rwanda's labour market
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              eTraining can serve as a learning environment for people
              developing practical knowledge and skills. The figures below
              provide national labour-market context rather than platform
              performance claims.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <p className="font-bold">4.8 million</p>

                <p className="text-sm text-slate-500">
                  people were approximately employed in Rwanda in 2025.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {labourFacts.map((fact, index) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <p className="text-sm font-medium text-slate-500">
                  {fact.title}
                </p>

                <p className="mt-3 text-3xl font-black text-cyan-300">
                  {fact.value}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {fact.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <GraduationCap className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-4xl font-black sm:text-5xl">
            Start exploring practical learning.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Explore the available training content and discover how
            interactive learning can support practical skills development.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/trainings"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Explore Trainings
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              About eTraining
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          DATA DISCLAIMER
      ========================================================== */}
      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-3 text-xs leading-5 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Labour statistics displayed on this page are from Rwanda's
              National Institute of Statistics, Labour Force Survey 2025.
            </p>

            <a
              href="https://statistics.gov.rw/data-sources/surveys/Labour-Force-Survey/labour-force-survey-2025/labour-force-survey-annual-report-2025"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-cyan-500 hover:text-cyan-300"
            >
              NISR source
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

