import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

type AccountType = "individual" | "organization";

type RegisterForm = {
  accountType: AccountType;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;

  organizationName: string;
  organizationType: string;
  organizationCode: string;
  secretKey: string;

  role: string;
  purposes: string[];

  password: string;
  confirmPassword: string;
};

const initialForm: RegisterForm = {
  accountType: "individual",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",

  organizationName: "",
  organizationType: "",
  organizationCode: "",
  secretKey: "",

  role: "",
  purposes: [],

  password: "",
  confirmPassword: "",
};

const purposeOptions: string[] = [
  "Virtual Reality Training",
  "Workplace Safety",
  "Technical Training",
  "Education",
  "Employee Training",
  "Skills Development",
  "Simulation",
  "Other",
];

const organizationTypes: string[] = [
  "School",
  "University",
  "TVET Institution",
  "Training Center",
  "Company",
  "Government Institution",
  "NGO",
  "Student/Youth Organization",
  "Other",
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showSecretKey, setShowSecretKey] = useState<boolean>(false);

  const [organizationVerified, setOrganizationVerified] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  /*
   * ---------------------------------------------------------
   * INPUT HANDLER
   * ---------------------------------------------------------
   */

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * ---------------------------------------------------------
   * PURPOSE HANDLER
   * ---------------------------------------------------------
   */

  const handlePurposeChange = (purpose: string) => {
    setForm((previous) => {
      const exists = previous.purposes.includes(purpose);

      return {
        ...previous,
        purposes: exists
          ? previous.purposes.filter((item) => item !== purpose)
          : [...previous.purposes, purpose],
      };
    });
  };

  /*
   * ---------------------------------------------------------
   * ACCOUNT TYPE
   * ---------------------------------------------------------
   */

  const handleAccountTypeChange = (accountType: AccountType) => {
    setForm((previous) => ({
      ...previous,
      accountType,
      organizationName: "",
      organizationType: "",
      organizationCode: "",
      secretKey: "",
      role: "",
    }));

    setOrganizationVerified(false);
    setError("");
    setSuccess("");
  };

  /*
   * ---------------------------------------------------------
   * VERIFY ORGANIZATION SECRET KEY
   * ---------------------------------------------------------
   *
   * For now this is frontend logic.
   *
   * Later:
   *   POST /api/organizations/verify-key
   *
   * The backend should verify the real secret key.
   */

  const verifyOrganization = () => {
    setError("");
    setSuccess("");

    if (!form.organizationName.trim()) {
      setError("Enter your organization name first.");
      return;
    }

    if (!form.organizationCode.trim()) {
      setError("Enter your organization code.");
      return;
    }

    if (!form.secretKey.trim()) {
      setError("Enter the secret key provided by your organization admin.");
      return;
    }

    /*
     * Temporary UI verification.
     *
     * DO NOT use this as real security.
     * Real verification must happen on the backend.
     */

    setOrganizationVerified(true);

    setSuccess(
      "Organization information accepted. You can continue with registration."
    );
  };

  /*
   * ---------------------------------------------------------
   * VALIDATION
   * ---------------------------------------------------------
   */

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

    if (!form.country.trim()) {
      setError("Please select or enter your country.");
      return false;
    }

    if (form.accountType === "organization") {
      if (!form.organizationName.trim()) {
        setError("Please enter the organization name.");
        return false;
      }

      if (!form.organizationType) {
        setError("Please select the organization type.");
        return false;
      }
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (form.accountType === "organization" && !organizationVerified) {
      setError("Please verify your organization before continuing.");
      return false;
    }

    return true;
  };

  /*
   * ---------------------------------------------------------
   * SUBMIT
   * ---------------------------------------------------------
   */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Later connect this to your backend:
       *
       * await fetch("/api/auth/register", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify(form),
       * });
       */

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });

      setSuccess(
        "Account information is ready. Backend registration can now be connected."
      );

      /*
       * When backend is ready:
       *
       * navigate("/login");
       */
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

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
            Join eTraining as an individual learner or create an account for
            your organization.
          </p>
        </div>

        {/* ACCOUNT TYPE */}

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {/* INDIVIDUAL */}

          <button
            type="button"
            onClick={() => handleAccountTypeChange("individual")}
            className={`rounded-2xl border p-6 text-left transition ${
              form.accountType === "individual"
                ? "border-cyan-400/50 bg-cyan-400/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <User className="h-6 w-6" />
              </div>

              {form.accountType === "individual" && (
                <Check className="h-5 w-5 text-cyan-300" />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold">Individual Account</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              For individual learners, professionals, students and people who
              want to access training independently.
            </p>
          </button>

          {/* ORGANIZATION */}

          <button
            type="button"
            onClick={() => handleAccountTypeChange("organization")}
            className={`rounded-2xl border p-6 text-left transition ${
              form.accountType === "organization"
                ? "border-cyan-400/50 bg-cyan-400/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                <Building2 className="h-6 w-6" />
              </div>

              {form.accountType === "organization" && (
                <Check className="h-5 w-5 text-cyan-300" />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold">Organization Account</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              For schools, companies, institutions, training centers and other
              organizations using eTraining.
            </p>
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
        >
          {/* PERSONAL INFORMATION */}

          <section className="border-b border-white/10 p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Step 1
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Personal information
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Tell us about the person who will use this account.
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
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 outline-none transition focus:border-cyan-400/50"
                  />
                </div>
              </div>

              {/* COUNTRY */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Country
                </label>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Rwanda"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 outline-none transition focus:border-cyan-400/50"
                  />
                </div>
              </div>

              {/* CITY */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Kigali"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 outline-none transition focus:border-cyan-400/50"
                />
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
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher / Trainer</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="administrator">Administrator</option>
                  <option value="developer">Developer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* ORGANIZATION */}

          {form.accountType === "organization" && (
            <section className="border-b border-white/10 bg-blue-400/[0.025] p-6 sm:p-8">
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Organization
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Organization information
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Organizations can use eTraining to provide virtual reality,
                  simulations and practical training experiences.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* ORGANIZATION NAME */}

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Organization name
                  </label>

                  <input
                    type="text"
                    name="organizationName"
                    value={form.organizationName}
                    onChange={handleChange}
                    placeholder="Example: ABC Training Center"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 outline-none transition focus:border-cyan-400/50"
                  />
                </div>

                {/* ORGANIZATION TYPE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Organization type
                  </label>

                  <select
                    name="organizationType"
                    value={form.organizationType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 outline-none transition focus:border-cyan-400/50"
                  >
                    <option value="">Select organization type</option>

                    {organizationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ORGANIZATION CODE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Organization code
                  </label>

                  <input
                    type="text"
                    name="organizationCode"
                    value={form.organizationCode}
                    onChange={handleChange}
                    placeholder="Code provided by your organization"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 outline-none transition focus:border-cyan-400/50"
                  />
                </div>

                {/* SECRET KEY */}

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Organization secret key
                  </label>

                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      type={showSecretKey ? "text" : "password"}
                      name="secretKey"
                      value={form.secretKey}
                      onChange={handleChange}
                      placeholder="Enter secret key"
                      className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowSecretKey((previous) => !previous)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showSecretKey ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    This key should be provided by your organization
                    administrator.
                  </p>
                </div>
              </div>

              {/* VERIFY */}

              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <ShieldCheck
                    className={`h-6 w-6 shrink-0 ${
                      organizationVerified
                        ? "text-emerald-400"
                        : "text-cyan-400"
                    }`}
                  />

                  <div>
                    <p className="font-semibold">
                      {organizationVerified
                        ? "Organization verified"
                        : "Verify organization"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Use the code and secret key provided by your
                      organization administrator.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={verifyOrganization}
                  disabled={organizationVerified}
                  className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {organizationVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </section>
          )}

          {/* PURPOSE */}

          <section className="border-b border-white/10 p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Training interests
              </p>

              <h2 className="mt-2 text-2xl font-black">
                What do you want to use eTraining for?
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Select all options that apply.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {purposeOptions.map((purpose) => {
                const selected = form.purposes.includes(purpose);

                return (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() => handlePurposeChange(purpose)}
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      selected
                        ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{purpose}</span>

                      {selected && <Check className="h-4 w-4 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PASSWORD */}

          <section className="border-b border-white/10 p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Security
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Protect your account
              </h2>
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
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
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
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
            </div>
          </section>

          {/* ERROR / SUCCESS */}

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

          {/* SUBMIT */}

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
              {loading ? "Creating account..." : "Create Account"}

              {!loading && (
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}