import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

export default function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setValid(true);
      }

      setReady(true);
    };

    void checkSession();
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />
      </main>
    );
  }

  if (!valid) {
    return <Navigate to="/forgot-password" replace />;
  }

  return <ForgotPassword />;
}