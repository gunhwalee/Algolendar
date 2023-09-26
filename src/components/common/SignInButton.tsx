"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  const clickHandler = () => {
    signIn("google");
  };

  return <button onClick={clickHandler}>Sign in with Google</button>;
}
