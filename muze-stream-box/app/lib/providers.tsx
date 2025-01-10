"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Redirect from "../components/redirect";
import { Toaster } from "../components/ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {" "}
      <Toaster />
      <Redirect />
      {children}
    </SessionProvider>
  );
};

export default Providers;
