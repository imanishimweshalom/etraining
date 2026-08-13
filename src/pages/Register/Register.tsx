
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Headset,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /*
      Authentication can be connected here later.

      For now, the form is validated successfully
      and the learner is redirected to the dashboard.
    */
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute bottom-[-10%] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8">
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur">
              <GraduationCap className="h-4 w-4" />
              Join eTraining
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
              Start your
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                learning journey.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Create your eTraining account and explore practical learning,
              interactive scenarios and immersive virtual environments.
            </p>

            {/* Benefits */}
            <div className="mt-9 space-y-4">
              {[
                "Access practical training content",
                "Explore immersive VR learning environments",
                "Track your learning progress",
                "Complete quizzes and training activities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-400" />

                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Immersive learning card */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <Headset className="h-6 w-6" />
              </div>

              <div>
                <p className="font-bold">Immersive learning</p>

                <p className="mt-1 text-sm text-slate-500">
                  Learn through practical and visual experiences.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            REGISTER CARD
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-xl"
        >
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            {/* Mobile heading */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <GraduationCap className="h-7 w-7" />
              </div>

              <h1 className="mt-5 text-3xl font-black">
                Join{" "}
                <span className="text-cyan-300">
                  eTraining
                </span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Create your account and start learning.
              </p>
            </div>

            {/* Desktop heading */}
            <div className="hidden lg:block">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Create account
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Create your learner account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details below to create your eTraining account.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              {/* =================================================
                  FULL NAME
              ================================================== */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Full name
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                  />
                </div>
              </div>

              {/* =================================================
                  EMAIL
              ================================================== */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                  />
                </div>
              </div>

              {/* =================================================
                  PASSWORD
              ================================================== */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:text-cyan-300"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Use at least 8 characters.
                </p>
              </div>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================== */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:text-cyan-300"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* =================================================
                  TERMS
              ================================================== */}
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-500">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 accent-cyan-400"
                />

                <span>
                  I agree to the eTraining terms and understand
                  that my account will be used to access training
                  content.
                </span>
              </label>

              {/* =================================================
                  SUBMIT
              ================================================== */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Create Account

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* =================================================
                LOGIN
            ================================================== */}
            <div className="mt-7 border-t border-white/10 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-2 font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Sign in

                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

