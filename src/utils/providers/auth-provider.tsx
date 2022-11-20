import { createContext, useContext, useState } from "react";

type AuthStatus = {
  loggedIn: boolean;
  token?: string;
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
    setStatus({ loggedIn: true, token });
  }
  return (
    <AuthContext.Provider value={{ status }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
