import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

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
