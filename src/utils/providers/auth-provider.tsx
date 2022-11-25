import { createContext, useContext, useState } from "react";
import parseJwt from "../parse-jwt";

type AuthStatus = {
  loggedIn: boolean;
  token?: string;
  email?: string;
  roles: string[];
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
  if (token && status?.token !== token) {
    const { email, roles } = parseJwt(token);
    setStatus({ loggedIn: true, token, email, roles });
  }
  return (
    <AuthContext.Provider value={{ status }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
