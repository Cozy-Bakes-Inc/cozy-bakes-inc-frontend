import Cart from "@/components/main/cart/cart-view";
import { getToken } from "@/lib/utils/auth";

async function CartPage() {
  const token = await getToken();

  return <Cart hasToken={Boolean(token)} />;
}

export default CartPage;
