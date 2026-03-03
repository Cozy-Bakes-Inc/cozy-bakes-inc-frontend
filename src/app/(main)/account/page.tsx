import Account, {
  normalizeAccountOrderId,
  normalizeAccountTab,
} from "@/components/main/account";
import type { AccountOrderListTab } from "@/types/main/account";

type AccountPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
    orderId?: string | string[];
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab, orderId } = await searchParams;
  const activeTab = normalizeAccountTab(tab);
  const activeOrderId =
    activeTab === "new-order" ||
    activeTab === "cancel-order" ||
    activeTab === "complete-order"
      ? normalizeAccountOrderId(activeTab as AccountOrderListTab, orderId)
      : undefined;

  return <Account activeTab={activeTab} activeOrderId={activeOrderId} />;
}
