import { createContext, useContext, useState } from "react";

type AuthStatus = {
  loggedIn: boolean;
  token?: string;
  email?: string;
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
    const tokenData = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    setStatus({ loggedIn: true, token, email: tokenData.email });
  }
  return (
    <AuthContext.Provider value={{ status }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
