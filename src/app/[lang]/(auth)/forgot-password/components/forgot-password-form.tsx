"use client";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { FormEvent, useState } from "react";
import forgotPasswordAction from "../lib/forgot-password-action";
import { useRouter } from "next/navigation";

type TForgotPasswordFormProps = {
  returnTo?: string;
};

function ForgotPasswordForm({ returnTo }: TForgotPasswordFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleEmailChange = (value: string) => {
    setEmailError("");
    setGeneralError("");
    setEmail(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate form
    if (!email) {
      setEmailError("E-naslov je obvezen podatek.");
      return;
    }

    setLoading(true);

    const forgotPassswordResponse = await forgotPasswordAction({
      email,
      returnTo,
    });

    if (forgotPassswordResponse.success) {
      router.push("/pozabljeno-geslo/poslano");
    } else {
      if (forgotPassswordResponse.error === "account_not_found") {
        setGeneralError("Račun s tem e-naslovom ne obstaja.");
      } else {
        setGeneralError("Prišlo je do napake.");
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      <TextField
        label="E-naslov"
        name="email"
        value={email}
        onChange={handleEmailChange}
        errorMessage={emailError}
        disabled={loading}
        autocomplete="username"
      />

      {generalError && (
        <div className="mt-2 text-sm text-red-500">{generalError}</div>
      )}

      <Button
        className="justify-center mt-8"
        type="submit"
        disabled={loading}
        loading={loading}
      >
        Ponastavi geslo
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
