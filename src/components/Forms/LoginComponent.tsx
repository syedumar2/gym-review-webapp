"use client";

import { login, LoginResponse } from "@/app/login/actions";
import { LoginInput, LoginSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Logo from "../Buttons/Logo";
import Socials from "../Buttons/Socials";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider!"
      : "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    console.log("Sign In data:", data);
    setLoading(true);
    try {
      const res: LoginResponse = await login(data);
      if (res.success) {
        toast.success(res.message);
      } else {
        setError(res.error || "Something went wrong");
        toast.error(res.error);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
                {...register("email")}
                className="form-input"
                disabled={loading}
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
                {...register("password")}
                className="form-input"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <p className="text-red text-sm pt-1">{errors.password.message}</p>
            )}
          </div>

          {urlError && (
            <div
              className="flex justify-center items-center gap-3 mt-4 w-full max-w-sm rounded-md 
               bg-red-100 border border-red-300 text-red-700 
               dark:bg-red-950 dark:border-red-800 dark:text-red-200
               px-4 py-3 text-sm text-center shadow-sm transition-colors"
            >
              <TriangleAlert size={18} />
              {urlError}
            </div>
          )}
          {error && (
            <div
              className="flex justify-center items-center gap-3 mt-4 w-full max-w-sm rounded-md 
               bg-red-100 border border-red-300 text-red-700 
               dark:bg-red-950 dark:border-red-800 dark:text-red-200
               px-4 py-3 text-sm text-center shadow-sm transition-colors"
            >
              <TriangleAlert size={18} />
              {error}
            </div>
          )}
          {/* Submit */}
          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white 
    ${
      loading
        ? "bg-secondary/95 cursor-not-allowed"
        : "bg-secondary hover:bg-secondary-dark"
    } 
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="w-4 h-4 animate-spin" /> Logging
                  in...
                </span>
              ) : (
                "Log in"
              )}
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
        <Socials />

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
