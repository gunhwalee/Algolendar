"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const clickHandler = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return <button onClick={clickHandler}>Log out</button>;
}
