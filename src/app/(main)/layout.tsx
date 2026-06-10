import Footer from "@/layout/main/footer";
import GlobalModals from "@/layout/main/global-modals";
import Navbar from "@/layout/main/navbar";
import { OfflineScreen } from "@/components/main/offline-screen";
import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <OfflineScreen />
      <Navbar />
      {children}
      <GlobalModals />
      <Footer />
    </>
  );
}

export default MainLayout;
