"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const clickHandler = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return <button onClick={clickHandler}>로그아웃</button>;
}
