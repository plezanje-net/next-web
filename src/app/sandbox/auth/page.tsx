"use client";

import LoginForm from "./_components/login-form";
import LogoutButton from "./_components/logout-button";
import { useAuthContext } from "../../components/auth-context";

function AuthPage() {
  const { loggedIn } = useAuthContext();

  if (loggedIn) {
    return <LogoutButton />;
  }

  return <LoginForm />;
}

export default AuthPage;
