"use client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { gql, useMutation } from "urql";
import { LoginDocument } from "../../../graphql/generated";
import { useAuth } from "../../../utils/providers/auth-provider";

function Auth() {
  const router = useRouter();
  const [, loginMutation] = useMutation(LoginDocument);
  const [loggingIn, setLoggingIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const logoutHandler = () => {
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    router.reload();
  };

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoggingIn(true);
    const result = await loginMutation(formData);
    setLoggingIn(false);
    if (result.data && !result.error) {
      document.cookie = `token=${result.data.login.token ?? ""}; path=/`;
      router.reload();
    }
  };

  const changeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const authCtx = useAuth();

  if (authCtx.status) {
    return (
      <div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={loginHandler}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Uporabniško ime"
            value={formData.email}
            onChange={changeHandler}
            disabled={loggingIn}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Geslo"
            onChange={changeHandler}
            disabled={loggingIn}
          />
        </div>
        <button disabled={loggingIn}>Login</button>
      </form>
    </>
  );
}

gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
        fullName
        firstname
        lastname
        gender
        roles
      }
    }
  }
`;

export default Auth;
