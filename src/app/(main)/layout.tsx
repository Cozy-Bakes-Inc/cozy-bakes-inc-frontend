import Navbar from "@/components/layout/main/navbar";
import Footer from "@/components/layout/main/footer";
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
