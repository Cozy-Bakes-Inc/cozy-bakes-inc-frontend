import Account, { normalizeAccountTab } from "@/components/main/account";

type AccountPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab } = await searchParams;
  const activeTab = normalizeAccountTab(tab);

  return <Account activeTab={activeTab} />;
}
