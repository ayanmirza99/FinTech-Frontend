import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";

export default function HomeRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path={"/"} element={<Dashboard />} />
        <Route path="*" element={<Navigate to={`/`} replace />} />
      </Route>
    </Routes>
  );
}
