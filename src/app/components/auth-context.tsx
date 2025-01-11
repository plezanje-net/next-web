"use client";

import { User } from "@/graphql/generated";
import { ReactNode, createContext, useContext } from "react";

type TAuthContext = {
  currentUser: User | null;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

type TAuthProviderProps = {
  currentUser: User | null;
  children: ReactNode;
};

function AuthProvider({ children, currentUser }: TAuthProviderProps) {
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return authContext;
}

export { AuthProvider, useAuthContext };
