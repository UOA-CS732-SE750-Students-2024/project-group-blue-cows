"use client";
import "client-only";
import { createContext, useState, useEffect, ReactNode } from "react";
import { getUser } from "@/services/authServices";
import { User } from "next-auth";

const defaultAuthState = {
  // Change me
  user: null,
  token: null,
  currentUser: undefined as User | undefined,
  login: () => {},
  logout: () => {},
};

export const authContext =
  createContext<typeof defaultAuthState>(defaultAuthState);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(defaultAuthState);

  useEffect(() => {
    getUser().then((session) => {
      setAuth((prevAuth) => ({ ...prevAuth, currentUser: session?.user }));
    });
  }, []); // empty dependency array, will only run on component mount

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
