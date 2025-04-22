import LoginForm from "@/components/forms/LogInForm";
import React from "react";

const Login = () => {
  return (
    <div className="flex w-full md:flex-row flex-col-reverse">
      <div className="hidden md:flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-background relative w-1/2">
        <div className="w-full relative overflow-hidden h-full px-4">
          {/* <div className="absolute w-full bottom-20 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-background z-40" />
          <div className="absolute w-full top-0 h-72 md:h-full z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div> */}
        </div>
      </div>
      <div className="w-full md:w-1/2 h-max md:h-[calc(100vh-100px)] flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
