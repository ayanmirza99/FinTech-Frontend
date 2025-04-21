import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <header className="sticky p-2 md:p-4 top-0 z-50 w-full border-b bg-background">
        <div className="ml-2 md:ml-[7%] flex">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-light font-custom text-2xl text-primary">
              FinConnect
            </span>
          </a>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default AuthLayout;
