
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  Headset,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserRoundCog,
  Globe,
} from "lucide-react";

type AccountType =
  | "individual"
  | "school"
  | "tvet"
  | "company"
  | "organization"
  | "training-provider";

type UserRole =
  | "administrator"
  | "trainer"
  | "teacher"
  | "coordinator"
  | "manager"
  | "vr-content-creator"
  | "learner"
  | "other";

type TrainingPurpose =
  | "create-vr"
  | "deliver-training"
  | "manage-learners"
  | "track-progress"
  | "assess-learners"
  | "interactive-scenarios"
  | "existing-content";

interface RegisterForm {
  accountType: AccountType;
  fullName: string;
  email: string;
  phone: string;
  country: string;

  organizationName: string;
  organizationType: string;
  city: string;
  website: string;

  role: UserRole;

  purposes: TrainingPurpose[];

  password: string;
  confirmPassword: string;
}

const accountTypes = [
  {
    value: "individual" as AccountType,
    title: "Individual",
    description: "For people who want to learn or explore eTraining.",
    icon: User,
  },
  {
    value: "school" as AccountType,
    title: "School / University",
    description: "For schools, universities and education institutions.",
    icon: GraduationCap,
  },
  {
    value: "tvet" as AccountType,
    title: "TVET / Training Center",
    description: "For practical and vocational training institutions.",
    icon: Headset,
  },
  {
    value: "company" as AccountType,
    title: "Company",
    description: "For organizations providing workplace training.",
    icon: Building2,
  },
  {
    value: "organization" as AccountType,
    title: "NGO / Organization",
    description: "For organizations running learning programs.",
    icon: ShieldCheck,
  },
  {
    value: "training-provider" as AccountType,
    title: "Training Provider",
    description: "For professional training providers and creators.",
    icon: UserRoundCog,
  },
];

const roles = [
  { value: "administrator", label: "Administrator" },
  { value: "trainer", label: "Trainer / Instructor" },
  { value: "teacher", label: "Teacher" },
  { value: "coordinator", label: "Coordinator" },
  { value: "manager", label: "Manager" },
  { value: "vr-content-creator", label: "VR Content Creator" },
  { value: "learner", label: "Learner" },
  { value: "other", label: "Other" },
];

const purposes = [
  {
    value: "create-vr" as TrainingPurpose,
    label: "Create VR Training",
  },
  {
    value: "deliver-training" as TrainingPurpose,
    label: "Deliver Training",
  },
  {
    value: "manage-learners" as TrainingPurpose,
    label: "Manage Learners",
  },
  {
    value: "track-progress" as TrainingPurpose,
    label: "Track Training Progress",
  },
  {
    value: "assess-learners" as TrainingPurpose,
    label: "Assess Learners",
  },
  {
    value: "interactive-scenarios" as TrainingPurpose,
    label: "Create Interactive Scenarios",
  },
  {
    value: "existing-content" as TrainingPurpose,
    label: "Use Existing Training Content",
  },
];

