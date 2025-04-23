import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { constants } from "@/constants";
import DashboardLayout from "@/Layouts/DashboardLayout";
import LogsPanel from "@/pages/AdminDashboard/LogsPanel";
import UsersPanel from "@/pages/AdminDashboard/UsersPanel";
import BalancePanel from "@/pages/DevDashboard/BalancePanel";
import Dashboard from "@/pages/DevDashboard/Dashboard";
import Documentation from "@/pages/DevDashboard/Documentation";
import InvoicePanel from "@/pages/DevDashboard/InvoicePanel";
import TransactionsPanel from "@/pages/DevDashboard/TransactionsPanel";
import TransferPanel from "@/pages/DevDashboard/TransferPanel";
import { PricingPlans } from "@/pages/Pricing";
import { signOut } from "@/redux/features/auth/slice";
import { LogOut, Mail, Shield, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Route, Routes } from "react-router-dom";

export default function HomeRouter() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSignout = () => {
    dispatch(signOut());
  };
  return (
    <Routes>
      {user?.role === constants.ADMIN ? (
        <Route element={<DashboardLayout />}>
          <Route path={"/admin/dashboard"} element={<Dashboard />} />
          <Route path={"/admin/users"} element={<UsersPanel />} />
          <Route path={"/admin/api-logs"} element={<LogsPanel />} />
          <Route path={"/pricing"} element={<PricingPlans />} />
          <Route
            path="*"
            element={<Navigate to={`/admin/dashboard`} replace />}
          />
        </Route>
      ) : user?.subscription?.status === constants.IN_ACTIVE ? (
        <>
          <Route
            path={"/pricing"}
            element={
              <>
                <header className="sticky p-2 md:p-4 top-0 z-50 w-full flex border-b bg-background">
                  <div className="ml-2 md:ml-[7%] flex justify-between w-full">
                    <Link to="/" className="flex items-center space-x-2">
                      <span className="font-light font-custom text-2xl text-primary">
                        FinConnect
                      </span>
                    </Link>
                  </div>
                  <div className="p-2 md:mr-[7%] mr-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-4 justify-start h-4 px-4"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {user?.fullName[0].toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56"
                        align="center"
                        side="top"
                      >
                        <DropdownMenuItem className="flex flex-col items-start gap-4 p-2 w-full">
                          <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-10 w-10">
                              {/* <AvatarImage src={user?.avatar} /> */}
                              <AvatarFallback>
                                {user?.fullName?.charAt(0) || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                              <span className="font-medium text-sm">
                                Profile
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Account details
                              </span>
                            </div>
                          </div>

                          <div className="w-full ml-3 -mt-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {user?.fullName || "Not available"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {user?.email || "Not available"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm capitalize">
                                {user?.role?.toLowerCase() ||
                                  "No role assigned"}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600 focus:text-red-600"
                          onClick={onSignout}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </header>
                <PricingPlans />
              </>
            }
          />
          <Route path="*" element={<Navigate to={`/pricing`} replace />} />
        </>
      ) : (
        <Route element={<DashboardLayout />}>
          <Route path={"/dev/dashboard"} element={<Dashboard />} />
          <Route path={"/dev/balance"} element={<BalancePanel />} />
          <Route path={"/dev/transfer"} element={<TransferPanel />} />
          <Route path={"/dev/transactions"} element={<TransactionsPanel />} />
          <Route path={"/dev/invoice"} element={<InvoicePanel />} />
          <Route path={"/dev/documentation"} element={<Documentation />} />
          <Route path={"/pricing"} element={<PricingPlans />} />
          <Route
            path="*"
            element={<Navigate to={`/dev/dashboard`} replace />}
          />
        </Route>
      )}
    </Routes>
  );
}
