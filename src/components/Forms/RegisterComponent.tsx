"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm, type SubmitHandler } from "react-hook-form";
import Logo from "../Buttons/Logo";
import { ApiResponse } from "@/types/api";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/signup/actions";
import { LoaderCircle } from "lucide-react";
import {
  RegistrationInput,
  registrationSchema,
} from "@/schemas/RegistrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Socials from "../Buttons/Socials";

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignupResponse = ApiResponse<{ id: string; email: string }>;

export default function SignUpForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange", // validate on change or "onTouched" for blur
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setLoading(true);
    try {
      const result: SignupResponse = await registerUser(data);

      if (result.success) {
        toast.success(result.message + " You can now login");
        router.push("/login");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Unexpected error occurred");
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
          Create a new account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                placeholder="Full Name"
                {...register("fullName")}
                autoComplete="name"
                className="form-input"
              />
            </div>
            {errors.fullName && (
              <p className="text-red text-sm pt-1">{errors.fullName.message}</p>
            )}
          </div>

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
                type="email"
                placeholder="Email"
                {...register("email")}
                className="form-input"
              />
            </div>
            {errors.email && (
              <p className="text-red text-sm pt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="form-input"
              />
            </div>
            {errors.password && (
              <p className="text-red text-sm pt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-black"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="form-input"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red text-sm pt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white 
    ${
      loading
        ? "bg-secondary/50 cursor-not-allowed"
        : "bg-secondary hover:bg-secondary-dark"
    } 
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="w-4 h-4 animate-spin" />{" "}
                  Registering...
                </span>
              ) : (
                "Sign Up"
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

        {/* Social Sign Up */}
        <Socials />

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
