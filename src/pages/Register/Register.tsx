import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const initialForm: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<RegisterForm>(initialForm);

  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>("");

  const [success, setSuccess] =
    useState<string>("");

  // =========================================
  // HANDLE INPUT CHANGES
  // =========================================

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================
  // VALIDATE FORM
  // =========================================

  const validateForm = (): boolean => {
    setError("");

    if (!form.fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }

    if (!form.role) {
      setError("Please select your role.");
      return false;
    }

    if (form.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  // =========================================
  // REGISTER USER
  // =========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // =====================================
      // 1. CREATE AUTH ACCOUNT
      // =====================================

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error(
          "Account could not be created."
        );
      }

      const userId = authData.user.id;

      // =====================================
      // 2. CREATE PROFILE
      // =====================================

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          role: form.role,
          is_active: true,
        });

      if (profileError) {
        console.error(
          "Profile creation error:",
          profileError
        );

        throw new Error(
          `Account was created, but profile could not be saved: ${profileError.message}`
        );
      }

      // =====================================
      // 3. SUCCESS MESSAGE
      // =====================================

      setForm(initialForm);

      if (!authData.session) {
        setSuccess(
          "Account created successfully. Please check your email and confirm your account before signing in."
        );

        return;
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // =====================================
      // 4. REDIRECT TO LOGIN
      // =====================================

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: unknown) {
      console.error(
        "Registration error:",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong while creating your account."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-10 text-center">

          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Create your eTraining account
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Create your account and start learning
            with eTraining.
          </p>

        </div>

        {/* =====================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
        >

          {/* ===================================
              PERSONAL INFORMATION
          ==================================== */}

          <section className="border-b border-white/10 p-6 sm:p-8">

            <div className="mb-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Account
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Personal information
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter the information that will be
                stored in your eTraining profile.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* FULL NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full name
                </label>

                <div className="relative">

                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 outline-none transition focus:border-cyan-400/50"
                  />

                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 outline-none transition focus:border-cyan-400/50"
                  />

                </div>
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Phone number
                </label>

                <div className="relative">

                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+250..."
                    autoComplete="tel"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 outline-none transition focus:border-cyan-400/50"
                  />

                </div>
              </div>

              {/* ROLE */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Your role
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 outline-none transition focus:border-cyan-400/50"
                >

                  <option value="">
                    Select your role
                  </option>

                  <option value="student">
                    Student
                  </option>

                  <option value="instructor">
                    Teacher / Trainer
                  </option>

                  <option value="employee">
                    Employee
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  <option value="admin">
                    Administrator
                  </option>

                </select>

              </div>

            </div>

          </section>

          {/* =====================================
              SECURITY
          ====================================== */}

          <section className="border-b border-white/10 p-6 sm:p-8">

            <div className="mb-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Security
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Protect your account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Create a secure password for your
                eTraining account.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
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

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Confirm password
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
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

            </div>

          </section>

          {/* =====================================
              ERROR / SUCCESS
          ====================================== */}

          {(error || success) && (
            <div className="px-6 pt-6 sm:px-8">

              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                  {success}
                </div>
              )}

            </div>
          )}

          {/* =====================================
              FOOTER
          ====================================== */}

          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

            <div className="flex items-center gap-3 text-sm text-slate-500">

              <Users className="h-5 w-5 text-cyan-400" />

              <span>
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Sign in
                </Link>
              </span>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading
                ? "Creating account..."
                : "Create Account"}

              {!loading && (
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              )}

            </button>

          </div>

        </form>

        {/* =====================================
            SECURITY INFORMATION
        ====================================== */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-slate-500">

          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />

          <p>
            Your password is securely managed by
            Supabase Authentication. Passwords are not
            stored directly in the profiles table.
          </p>

        </div>

      </div>
    </main>
  );
}