import {
  ArrowLeftRight,
  BarChart3,
  Book,
  GitGraph,
  LayoutDashboard,
  RectangleEllipsis,
  ScrollText,
  UsersRound,
  Wallet,
} from "lucide-react";

export const devMenu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dev/dashboard" },
  { title: "Balance", icon: Wallet, path: "/dev/balance" },
  {
    title: "Transfer",
    icon: RectangleEllipsis,
    path: "/dev/transfer",
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    path: "/dev/transactions",
  },
  {
    title: "Invoice",
    icon: ScrollText,
    path: "/dev/invoice",
  },
  {
    title: "Documentation",
    icon: Book,
    path: "/dev/documentation",
  },
];

export const adminMenu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Users", icon: UsersRound, path: "/admin/users" },
  { title: "API Logs", icon: BarChart3, path: "/admin/api-logs" },
];
