"use client";

import LogoutButton from "./_components/logout-button";
import { useAuthContext } from "@/lib/auth/auth-context";

function AuthPage() {
  const { loggedIn } = useAuthContext();

  if (loggedIn) {
    return <LogoutButton />;
  }
}

export default AuthPage;
