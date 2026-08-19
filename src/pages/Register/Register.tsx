import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
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
  AlertCircle,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

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

type OrganizationVerification = {
  verified: boolean;
  organizationId?: string;
  organizationName?: string;
  message?: string;
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

const purposeOptions = [
  "Virtual Reality Training",
  "Workplace Safety",
  "Technical Training",
  "Education",
  "Employee Training",
  "Skills Development",
  "Simulation",
  "Other",
];

const organizationTypes = [
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

const roleOptions = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "teacher",
    label: "Teacher / Trainer",
  },
  {
    value: "employee",
    label: "Employee",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "administrator",
    label: "Administrator",
  },
  {
    value: "developer",
    label: "Developer",
  },
  {
    value: "other",
    label: "Other",
  },
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<RegisterForm>(initialForm);

  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [showSecretKey, setShowSecretKey] =
    useState<boolean>(false);

  const [organizationVerified, setOrganizationVerified] =
    useState<boolean>(false);

  const [verifiedOrganizationId, setVerifiedOrganizationId] =
    useState<string>("");

  const [loading, setLoading] =
    useState<boolean>(false);

  const [verifyingOrganization, setVerifyingOrganization] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>("");

  const [success, setSuccess] =
    useState<string>("");

  /*
   * -------------------------------------------------------
   * INPUT CHANGE
   * -------------------------------------------------------
   */

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

    if (
      name === "organizationCode" ||
      name === "secretKey" ||
      name === "organizationName"
    ) {
      setOrganizationVerified(false);
      setVerifiedOrganizationId("");
    }

    setError("");
    setSuccess("");
  };

  /*
   * -------------------------------------------------------
   * PURPOSE CHANGE
   * -------------------------------------------------------
   */

  const handlePurposeChange = (purpose: string) => {
    setForm((previous) => {
      const exists = previous.purposes.includes(purpose);

      return {
        ...previous,
        purposes: exists
          ? previous.purposes.filter(
              (item) => item !== purpose
            )
          : [...previous.purposes, purpose],
      };
    });

    setError("");
    setSuccess("");
  };

  /*
   * -------------------------------------------------------
   * ACCOUNT TYPE
   * -------------------------------------------------------
   */

  const handleAccountTypeChange = (
    accountType: AccountType
  ) => {
    setForm((previous) => ({
      ...previous,
      accountType,
      organizationName: "",
      organizationType: "",
      organizationCode: "",
      secretKey: "",
    }));

    setOrganizationVerified(false);
    setVerifiedOrganizationId("");
    setError("");
    setSuccess("");
  };

  /*
   * -------------------------------------------------------
   * VERIFY ORGANIZATION
   *
   * This calls a Supabase RPC function:
   *
   * verify_organization(
   *   organization_name,
   *   organization_code,
   *   secret_key
   * )
   *
   * The secret key is therefore verified server-side.
   * -------------------------------------------------------
   */

  const verifyOrganization = async () => {
    setError("");
    setSuccess("");

    if (!form.organizationName.trim()) {
      setError(
        "Enter your organization name first."
      );
      return;
    }

    if (!form.organizationType) {
      setError(
        "Please select your organization type."
      );
      return;
    }

    if (!form.organizationCode.trim()) {
      setError(
        "Enter your organization code."
      );
      return;
    }

    if (!form.secretKey.trim()) {
      setError(
        "Enter the secret key provided by your organization administrator."
      );
      return;
    }

    try {
      setVerifyingOrganization(true);

      const { data, error: rpcError } =
        await supabase.rpc(
          "verify_organization",
          {
            p_organization_name:
              form.organizationName.trim(),

            p_organization_code:
              form.organizationCode.trim(),

            p_secret_key:
              form.secretKey.trim(),
          }
        );

      if (rpcError) {
        console.error(
          "Organization verification error:",
          rpcError
        );

        throw new Error(
          "Unable to verify the organization. Please try again."
        );
      }

      const result =
        data as OrganizationVerification | null;

      if (!result?.verified) {
        throw new Error(
          result?.message ||
            "Invalid organization name, code or secret key."
        );
      }

      setOrganizationVerified(true);

      setVerifiedOrganizationId(
        result.organizationId || ""
      );

      setSuccess(
        `Organization verified successfully${
          result.organizationName
            ? `: ${result.organizationName}`
            : "."
        }`
      );
    } catch (verificationError) {
      console.error(
        "Verification failed:",
        verificationError
      );

      setOrganizationVerified(false);
      setVerifiedOrganizationId("");

      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Organization verification failed."
      );
    } finally {
      setVerifyingOrganization(false);
    }
  };

  /*
   * -------------------------------------------------------
   * VALIDATE FORM
   * -------------------------------------------------------
   */

  const validateForm = (): boolean => {
    setError("");

    if (!form.fullName.trim()) {
      setError(
        "Please enter your full name."
      );
      return false;
    }

    if (!form.email.trim()) {
      setError(
        "Please enter your email address."
      );
      return false;
    }

    if (!form.phone.trim()) {
      setError(
        "Please enter your phone number."
      );
      return false;
    }

    if (!form.country.trim()) {
      setError(
        "Please enter your country."
      );
      return false;
    }

    if (!form.city.trim()) {
      setError(
        "Please enter your city."
      );
      return false;
    }

    if (!form.role) {
      setError(
        "Please select your role."
      );
      return false;
    }

    if (form.accountType === "organization") {
      if (!form.organizationName.trim()) {
        setError(
          "Please enter the organization name."
        );
        return false;
      }

      if (!form.organizationType) {
        setError(
          "Please select the organization type."
        );
        return false;
      }

      if (!form.organizationCode.trim()) {
        setError(
          "Please enter the organization code."
        );
        return false;
      }

      if (!form.secretKey.trim()) {
        setError(
          "Please enter the organization secret key."
        );
        return false;
      }

      if (!organizationVerified) {
        setError(
          "Please verify your organization before creating your account."
        );
        return false;
      }

      if (!verifiedOrganizationId) {
        setError(
          "Organization verification is incomplete. Please verify again."
        );
        return false;
      }
    }

    if (form.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return false;
    }

    return true;
  };

  /*
   * -------------------------------------------------------
   * REGISTER USER
   * -------------------------------------------------------
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      /*
       * -----------------------------------------------
       * 1. CREATE SUPABASE AUTH USER
       * -----------------------------------------------
       */

      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: form.email.trim().toLowerCase(),
          password: form.password,

          options: {
            data: {
              full_name: form.fullName.trim(),
              phone: form.phone.trim(),
              country: form.country.trim(),
              city: form.city.trim(),
              role: form.role,
              account_type: form.accountType,
              purposes: form.purposes,

              /*
               * Organization ID is included only after
               * successful database verification.
               */

              organization_id:
                form.accountType ===
                "organization"
                  ? verifiedOrganizationId
                  : null,
            },
          },
        });

      if (authError) {
        console.error(
          "Supabase signup error:",
          authError
        );

        if (
          authError.message
            .toLowerCase()
            .includes("already registered")
        ) {
          throw new Error(
            "An account with this email already exists. Please sign in instead."
          );
        }

        throw new Error(
          authError.message ||
            "Unable to create your account."
        );
      }

      if (!authData.user) {
        throw new Error(
          "Account creation failed. Please try again."
        );
      }

      /*
       * -----------------------------------------------
       * 2. UPDATE PROFILE
       *
       * Your current profiles table already contains:
       *
       * id
       * full_name
       * email
       * phone
       * role
       * is_active
       *
       * The trigger may already create this row.
       * Therefore we update it instead of inserting
       * another profile.
       * -----------------------------------------------
       */

      const { error: profileError } =
        await supabase
          .from("profiles")
          .update({
            full_name: form.fullName.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            role: form.role,
            is_active: true,
          })
          .eq("id", authData.user.id);

      if (profileError) {
        console.error(
          "Profile update error:",
          profileError
        );

        /*
         * We don't delete the Auth user here.
         *
         * The Auth account was successfully created.
         * The profile can be repaired by the database
         * trigger or administrator.
         */
      }

      /*
       * -----------------------------------------------
       * 3. SAVE ORGANIZATION MEMBERSHIP
       *
       * This requires organization_id column on
       * profiles.
       *
       * We try it only for organization accounts.
       * -----------------------------------------------
       */

      if (
        form.accountType === "organization" &&
        verifiedOrganizationId
      ) {
        const { error: organizationProfileError } =
          await supabase
            .from("profiles")
            .update({
              organization_id:
                verifiedOrganizationId,
            })
            .eq("id", authData.user.id);

        if (organizationProfileError) {
          console.error(
            "Organization profile update error:",
            organizationProfileError
          );

          /*
           * Do not expose database implementation
           * details to the user.
           */
        }
      }

      /*
       * -----------------------------------------------
       * 4. SUCCESS
       * -----------------------------------------------
       */

      if (
        authData.session === null
      ) {
        setSuccess(
          "Account created successfully. Please check your email to confirm your account before signing in."
        );
      } else {
        setSuccess(
          "Account created successfully. Redirecting..."
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      }
    } catch (registrationError) {
      console.error(
        "Registration error:",
        registrationError
      );

      setError(
        registrationError instanceof Error
          ? registrationError.message
          : "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * -------------------------------------------------------
   * UI
   * -------------------------------------------------------
   */

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
            Join eTraining as an individual learner
            or connect your account to an organization.
          </p>
        </div>

        {/* ACCOUNT TYPE */}

        <div className="mb-8 grid gap-4 md:grid-cols-2">

          {/* INDIVIDUAL */}

          <button
            type="button"
            onClick={() =>
              handleAccountTypeChange("individual")
            }
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

              {form.accountType ===
                "individual" && (
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Individual Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              For individual learners,
              professionals, students and people
              who want to access training independently.
            </p>
          </button>

          {/* ORGANIZATION */}

          <button
            type="button"
            onClick={() =>
              handleAccountTypeChange(
                "organization"
              )
            }
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

              {form.accountType ===
                "organization" && (
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Organization Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              For schools, companies, institutions,
              training centers and other organizations
              using eTraining.
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
                Tell us about the person who will use
                this account.
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
                    autoComplete="country-name"
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
                  autoComplete="address-level2"
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
                  <option value="">
                    Select your role
                  </option>

                  {roleOptions.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* ORGANIZATION */}

          {form.accountType ===
            "organization" && (
            <section className="border-b border-white/10 bg-blue-400/[0.025] p-6 sm:p-8">

              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Organization
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Connect your organization
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Enter the organization details and
                  the access credentials provided by
                  your organization administrator.
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
                    <option value="">
                      Select organization type
                    </option>

                    {organizationTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
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
                    placeholder="Example: ORG-2026-001"
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
                      type={
                        showSecretKey
                          ? "text"
                          : "password"
                      }
                      name="secretKey"
                      value={form.secretKey}
                      onChange={handleChange}
                      placeholder="Enter secret key"
                      autoComplete="off"
                      className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowSecretKey(
                          (previous) =>
                            !previous
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      aria-label={
                        showSecretKey
                          ? "Hide secret key"
                          : "Show secret key"
                      }
                    >
                      {showSecretKey ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    This key should come from your
                    organization administrator.
                  </p>
                </div>
              </div>

              {/* VERIFICATION */}

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex gap-3">

                    {organizationVerified ? (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
                    ) : (
                      <ShieldCheck className="h-6 w-6 shrink-0 text-cyan-400" />
                    )}

                    <div>

                      <p className="font-semibold">
                        {organizationVerified
                          ? "Organization verified"
                          : "Verify organization"}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your organization code and
                        secret key will be checked
                        securely against the database.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={
                      verifyOrganization
                    }
                    disabled={
                      verifyingOrganization ||
                      organizationVerified
                    }
                    className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {verifyingOrganization
                      ? "Verifying..."
                      : organizationVerified
                      ? "Verified"
                      : "Verify"}
                  </button>
                </div>
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
                const selected =
                  form.purposes.includes(
                    purpose
                  );

                return (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() =>
                      handlePurposeChange(
                        purpose
                      )
                    }
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      selected
                        ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">

                      <span>
                        {purpose}
                      </span>

                      {selected && (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      )}
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
                        (previous) =>
                          !previous
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
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-12 outline-none transition focus:border-cyan-400/50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
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

          {/* MESSAGES */}

          {(error || success) && (
            <div className="px-6 pt-6 sm:px-8">

              {error && (
                <div className="flex gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
                  <AlertCircle className="h-5 w-5 shrink-0" />

                  <span>
                    {error}
                  </span>
                </div>
              )}

              {success && (
                <div className="flex gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />

                  <span>
                    {success}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* FOOTER */}

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
              disabled={
                loading ||
                verifyingOrganization
              }
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
      </div>
    </main>
  );
}