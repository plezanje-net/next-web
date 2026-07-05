"use client";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import loginAction from "../lib/login-action";
import Link from "@/components/ui/link";

type TLoginFormProps = {
  returnTo?: string;
};

function LoginForm({ returnTo }: TLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError("");
    setGeneralError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError("");
    setGeneralError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate form
    if (!email) {
      setEmailError("E-naslov je obvezen podatek.");
    }
    if (!password) {
      setPasswordError("Geslo je obvezen podatek.");
    }
    if (!email || !password) {
      return;
    }

    setLoading(true);
    setGeneralError("");
    const loginResponse = await loginAction({ email, password });

    if (loginResponse) {
      router.push(returnTo || "/");
    } else {
      setGeneralError("Račun ne obstaja ali pa je geslo napačno.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7">
      <div>
        <TextField
          label="E-naslov"
          name="email"
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailError}
          disabled={loading}
          autocomplete="username"
        />
      </div>

      <div className="mt-6">
        <TextField
          label="Geslo"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordError}
          disabled={loading}
          autocomplete="current-password"
        />
        <Link
          href={{
            pathname: "/pozabljeno-geslo",
            query: returnTo ? { returnTo } : {},
          }}
          className="mt-2 text-right block"
        >
          Pozabljeno geslo
        </Link>
      </div>

      {generalError && (
        <div className="mt-2 text-sm text-red-500">{generalError}</div>
      )}

      <Button
        className="w-full mt-8 justify-center"
        type="submit"
        disabled={loading}
        loading={loading}
      >
        Prijavi se
      </Button>
    </form>
  );
}

export default LoginForm;
