import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Redirect user according to profile role
   */
  const redirectByRole = (role: string) => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;

      case "instructor":
        navigate("/instructor/dashboard", { replace: true });
        break;

      case "student":
      default:
        navigate("/dashboard", { replace: true });
        break;
    }
  };

  /**
   * Check existing session
   */
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted || !session?.user) {
          return;
        }

        /**
         * Get user's profile
         */
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select(
            `
              id,
              full_name,
              email,
              avatar_url,
              phone,
              bio,
              role,
              is_active,
              created_at,
              updated_at
            `
          )
          .eq("id", session.user.id)
          .single<Profile>();

        if (profileError || !profile) {
          console.error("Existing session profile error:", profileError);

          await supabase.auth.signOut();

          return;
        }

        if (!profile.is_active) {
          await supabase.auth.signOut();

          return;
        }

        redirectByRole(profile.role);
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  /**
   * Login
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      /**
       * Authenticate using Supabase Auth
       */
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (authError) {
        console.error("Login error:", authError);

        const message = authError.message.toLowerCase();

        if (message.includes("invalid login credentials")) {
          setError("Incorrect email or password.");
        } else if (message.includes("email not confirmed")) {
          setError(
            "Your email has not been confirmed. Please check your email."
          );
        } else if (message.includes("too many requests")) {
          setError(
            "Too many login attempts. Please wait a moment and try again."
          );
        } else {
          setError(authError.message);
        }

        return;
      }

      if (!authData.user) {
        setError("Unable to log you in. Please try again.");
        return;
      }

      /**
       * Get profile from public.profiles
       */
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select(
          `
            id,
            full_name,
            email,
            avatar_url,
            phone,
            bio,
            role,
            is_active,
            created_at,
            updated_at
          `
        )
        .eq("id", authData.user.id)
        .single<Profile>();

      if (profileError || !profile) {
        console.error("Profile error:", profileError);

        await supabase.auth.signOut();

        setError(
          "Your account was authenticated, but your profile could not be loaded."
        );

        return;
      }

      /**
       * Check whether account is active
       */
      if (!profile.is_active) {
        await supabase.auth.signOut();

        setError(
          "Your account is currently inactive. Please contact the administrator."
        );

        return;
      }

      /**
       * Successful login
       */
      setSuccess(
        `Welcome back, ${profile.full_name || "Learner"}!`
      );

      /**
       * Redirect according to role
       */
      setTimeout(() => {
        redirectByRole(profile.role);
      }, 500);
    } catch (err) {
      console.error("Unexpected login error:", err);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Loading while checking session
   */
  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />

          <p className="mt-4 text-sm text-slate-400">
            Checking your session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:py-24">
      <div className="mx-auto w-full max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <ShieldCheck className="h-8 w-8 text-cyan-300" />
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight">
            Welcome back
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Sign in to your eTraining account and continue your learning
            journey.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 p-6 sm:p-8">

              {/* EMAIL */}
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
                    name="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>

                  {/* FORGOT PASSWORD */}
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* SECURITY INFO */}
              <div className="flex gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-cyan-400" />

                <p className="text-xs leading-5 text-slate-400">
                  Your login is securely handled by Supabase Authentication.
                  Your password is never stored directly in the eTraining
                  profiles table.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-300"
                >
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-300"
                >
                  {success}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {/* REGISTER */}
            <div className="border-t border-white/10 p-6 text-center sm:p-8">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <User className="h-4 w-4 text-cyan-400" />

                <span>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    Create one
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-center text-xs leading-5 text-slate-600">
          eTraining — Virtual Reality, Simulation & Skills Development
        </p>
      </div>
    </main>
  );
}