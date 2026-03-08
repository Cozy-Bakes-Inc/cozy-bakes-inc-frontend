import CartBreadcrumb from "./cart-breadcrumb";
import CartContent from "./cart-content";
import CartRecommendations from "./cart-recommendations";

type CartProps = {
  hasToken: boolean;
};

export default function Cart({ hasToken }: CartProps) {
  return (
    <>
      <CartBreadcrumb />
      <CartContent hasToken={hasToken} />
      <CartRecommendations />
    </>
  );
}
