import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
                <span className="text-lg font-black">eT</span>
              </div>

              <div>
                <h2 className="text-xl font-bold">eTraining</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Practical Learning Platform
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Modern practical training designed to help learners build
              knowledge, practice real-world scenarios and develop
              job-ready skills.
            </p>

            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Platform</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link className="text-sm text-slate-400 hover:text-white" to="/trainings">
                Trainings
              </Link>
              <Link className="text-sm text-slate-400 hover:text-white" to="/how-it-works">
                How It Works
              </Link>
              <Link className="text-sm text-slate-400 hover:text-white" to="/vr-experience">
                VR Experience
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link className="text-sm text-slate-400 hover:text-white" to="/about">
                About
              </Link>
              <Link className="text-sm text-slate-400 hover:text-white" to="/contact">
                Contact
              </Link>
              <Link className="text-sm text-slate-400 hover:text-white" to="/register">
                Create Account
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} eTraining. All rights reserved.</p>

          <Link
            to="/trainings"
            className="flex items-center gap-1 transition hover:text-white"
          >
            Explore training
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}