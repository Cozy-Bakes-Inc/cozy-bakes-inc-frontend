import Account, {
  normalizeAccountOrderNumber,
  normalizeAccountTab,
} from "@/components/main/account";

type AccountPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
    orderNumber?: string | string[];
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab, orderNumber } = await searchParams;
  const activeTab = normalizeAccountTab(tab);
  const activeOrderNumber =
    activeTab === "new-order" ||
    activeTab === "cancel-order" ||
    activeTab === "complete-order"
      ? normalizeAccountOrderNumber(orderNumber)
      : undefined;

  return (
    <Account activeTab={activeTab} activeOrderNumber={activeOrderNumber} />
  );
}
