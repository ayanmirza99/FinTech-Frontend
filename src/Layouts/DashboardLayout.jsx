import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full">
          <section className="w-full flex p-2 items-center justify-between border-b shadow-md">
            <div className="flex items-center gap-2 z-40 text-xl lg:text-3xl text-primary font-bold">
              <SidebarTrigger />
              <span className="md:hidden flex font-light font-custom text-lg text-primary">
                FinConnect
              </span>
            </div>
          </section>
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
