"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Redirect from "../components/redirect";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {" "}
      <Redirect />
      {children}
    </SessionProvider>
  );
};

export default Providers;
