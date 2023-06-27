"use client";
import { useRouter } from "next/navigation";
import logoutAction from "./logout-action";

function LogoutButton() {
  const router = useRouter();

  const logoutHandler = async () => {
    await logoutAction();
    router.refresh();
  };

  return <button onClick={logoutHandler}>Logout</button>;
}

export default LogoutButton;
