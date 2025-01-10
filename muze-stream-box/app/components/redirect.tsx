"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session.status === "unauthenticated") router.push("/");
    if (session.status === "authenticated" && pathname === "/")
      router.push("/dashboard");
  }, [session, router, pathname]);
  return null;
};

export default Redirect;
