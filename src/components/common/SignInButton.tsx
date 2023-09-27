"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  const clickHandler = () => {
    signIn("google");
  };

  return <button onClick={clickHandler}>구글 로그인</button>;
}
