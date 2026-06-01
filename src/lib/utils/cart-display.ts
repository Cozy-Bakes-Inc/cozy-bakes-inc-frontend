/**
 * Resolves how a cart / order item should display its price label and flavors.
 *
 * Two modes:
 *  - Pack   (packQuantity > 1): flavors are a per-pack breakdown; the quantity
 *    counter means "number of packs", so we show raw counts and append "× qty"
 *    to the price label.
 *  - Per-unit (no packQuantity): price already encodes the full order cost;
 *    quantity means "number of orders of this combo", so we multiply each
 *    flavor count by quantity to show the real total.
 */
export function resolveCartDisplay(item: {
  flavors?: Record<string, number>;
  packQuantity?: number;
  quantity: number;
}) {
  const isPackMode = !!item.packQuantity && item.packQuantity > 1;

  const totalFlavorCount = item.flavors
    ? Object.values(item.flavors).reduce((a, b) => a + b, 0)
    : 0;

  const isPerUnitFlavor = !isPackMode && totalFlavorCount > 0;

  const flavorLines = item.flavors
    ? Object.entries(item.flavors)
        .filter(([, c]) => c > 0)
        .map(([label, count]) => ({
          label,
          count: isPackMode ? count : count * item.quantity,
        }))
    : [];

  /**
   * The quantity to display alongside the price label and in the Qty badge:
   *  - Pack      → number of packs ordered  (item.quantity)
   *  - Per-unit  → total items across all flavors (sum of flavor counts × orders)
   *  - No flavor → standard order quantity  (item.quantity)
   */
  const displayQuantity = isPackMode
    ? item.quantity
    : isPerUnitFlavor
      ? totalFlavorCount * item.quantity
      : item.quantity;

  return {
    flavorLines,
    isPerUnitFlavor,
    displayQuantity,
    /** True for packs and per-unit flavor items — both show "× N" on the label. */
    showQuantitySuffix: isPackMode,
  };
}
