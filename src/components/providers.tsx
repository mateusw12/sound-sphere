"use client";

import { PropsWithChildren } from "react";
import { AuthProvider } from "@/components/auth-context";

export function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
