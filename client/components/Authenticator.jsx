"use client";

import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const Authenticator = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!user && path !== "/login" && path !== "/signup") {
      // router.push("/login");
    }
  }, [user, path]);

  return <>{children}</>;
};
