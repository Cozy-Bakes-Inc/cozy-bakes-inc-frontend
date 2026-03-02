import Account, {
  normalizeAccountOrderId,
  normalizeAccountTab,
} from "@/components/main/account";

type AccountPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
    orderId?: string | string[];
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab, orderId } = await searchParams;
  const activeTab = normalizeAccountTab(tab);
  const activeOrderId = normalizeAccountOrderId(orderId);

  return <Account activeTab={activeTab} activeOrderId={activeOrderId} />;
}
