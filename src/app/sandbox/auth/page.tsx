import authStatus from "@/utils/auth/auth-status";
import LoginForm from "./_components/login-form";
import LogoutButton from "./_components/logout-button";

async function Auth() {
  const { loggedIn } = await authStatus();
  if (loggedIn) {
    return <LogoutButton />;
  }

  return <LoginForm />;
}

export default Auth;
