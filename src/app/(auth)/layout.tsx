import { type ReactNode } from "react";
import { AuthLayoutContent } from "@/components/layout/auth/auth-layout-content";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
}
