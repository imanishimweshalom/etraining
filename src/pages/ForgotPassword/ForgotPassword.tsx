import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

type Step = "email" | "sent" | "password";

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendResetLink = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setStep("sent");
      setSuccess(
        "A password reset link has been sent to your email address."
      );
    } catch (err) {
      console.error("Reset email error:", err);
      setError("Unable to send the password reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!password) {
      setError("Please enter your new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(
        "Your password has been updated successfully. You can now sign in."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1800);
    } catch (err) {
      console.error("Password update error:", err);
      setError("Unable to update your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:py-24">
      <div className="mx-auto w-full max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <ShieldCheck className="h-8 w-8 text-cyan-300" />
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight">
            {step === "password"
              ? "Create new password"
              : "Forgot password?"}
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
            {step === "email" &&
              "Enter your registered email address and we will help you recover your account."}

            {step === "sent" &&
              "Check your email and follow the password reset link."}

            {step === "password" &&
              "Create a strong new password for your eTraining account."}
          </p>
        </div>

        {/* CARD */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/20">

          {/* STEP 1 */}
          {step === "email" && (
            <form onSubmit={handleSendResetLink}>
              <div className="space-y-6 p-6 sm:p-8">

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 disabled:opacity-60"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>

              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === "sent" && (
            <div className="space-y-6 p-6 text-center sm:p-8">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Check your email
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  We sent a password reset link to:
                </p>

                <p className="mt-2 break-all font-semibold text-cyan-300">
                  {email}
                </p>
              </div>

              {success && (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-300">
                  {success}
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                <p className="text-xs leading-5 text-slate-400">
                  Open the email and click the password reset button.
                  You will then be taken back to eTraining where you can
                  create your new password.
                </p>
              </div>

              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-4 font-semibold transition hover:bg-white/5"
              >
                Back to Login
                <ArrowRight className="h-5 w-5" />
              </Link>

            </div>
          )}

          {/* STEP 3 */}
          {step === "password" && (
            <form onSubmit={handleUpdatePassword}>
              <div className="space-y-6 p-6 sm:p-8">

                {/* NEW PASSWORD */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Confirm new password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) => !previous
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-300">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-300">
                    {success}
                  </div>
                )}

                <div className="flex gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-cyan-400" />

                  <p className="text-xs leading-5 text-slate-400">
                    Your password is securely managed by Supabase
                    Authentication.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>

              </div>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-slate-600">
          eTraining — Virtual Reality, Simulation & Skills Development
        </p>
      </div>
    </main>
  );
}