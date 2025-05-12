"use client ";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { tree } from "next/dist/build/templates/app-page";
const Socials = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4 ">
      <Button
        variant={"outline"}
        className="flex gap-4 w-ful"
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: "/",
          })
        }
      >
        <p> Sign in with Google</p>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="flex gap-4 w-ful"
        variant={"outline"}
        onClick={() =>
          signIn("github", {
            redirect: true,
            callbackUrl: "/",
          })
        }
      >
        <p>Sign in with Github</p>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Socials;
