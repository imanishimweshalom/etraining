import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}