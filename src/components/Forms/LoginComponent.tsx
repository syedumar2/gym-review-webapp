"use client";

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
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { signIn } from "next-auth/react";
import { validateLogin } from "@/app/login/actions";

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
    setLoading(true);
    setError("");
    try {
      // 1️⃣ Validate input server-side
      const validation = await validateLogin(data);
      if (!validation.success) {
        setError(validation.error || "Invalid fields!");
        toast.error(validation.error || "Invalid fields!");
        setLoading(false);
        return;
      }

      // 2️⃣ Sign in client-side
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials!");
        toast.error("Invalid credentials!");
      } else {
        toast.success("Login successful!");
        window.location.href = DEFAULT_LOGIN_REDIRECT; // full reload redirect
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Unexpected server error occurred.");
      toast.error("Unexpected server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-primary">
      <div className="flex flex-col items-center justify-center">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black-dark">
          Sign in to your account
        </h2>
      </div>

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

          {/* URL OAuth error */}
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

          {/* Login error */}
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

        <div className="flex items-center my-4">
          <hr className="flex-grow border-black" />
          <span className="mx-3 text-gray-500 font-medium">Or</span>
          <hr className="flex-grow border-black" />
        </div>

        <Socials />

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
    </section>
  );
}
