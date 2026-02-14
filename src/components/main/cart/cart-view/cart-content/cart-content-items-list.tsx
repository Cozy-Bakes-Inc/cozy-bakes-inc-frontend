import type { CartItem } from "@/store/cart-store";
import CartContentItemCard from "./cart-content-item-card";

type CartContentItemsListProps = {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function CartContentItemsList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartContentItemsListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartContentItemCard
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
}
