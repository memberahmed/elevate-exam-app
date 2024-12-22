"use client";

import { createContext, ReactElement, useState, ReactNode } from "react";

interface ForgetPasswordContextType {
  forgetFormIsShown: boolean;
  setForgetFormIShown: React.Dispatch<React.SetStateAction<boolean>>;
  verfiyForm: boolean;
  setVerfiyForm: React.Dispatch<React.SetStateAction<boolean>>;
  PasswordForm: boolean;
  SetPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForgetPasswordContext = createContext<ForgetPasswordContextType | null>(null);

interface ForgetPasswordContextProviderProps {
  children: ReactNode;
}

export default function ForgetPasswordContextProvider({
  children,
}: ForgetPasswordContextProviderProps): ReactElement {
  const [hello, setHello] = useState<string>("hello");
  const [forgetFormIsShown, setForgetFormIShown] = useState<boolean>(true);
  const [verfiyForm, setVerfiyForm] = useState<boolean>(false);
  const [PasswordForm, SetPasswordForm] = useState<boolean>(false);

  return (
    <ForgetPasswordContext.Provider
      value={{
        forgetFormIsShown,
        setForgetFormIShown,
        verfiyForm,
        setVerfiyForm,
        PasswordForm,
        SetPasswordForm,
      }}
    >
      {children}
    </ForgetPasswordContext.Provider>
  );
}
