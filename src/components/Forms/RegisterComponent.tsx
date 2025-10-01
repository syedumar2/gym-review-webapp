"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm, type SubmitHandler } from "react-hook-form";
import Logo from "../Buttons/Logo";

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const password = watch("password");

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log("Signup data:", data);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-primary">
      {/* Logo & Heading */}
      <div className="flex flex-col items-center justify-center">
    <Logo/>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black-dark">
          Create a new account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Full Name
            </label>
            <div className="mt-2">
              <input
                placeholder="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                autoComplete="name"
className="form-input"              />
            </div>
            {errors.fullName && (
              <p className="text-red text-sm pt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
className="form-input"              />
            </div>
            {errors.email && (
              <p className="text-red text-sm pt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
className="form-input"              />
            </div>
            {errors.password && (
              <p className="text-red text-sm pt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-black">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="form-input"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red text-sm pt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold text-white hover:bg-secondary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-black" />
          <span className="mx-3 text-gray-500 font-medium">Or</span>
          <hr className="flex-grow border-black" />
        </div>

        {/* Social Sign Up */}
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="py-4 px-2 flex items-center justify-center gap-2 !text-white !dark:text-white"
          >
            <img width={21} height={21} src="/icons/google-icon.svg" />
            Continue with Google
          </Button>
          <Button
            variant="secondary"
            className="py-4 px-2 flex items-center justify-center gap-2 !text-white !dark:text-white"
          >
            <img width={22} height={22} src="/icons/github-mark.svg" />
            Continue with GitHub
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-black">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-black-dark hover:text-black"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
