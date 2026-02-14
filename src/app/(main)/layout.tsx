import Footer from "@/layout/main/footer";
import Navbar from "@/layout/main/navbar";
import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
