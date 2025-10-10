import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="secondary"
        className="py-4 px-2  flex items-center justify-center gap-2"
        onClick={() => onClick("google")}
      >
        <img width={21} height={21} src="/icons/google-icon.svg" />
        Continue with Google
      </Button>
      <Button
        variant="secondary"
        className="py-4 px-2  flex items-center justify-center gap-2"
        onClick={() => onClick("github")}
      >
        <img width={22} height={22} src="/icons/github-mark.svg" />
        Continue with GitHub
      </Button>
    </div>
  );
};

export default Socials;
