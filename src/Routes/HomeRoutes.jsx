import { constants } from "@/constants";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import { PricingPlans } from "@/pages/Pricing";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

export default function HomeRouter() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      {user?.role === constants.ADMIN ? (
        <Route element={<DashboardLayout />}>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/pricing"} element={<PricingPlans />} />
          <Route path="*" element={<Navigate to={`/`} replace />} />
        </Route>
      ) : user?.subscription?.status === constants.IN_ACTIVE ? (
        <>
          <Route path={"/pricing"} element={<PricingPlans />} />
          <Route path="*" element={<Navigate to={`/pricing`} replace />} />
        </>
      ) : (
        <Route element={<DashboardLayout />}>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/pricing"} element={<PricingPlans />} />
          <Route path="*" element={<Navigate to={`/`} replace />} />
        </Route>
      )}
    </Routes>
  );
}
