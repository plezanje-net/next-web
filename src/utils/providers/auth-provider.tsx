import { createContext, useContext, useState } from "react";
import { gql, useQuery } from "urql";
import { ProfileDocument, User } from "@/graphql/generated";

type AuthStatus = {
  loggedIn: boolean;
  token?: string;
  user?: User;
};

export const AuthContext = createContext<{ status: AuthStatus | null }>({
  status: null,
});

export const AuthProvider = ({
  token,
  children,
}: {
  token: string;
  children: any;
}) => {
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [result] = useQuery({ query: ProfileDocument });

  if (token && status?.token !== token) {
    const { data } = result;
    setStatus({ loggedIn: true, token, user: data?.profile as User });
  }
  return (
    <AuthContext.Provider value={{ status }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

gql`
  query Profile {
    profile {
      id
      firstname
      lastname
      fullName
      email
      roles
    }
  }
`;
