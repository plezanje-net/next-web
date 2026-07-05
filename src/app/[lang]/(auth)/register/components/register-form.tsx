"use client";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import registerAction from "../lib/register-action";

type TRegisterFormProps = {
  returnTo?: string;
};

function RegisterForm({ returnTo }: TRegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
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
    if (password && password.length < 8) {
      setPasswordError("Geslo mora biti dolgo vsaj 8 znakov.");
    }
    if (!firstName) {
      setFirstNameError("Ime je obvezen podatek.");
    }
    if (!lastName) {
      setLastNameError("Priimek je obvezen podatek.");
    }

    if (!email || !password || !firstName || !lastName) {
      return;
    }

    setLoading(true);
    setGeneralError("");
    const registerResponse = await registerAction({
      email,
      password,
      firstName,
      lastName,
      gender: gender === "other" ? null : (gender as "F" | "M"),
      returnTo,
    });

    if (registerResponse.success) {
      router.push("/registracija/poslano");
    } else {
      if (registerResponse.error === "account_exists") {
        setGeneralError("Račun s tem e-naslovom že obstaja.");
      } else {
        setGeneralError("Prišlo je do napake. Poskusite znova pozneje.");
      }
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
          autocomplete="new-password"
        />
      </div>

      <div className="mt-6">
        <TextField
          label="Ime"
          name="firstName"
          value={firstName}
          onChange={(value) => setFirstName(value)}
          errorMessage={firstNameError}
          disabled={loading}
          autocomplete="given-name"
        />
      </div>

      <div className="mt-6">
        <TextField
          label="Priimek"
          name="lastName"
          value={lastName}
          onChange={(value) => setLastName(value)}
          errorMessage={lastNameError}
          disabled={loading}
          autocomplete="family-name"
        />
      </div>

      <div className="mt-6">
        <RadioGroup
          label="Spol"
          name="gender"
          value={gender}
          onChange={(value) => setGender(value)}
          inline
          disabled={loading}
        >
          <Radio value="F">Ženski</Radio>
          <Radio value="M">Moški</Radio>
          <Radio value="other ">Drugo</Radio>
        </RadioGroup>
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
        Registriraj se
      </Button>
    </form>
  );
}

export default RegisterForm;
