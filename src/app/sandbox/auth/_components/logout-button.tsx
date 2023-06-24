"use client";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const logoutHandler = () => {
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    router.refresh();
  };

  return <button onClick={logoutHandler}>Logout</button>;
}

export default LogoutButton;
