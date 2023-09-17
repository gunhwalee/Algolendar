"use client";

import Image from "next/image";
import googleLogo from "@/../public/google-logo.png";

export default function SignInButton() {
  return (
    <button className="w-full flex justify-center items-center h-14 border border-black rounded-lg">
      <Image src={googleLogo} alt="google-logo" width={30} />
      <span className="ml-2">Sign in with Google</span>
    </button>
  );
}
