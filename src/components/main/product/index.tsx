import ProductBreadcrumb from "./product-breadcrumb";
import ProductDetails from "./product-details";
import ProductTabs from "./product-tabs";
import ProductRecommendations from "./product-recommendations";

export default function Product() {
  return (
    <>
      <ProductBreadcrumb />
      <ProductDetails />
      <ProductTabs />
      <ProductRecommendations />
    </>
  );
}