const initialForm: RegisterForm = {
  accountType: "individual",
  fullName: "",
  email: "",
  phone: "",
  country: "",

  organizationName: "",
  organizationType: "",
  city: "",
  website: "",

  role: "learner",

  purposes: [],

  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegisterForm>(initialForm);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const isOrganization =
    form.accountType !== "individual";

  const totalSteps = isOrganization ? 4 : 3;

  const updateField = <K extends keyof RegisterForm>(
    field: K,
    value: RegisterForm[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    updateField(
      name as keyof RegisterForm,
      value as RegisterForm[keyof RegisterForm],
    );
  };

  const togglePurpose = (purpose: TrainingPurpose) => {
    setForm((previous) => {
      const exists = previous.purposes.includes(purpose);

      return {
        ...previous,
        purposes: exists
          ? previous.purposes.filter((item) => item !== purpose)
          : [...previous.purposes, purpose],
      };
    });

    setError("");
  };

  const validateStep = () => {
    setError("");

    if (step === 1) {
      if (!form.accountType) {
        setError("Please select how you will use eTraining.");
        return false;
      }

      return true;
    }

    if (step === 2) {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        return false;
      }

      if (!form.email.trim()) {
        setError("Please enter your email address.");
        return false;
      }

      if (!form.country.trim()) {
        setError("Please select or enter your country.");
        return false;
      }

      return true;
    }

    if (isOrganization && step === 3) {
      if (!form.organizationName.trim()) {
        setError("Please enter the organization name.");
        return false;
      }

      if (!form.organizationType.trim()) {
        setError("Please select the organization type.");
        return false;
      }

      if (!form.city.trim()) {
        setError("Please enter the city.");
        return false;
      }

      return true;
    }

    const passwordStep = isOrganization ? 4 : 3;

    if (step === passwordStep) {
      if (form.password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return false;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }

      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    if (step < totalSteps) {
      setStep((previous) => previous + 1);
    }
  };

  const handleBack = () => {
    setError("");

    if (step > 1) {
      setStep((previous) => previous - 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    /*
      Backend/API registration will be connected here.

      Example future payload:

      {
        accountType,
        fullName,
        email,
        phone,
        country,
        organizationName,
        organizationType,
        city,
        website,
        role,
        purposes,
        password
      }
    */

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-12%] top-[8%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute right-[-12%] top-[20%] h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute bottom-[-15%] left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {/* =====================================================
            TOP NAVIGATION
        ====================================================== */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Headset className="h-5 w-5" />
            </div>

            <div>
              <p className="font-black tracking-tight">
                eTraining
              </p>

              <p className="hidden text-xs text-slate-600 sm:block">
                Immersive practical learning
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="text-sm font-semibold text-slate-400 transition hover:text-cyan-300"
          >
            Already have an account?
            <span className="ml-1 text-cyan-300">
              Sign in
            </span>
          </Link>
        </div>

        {/* =====================================================
            MAIN
        ====================================================== */}
        <div className="mx-auto grid max-w-6xl items-center gap-12 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:py-16">
          {/* =================================================
              LEFT INFORMATION
          ================================================== */}
          <motion.section
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="max-w-md">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-semibold text-cyan-300">
                <Headset className="h-4 w-4" />
                Join eTraining
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight">
                Build better training with
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  immersive technology.
                </span>
              </h1>

              <p className="mt-6 leading-8 text-slate-400">
                eTraining helps individuals, institutions,
                companies and training organizations explore
                practical learning, interactive scenarios and
                Virtual Reality experiences.
              </p>

              <div className="mt-9 space-y-4">
                {[
                  "Create and deliver practical training",
                  "Explore immersive VR experiences",
                  "Manage learners and training activities",
                  "Track learning and assessment progress",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-400" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold">
                      One platform, many possibilities
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Whether you are a learner, institution,
                      company or training provider, eTraining
                      can support your training journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* =================================================
              REGISTER PANEL
          ================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* Heading */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Create account
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Create your eTraining account
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Tell us a little about yourself or your
                  organization so we can provide the right
                  eTraining experience.
                </p>
              </div>

              {/* =================================================
                  PROGRESS
              ================================================== */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-300">
                    Step {step} of {totalSteps}
                  </p>

                  <p className="text-xs text-slate-600">
                    {Math.round((step / totalSteps) * 100)}%
                  </p>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(step / totalSteps) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >
                <AnimatePresence mode="wait">
                  {/* =================================================
                      STEP 1 — ACCOUNT TYPE
                  ================================================== */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-5">
                        <h3 className="text-xl font-bold">
                          How will you use eTraining?
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Choose the option that best describes
                          your account.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {accountTypes.map((type) => {
                          const Icon = type.icon;
                          const selected =
                            form.accountType === type.value;

                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() =>
                                updateField(
                                  "accountType",
                                  type.value,
                                )
                              }
                              className={`group relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                                selected
                                  ? "border-cyan-400/50 bg-cyan-400/[0.07]"
                                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                              }`}
                            >
                              {selected && (
                                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}

                              <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                  selected
                                    ? "bg-cyan-400/15 text-cyan-300"
                                    : "bg-white/5 text-slate-400"
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>

                              <h4 className="mt-4 font-bold">
                                {type.title}
                              </h4>

                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {type.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 2 — PERSONAL INFORMATION
                  ================================================== */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-bold">
                          Your information
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Tell us who will be managing this
                          eTraining account.
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* Full name */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Full name
                          </label>

                          <div className="relative">
                            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                              id="fullName"
                              name="fullName"
                              type="text"
                              value={form.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              autoComplete="name"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>

                        {/* Email */}
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
                              onChange={handleInputChange}
                              placeholder="you@example.com"
                              autoComplete="email"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Phone number
                            <span className="ml-1 text-xs text-slate-600">
                              Optional
                            </span>
                          </label>

                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleInputChange}
                              placeholder="+250 ..."
                              autoComplete="tel"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>

                        {/* Country */}
                        <div>
                          <label
                            htmlFor="country"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Country
                          </label>

                          <div className="relative">
                            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                              id="country"
                              name="country"
                              type="text"
                              value={form.country}
                              onChange={handleInputChange}
                              placeholder="e.g. Rwanda"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>

                        {/* Role */}
                        <div>
                          <label
                            htmlFor="role"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Your role
                          </label>

                          <div className="relative">
                            <select
                              id="role"
                              name="role"
                              value={form.role}
                              onChange={handleInputChange}
                              className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400/40"
                            >
                              {roles.map((role) => (
                                <option
                                  key={role.value}
                                  value={role.value}
                                  className="bg-slate-900"
                                >
                                  {role.label}
                                </option>
                              ))}
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      STEP 3 — ORGANIZATION
                  ================================================== */}
                  {step === 3 && isOrganization && (
                    <motion.div
                      key="step-3-organization"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-bold">
                          Organization information
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Tell us about the institution or
                          organization you represent.
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* Organization name */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="organizationName"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Organization name
                          </label>

                          <div className="relative">
                            <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                              id="organizationName"
                              name="organizationName"
                              type="text"
                              value={form.organizationName}
                              onChange={handleInputChange}
                              placeholder="Enter organization name"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>

                        {/* Organization type */}
                        <div>
                          <label
                            htmlFor="organizationType"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Organization type
                          </label>

                          <div className="relative">
                            <select
                              id="organizationType"
                              name="organizationType"
                              value={form.organizationType}
                              onChange={handleInputChange}
                              className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400/40"
                            >
                              <option
                                value=""
                                className="bg-slate-900"
                              >
                                Select type
                              </option>

                              <option
                                value="school"
                                className="bg-slate-900"
                              >
                                School
                              </option>

                              <option
                                value="university"
                                className="bg-slate-900"
                              >
                                University
                              </option>

                              <option
                                value="tvet"
                                className="bg-slate-900"
                              >
                                TVET Institution
                              </option>

                              <option
                                value="training-center"
                                className="bg-slate-900"
                              >
                                Training Center
                              </option>

                              <option
                                value="company"
                                className="bg-slate-900"
                              >
                                Company
                              </option>

                              <option
                                value="ngo"
                                className="bg-slate-900"
                              >
                                NGO
                              </option>

                              <option
                                value="government"
                                className="bg-slate-900"
                              >
                                Government Institution
                              </option>

                              <option
                                value="other"
                                className="bg-slate-900"
                              >
                                Other
                              </option>
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                          </div>
                        </div>

                        {/* City */}
                        <div>
                          <label
                            htmlFor="city"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            City
                          </label>

                          <div className="relative">
                            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                              id="city"
                              name="city"
                              type="text"
                              value={form.city}
                              onChange={handleInputChange}
                              placeholder="e.g. Kigali"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>

                        {/* Website */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="website"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                          >
                            Organization website
                            <span className="ml-1 text-xs text-slate-600">
                              Optional
                            </span>
                          </label>

                          <div className="relative">
                            <Globe className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                              id="website"
                              name="website"
                              type="url"
                              value={form.website}
                              onChange={handleInputChange}
                              placeholder="https://example.com"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      TRAINING PURPOSE
                  ================================================== */}
                  {((step === 3 && !isOrganization) ||
                    (step === 4 && isOrganization)) && (
                    <motion.div
                      key="training-purpose"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-bold">
                          What do you want to do with eTraining?
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Select one or more options that match
                          your training needs.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {purposes.map((purpose) => {
                          const selected =
                            form.purposes.includes(
                              purpose.value,
                            );

                          return (
                            <button
                              key={purpose.value}
                              type="button"
                              onClick={() =>
                                togglePurpose(purpose.value)
                              }
                              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                                selected
                                  ? "border-cyan-400/40 bg-cyan-400/[0.07]"
                                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                              }`}
                            >
                              <div
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                  selected
                                    ? "border-cyan-400 bg-cyan-400 text-slate-950"
                                    : "border-white/20"
                                }`}
                              >
                                {selected && (
                                  <Check className="h-3.5 w-3.5" />
                                )}
                              </div>

                              <span className="text-sm font-medium text-slate-300">
                                {purpose.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-5 text-xs leading-5 text-slate-600">
                        You can change your training preferences
                        later from your account.
                      </p>
                    </motion.div>
                  )}

                  {/* =================================================
                      PASSWORD
                  ================================================== */}
                  {((step === 3 && !isOrganization) ||
                    (step === 4 && isOrganization)) && (
                    <div className="mt-8 border-t border-white/10 pt-8">
                      <h3 className="text-lg font-bold">
                        Account security
                      </h3>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {/* Password */}
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
                              type={
                                showPassword
                                  ? "text"
                                  : "password"
                              }
                              value={form.password}
                              onChange={handleInputChange}
                              placeholder="Create password"
                              autoComplete="new-password"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword(
                                  (previous) => !previous,
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:text-cyan-300"
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

                        {/* Confirm password */}
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
                              onChange={handleInputChange}
                              placeholder="Confirm password"
                              autoComplete="new-password"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(
                                  (previous) => !previous,
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:text-cyan-300"
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
                      </div>

                      <div className="mt-5 flex items-start gap-3">
                        <input
                          id="terms"
                          type="checkbox"
                          required
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 accent-cyan-400"
                        />

                        <label
                          htmlFor="terms"
                          className="text-xs leading-5 text-slate-500"
                        >
                          I agree to the eTraining terms and
                          understand how my account information
                          will be used to provide the platform
                          services.
                        </label>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                {/* =================================================
                    BUTTONS
                ================================================== */}
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-300 transition hover:bg-white/[0.06]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-300 transition hover:bg-white/[0.06]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Home
                    </Link>
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Continue

                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Create Account

                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </form>

              {/* Security note */}
              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-600">
                <LockKeyhole className="h-3.5 w-3.5" />
                Your account information is handled securely.
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

