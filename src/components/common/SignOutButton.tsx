"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const clickHandler = () => {
    signOut();
  };

  return <button onClick={clickHandler}>Log out</button>;
}
