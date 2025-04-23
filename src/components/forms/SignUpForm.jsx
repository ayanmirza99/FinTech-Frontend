import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/config/yup";
import CustomTextField from "../textField";
import { Form } from "../ui/form";
import { Facebook, Github } from "lucide-react";
import CustomSelectField from "../selectField";
import { USER_ROLES } from "@/constants";
import { SIGN_UP } from "@/api/apiDeclaration";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  const form = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = async (body) => {
    try {
      let resp = await SIGN_UP(body);
      toast.success(resp.message);
      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="my-6 w-full max-w-xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-3xl text-center font-bold text-black/70 dark:text-neutral-200">
        Sign Up to
        <br />{" "}
        <span className="font-custom  text-primary/90 font-light">
          FinConnect
        </span>
      </h2>
      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-2 mb-2">
            <CustomTextField
              control={form.control}
              name="email"
              label={"Email"}
              type="email"
              placeholder="ayan@mail.com"
            />
            <CustomTextField
              control={form.control}
              name="username"
              label={"Username"}
              type="text"
              placeholder="tonyStark"
            />
            <CustomTextField
              control={form.control}
              name="fullName"
              label={"Full Name"}
              type="text"
              placeholder="Ayan Mirza"
            />
            <CustomSelectField
              optionsArray={USER_ROLES}
              control={form.control}
              name="role"
              label={"Role"}
            />
            <CustomTextField
              control={form.control}
              name="password"
              label={"Password"}
              type="password"
              placeholder="*******"
            />
            <CustomTextField
              control={form.control}
              name="confirmPassword"
              label={"Confirm Password"}
              type="password"
              placeholder="*******"
            />
          </div>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-primary to-primary/60 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground to-transparent dark:via-neutral-700" />
          <div className="w-full flex justify-center items-center gap-2 my-4">
            <span className="text-sm text-muted-foreground dark:text-neutral-500">
              Already have an account?{" "}
            </span>
            <span>
              <Link to={"/login"} className="text-sm text-primary/90 font-medium">Sign in &rarr;</Link>

            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
