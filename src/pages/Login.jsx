import LoginForm from "@/components/forms/LogInForm";
import { Opulento } from "uvcanvas"
import React from "react";

const Login = () => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="w-full h-[4rem] md:md:h-[calc(100vh-100px)] md:w-1/2">
        {/* <div className="w-full h-full">
            <Opulento />
        </div> */}
      </div>
      <div className="w-full md:w-1/2 h-max md:h-[calc(100vh-100px)] flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
