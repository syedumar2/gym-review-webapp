"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Logo from "../Buttons/Logo";


interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    console.log("Sign In data:", data);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-primary">
      {/* Logo & Heading */}
      <div className="flex flex-col items-center justify-center">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black-dark">
          Sign in to your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className="form-input"
              />
            </div>
            {errors.email && (
              <p className="text-red text-sm pt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-black-dark hover:text-black"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="form-input"
              />
            </div>
            {errors.password && (
              <p className="text-red text-sm pt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold text-white hover:bg-secondary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-black" />
          <span className="mx-3 text-gray-500 font-medium">Or</span>
          <hr className="flex-grow border-black" />
        </div>

        {/* Social Sign In */}
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="py-4 px-2  flex items-center justify-center gap-2"
          >
            <img width={21} height={21} src="/icons/google-icon.svg" />
            Continue with Google
          </Button>
          <Button
            variant="secondary"
            className="py-4 px-2  flex items-center justify-center gap-2"
          >
            <img width={22} height={22} src="/icons/github-mark.svg" />
            Continue with GitHub
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-black">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-black-dark hover:text-black"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
