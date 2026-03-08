import { getToken } from "@/lib/utils/auth";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const token = await getToken();

  return <NavbarClient hasToken={Boolean(token)} />;
}
