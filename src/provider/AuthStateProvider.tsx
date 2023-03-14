"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthAuthStateProviderContextType =
  | {
      isLoading: false;
      user: User;
      error: null;
    }
  | {
      isLoading: false;
      user: null;
      error: unknown;
    }
  | {
      isLoading: true;
      user: null;
      error: null;
    };

const AuthAuthStateProviderContext =
  createContext<AuthAuthStateProviderContextType | null>(null);

export type AuthAuthStateProviderProps = {
  children: React.ReactNode;
};

const AuthAuthStateProvider: React.FC<AuthAuthStateProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<AuthAuthStateProviderContextType>({
    isLoading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setValue({ isLoading: false, user, error: null });
      } else {
        setValue({ isLoading: false, user: null, error: true });
      }
    });
  }, []);

  console.log(value.isLoading, value.user);
  if (!value.isLoading && value.user != null && pathname === "/login") {
    router.push("/home");
    return null;
  }
  if (!value.isLoading && value.user == null && pathname !== "/login") {
    router.push("/login");
    return null;
  }

  if (value.isLoading) {
    return (
      <div className="fixed inset-0 grid bg-white place-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthAuthStateProviderContext.Provider value={value}>
      {children}
    </AuthAuthStateProviderContext.Provider>
  );
};

export default AuthAuthStateProvider;

export const useAuthState = () => {
  const context = useContext(AuthAuthStateProviderContext);
  if (context == null) {
    throw new Error();
  }
  return context;
};

export const useUser = () => {
  const authState = useAuthState();
  return authState.user;
};