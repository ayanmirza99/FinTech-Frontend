import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  GitGraph,
  Key,
  BarChart3,
  FileText,
  User,
  LogOut,
  Mail,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/redux/features/auth/slice";
import { adminMenu, devMenu } from "@/config/navConfig";
import { constants, USER_ROLES } from "@/constants";

export function AppSidebar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = window.location.pathname;
  const dispatch = useDispatch();

  const onSignout = () => {
    dispatch(signOut());
  };

  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1 rounded">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-light font-custom text-lg text-primary">
            FinConnect
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex mt-10 p-2 flex-col space-y-6">
              {user?.role === constants.DEVELOPER
                ? devMenu.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="py-6"
                        isActive={location === item.path}
                        onClick={() => navigate(item.path)}
                        tooltip={item.title}
                      >
                        <item.icon className="w-8 h-8" />
                        <span className="text-lg">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : adminMenu.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="py-6"
                        isActive={location === item.path}
                        onClick={() => navigate(item.path)}
                        tooltip={item.title}
                      >
                        <item.icon className="w-8 h-8" />
                        <span className="text-lg">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-2 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-14 px-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/default.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{user?.fullName}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.role}
                  </span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="" side="top">
            <DropdownMenuItem className="flex flex-col items-start gap-4 p-2 w-full">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-10 w-10">
                  {/* <AvatarImage src={user?.avatar} /> */}
                  <AvatarFallback>
                    {user?.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">Profile</span>
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
                    {user?.role?.toLowerCase() || "No role assigned"}
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
    </Sidebar>
  );
}
