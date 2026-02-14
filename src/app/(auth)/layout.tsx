import { AuthLayoutContent } from "@/layout/auth/auth-layout-content";
import { type ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
}
