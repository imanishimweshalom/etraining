
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    shortName: "f",
    href: "#",
  },
  {
    name: "Instagram",
    shortName: "ig",
    href: "#",
  },
  {
    name: "LinkedIn",
    shortName: "in",
    href: "#",
  },
  {
    name: "X",
    shortName: "𝕏",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
                <span className="text-lg font-black text-white">eT</span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">eTraining</h2>

                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Practical Learning Platform
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Modern practical training designed to help learners build
              knowledge, practice real-world scenarios and develop job-ready
              skills.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-sm font-bold text-slate-400 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  {social.shortName}
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-white">Platform</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/trainings"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Trainings
              </Link>

              <Link
                to="/how-it-works"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                How It Works
              </Link>

              <Link
                to="/vr-experience"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                VR Experience
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">Company</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/about"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                to="/register"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} eTraining. All rights reserved.
          </p>

          <Link
            to="/trainings"
            className="group flex items-center gap-1 transition hover:text-white"
          >
            Explore training

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

