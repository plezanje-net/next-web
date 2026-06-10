"use client";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import resetPasswordAction from "../lib/reset-password-action";
import Link from "@/components/ui/link";

type TForgotPasswordFormProps = {
  returnTo?: string;
  id: string;
  token: string;
};

function ResetPasswordForm({ returnTo, id, token }: TForgotPasswordFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(false);

  const handlePasswordChange = (value: string) => {
    setPasswordError("");
    setGeneralError(false);
    setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate form
    if (!password) {
      setPasswordError("Novo geslo je obvezen podatek.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Geslo mora biti dolgo vsaj 8 znakov.");
      return;
    }

    setLoading(true);

    const resetPasswordResponse = await resetPasswordAction({
      password,
      id,
      token,
    });

    if (resetPasswordResponse.success) {
      if (returnTo) {
        const params = new URLSearchParams();
        params.set("returnTo", returnTo);
        router.push(`/pozabljeno-geslo/uspeh?${params.toString()}`);
      } else {
        router.push("/pozabljeno-geslo/uspeh");
      }
    } else {
      setGeneralError(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      <TextField
        label="Novo geslo"
        name="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        errorMessage={passwordError}
        disabled={loading}
      />

      {generalError && (
        <div className="text-sm mt-2 text-red-500">
          Prišlo je do napake pri shranjevanju novega gesla. Poskusi ponovno{" "}
          <Link href="/forgot-password">
            sprožiti postopek za ponastavitev gesla
          </Link>
          . Če se napaka ponavlja, kontaktiraj podporo na{" "}
          <Link mailto href="mailto:info@plezanje.net">
            info@plezanje.net
          </Link>
          .
        </div>
      )}

      <Button
        className="justify-center mt-8"
        type="submit"
        disabled={loading}
        loading={loading}
      >
        Shrani geslo
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
