"use client";

import { FormEvent, useState } from "react";
import TextField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
import loginAction from "./login-action";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const changeHandler = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoggingIn(true);

    const response = await loginAction(formData);

    if (response) {
      router.refresh();
      return;
    }
    setLoggingIn(false);
    setError("Napaka pri prijavi");
  };

  return (
    <form onSubmit={loginHandler} className="max-w-sm">
      <div className="pt-2">
        <TextField
          label="Email"
          name="email"
          onChange={(value) => changeHandler("email", value)}
          value={formData.email}
          placeholder="Uporabniško ime"
          disabled={loggingIn}
        />
      </div>
      <div className="pt-2">
        <TextField
          label="Password"
          name="password"
          onChange={(value) => changeHandler("password", value)}
          value={formData.password}
          placeholder="Geslo"
          disabled={loggingIn}
          type="password"
        />
      </div>
      <div className="pt-2">
        <Button disabled={loggingIn} type="submit">
          Login
        </Button>
      </div>
      {error && <div className="pt-2 text-red-500">{error}</div>}
    </form>
  );
}

export default LoginForm;
