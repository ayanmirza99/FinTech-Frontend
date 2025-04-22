import Dashboard from "@/pages/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      {/* <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        </Route> */}
      <Route path="*" element={<Navigate to={`/`} replace />} />
    </Routes>
  );
}
