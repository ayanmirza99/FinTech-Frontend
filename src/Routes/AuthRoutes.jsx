import AuthLayout from "@/Layouts/AuthLayout";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import { PricingPlans } from "@/pages/Pricing";
import SignUp from "@/pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route element={<AuthLayout />}>
        <Route path="*" element={<Navigate to={`/`} replace />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
