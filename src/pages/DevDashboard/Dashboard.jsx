import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useSelector } from "react-redux";
import { constants } from "@/constants";
import UserSignupChart from "../AdminDashboard/SignUpChart";
import SubscriptionPieChart from "../AdminDashboard/SubscriptionPieChart";
import TransactionTrendChart from "./TransactionTrendChart";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    document.title = "Dashboard | FinConnect";
  }, []);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Developer Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and explore your financial APIs
            </p>
          </div>
          {user?.role === constants.DEVELOPER && (
            <div className="mt-4 md:mt-0 rounded-md flex items-center">
              <CopyButton
                text={user?._id}
                displayText="Copy Account ID"
                variant="outline"
              />
            </div>
          )}
        </div>
        {user?.role === constants.ADMIN ? (
          <div className="flex flex-col gap-6">
            <UserSignupChart />
            <SubscriptionPieChart />
          </div>
        ) : (
          <TransactionTrendChart />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
