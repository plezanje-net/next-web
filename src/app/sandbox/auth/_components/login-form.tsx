"use client";

import { FormEvent, useState, useTransition } from "react";
import TextField from "../../../../components/ui/text-field";
import Button from "../../../../components/ui/button";
import { SSRProvider } from "react-aria";
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
    <SSRProvider>
      <form onSubmit={loginHandler} className="max-w-sm">
        <div className="pt-2">
          <TextField
            label="Email"
            name="email"
            onChange={(value) => changeHandler("email", value)}
            value={formData.email}
            placeholder="Uporabniško ime"
            isDisabled={loggingIn}
          />
        </div>
        <div className="pt-2">
          <TextField
            label="Password"
            name="password"
            onChange={(value) => changeHandler("password", value)}
            value={formData.password}
            placeholder="Geslo"
            isDisabled={loggingIn}
            type="password"
          />
        </div>
        <div className="pt-2">
          <Button isDisabled={loggingIn}>Login</Button>
        </div>
        {error && <div className="pt-2 text-red-500">{error}</div>}
      </form>
    </SSRProvider>
  );
}

export default LoginForm;
