import Account, {
  normalizeAccountOrderNumber,
  normalizeAccountTab,
} from "@/components/main/account";

type AccountPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
    "order-number"?: string | string[];
    order_number?: string | string[];
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab, "order-number": orderNumberHyphen, order_number: orderNumberUnderscore } = await searchParams;
  const orderNumber = orderNumberHyphen ?? orderNumberUnderscore;
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
