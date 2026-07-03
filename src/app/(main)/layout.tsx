import Footer from "@/layout/main/footer";
import GlobalModals from "@/layout/main/global-modals";
import Navbar from "@/layout/main/navbar";
import { OfflineScreen } from "@/components/main/offline-screen";
import { getToken } from "@/lib/utils/auth";
import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

async function MainLayout({ children }: MainLayoutProps) {
  const token = await getToken();

  return (
    <>
      <OfflineScreen />
      <Navbar />
      {children}
      <GlobalModals hasToken={Boolean(token)} />
      <Footer />
    </>
  );
}

export default MainLayout;
