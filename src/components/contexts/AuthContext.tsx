"use client";
import { createContext, useState, ReactNode } from "react";

const defaultAuthState = {
  // Change me
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
};

export const authContext =
  createContext<typeof defaultAuthState>(defaultAuthState);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(defaultAuthState);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
