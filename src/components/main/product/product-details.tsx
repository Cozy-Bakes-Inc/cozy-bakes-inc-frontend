"use client";

import { Image } from "@/components/ui/app-image";
import { useState, useMemo, useRef } from "react";
import {
  MoveRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Counter from "@/components/ui/counter";
import RatingStars from "@/components/ui/rating-stars";
import AddReviewModal from "@/layout/main/site/add-review-modal";
import { productReviewAPI } from "@/services/mutations";
import { useCartStore, MAX_CART_ITEM_QUANTITY } from "@/store/cart-store";
import type { ApiProductItem, ProductPriceOption } from "@/interfaces";

type ProductDetailsProps = {
  product?: ApiProductItem;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const productTitle = product?.title ?? "Product";
  const productDescription =
    product?.description ?? "No description available.";
  const productRating = Number(product?.rating ?? 0);
  const productSlug = product?.slug;
  const flavors = product?.flavors ?? [];
  const hasFlavors = flavors.length > 0;

  const allPriceOptions: ProductPriceOption[] = useMemo(() => {
    if (!product?.prices) return [];
    return Object.values(product.prices)
      .flat()
      .filter((opt): opt is ProductPriceOption => !!opt);
  }, [product]);

  const hasPricing = allPriceOptions.length > 0;

  const [selectedOption, setSelectedOption] =
    useState<ProductPriceOption | null>(() => allPriceOptions[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(flavors.map((f) => [f, 0])),
  );
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const packIdRef = useRef(0);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const optionQty = Number(selectedOption?.quantity ?? 1);
  const isPackMode = hasFlavors && hasPricing && optionQty > 1;
  const selectedPrice = Number(
    selectedOption?.price ?? product?.final_price ?? product?.price ?? 0,
  );
  const fallbackPrice = Number(product?.final_price ?? product?.price ?? 0);
  const originalPrice = Number(product?.price ?? 0);

  const totalFlavorsSelected = Object.values(flavorCounts).reduce(
    (a, b) => a + b,
    0,
  );
  const isFlavorsComplete = isPackMode
    ? totalFlavorsSelected === optionQty
    : totalFlavorsSelected > 0;

  const totalPrice = isPackMode
    ? selectedPrice
    : totalFlavorsSelected * selectedPrice;

  const showFlavorPicker = hasFlavors && hasPricing && !!selectedOption;
  const images = product?.images?.length
    ? product.images.map((src, i) => ({
        src,
        alt: `${productTitle} image ${i + 1}`,
      }))
    : [
        {
          src: product?.image || "/images/artisan-sourdough.jpg",
          alt: productTitle,
        },
      ];

  const hasMultipleImages = images.length > 1;

  const handlePrev = () =>
    setActiveImageIndex((i) => (i - 1 + images.length) % images.length);
  const handleNext = () => setActiveImageIndex((i) => (i + 1) % images.length);

  const activeFlavors = showFlavorPicker
    ? Object.fromEntries(Object.entries(flavorCounts).filter(([, c]) => c > 0))
    : undefined;

  const productBaseId = String(product?.slug ?? product?.id ?? productTitle);
  const priceOptionId = selectedOption ? `_${selectedOption.id}` : "";

  // For per-unit flavor items the cart price is (unitPrice × totalSelected)
  // so that incrementing quantity in cart means "one more full order of this selection".
  const cartPrice =
    showFlavorPicker && !isPackMode
      ? totalFlavorsSelected * selectedPrice
      : selectedPrice || fallbackPrice;

  const cartProduct = {
    id: `${productBaseId}${priceOptionId}`,
    slug: product?.slug,
    price_id: selectedOption
      ? (selectedOption.price_id ?? Number(selectedOption.id))
      : undefined,
    title: productTitle,
    price: cartPrice,
    unitPrice: showFlavorPicker && !isPackMode ? selectedPrice : undefined,
    image: images[0]?.src ?? "",
    priceLabel: selectedOption?.label,
    priceType: selectedOption?.type,
    packQuantity: isPackMode ? optionQty : undefined,
    flavors: activeFlavors,
  };

  const handleSelectOption = (option: ProductPriceOption) => {
    setSelectedOption(option);
    setFlavorCounts(Object.fromEntries(flavors.map((f) => [f, 0])));
  };

  const handleFlavorCount = (flavor: string, value: number) => {
    setFlavorCounts((prev) => ({ ...prev, [flavor]: value }));
  };

  const handleAddToCart = () => {
    const qty = showFlavorPicker ? 1 : quantity;
    // Each pack is a separate line item — give it a unique ID at click time
    const id = isPackMode
      ? `${cartProduct.id}_${++packIdRef.current}`
      : cartProduct.id;
    addItem({ ...cartProduct, id, quantity: qty });
    openCart();
    setFlavorCounts(Object.fromEntries(flavors.map((f) => [f, 0])));
    setQuantity(1);
  };

  const getMaxForFlavor = (flavor: string) => {
    if (!isPackMode) return MAX_CART_ITEM_QUANTITY;
    const count = flavorCounts[flavor] ?? 0;
    const remaining = optionQty - totalFlavorsSelected;
    return count + Math.max(0, remaining);
  };

  return (
    <section className="bg-bg-creamy py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-10 lg:grid-cols-2 lg:items-start">
        {/* LEFT — image + price option cards */}
        <div className="space-y-4 lg:sticky lg:top-8">
          {/* Main image */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-sm">
            <Image
              src={images[activeImageIndex]!.src}
              alt={images[activeImageIndex]!.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-opacity duration-300"
              priority
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5 text-secondary" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow backdrop-blur-sm transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5 text-secondary" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeImageIndex
                          ? "w-5 bg-white"
                          : "w-2 bg-white/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {hasMultipleImages && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-20 sm:w-20 ${
                    idx === activeImageIndex
                      ? "border-primary"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Price option radio cards */}
          {hasPricing && (
            <div className="space-y-2">
              {allPriceOptions.map((option) => {
                const isSelected = selectedOption?.id === option.id;
                const qty = Number(option.quantity ?? 1);
                const unitLabel = qty > 1 ? "per pack" : "each";

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                      isSelected
                        ? "border-primary/30 bg-primary/5"
                        : "border-secondary/10 bg-background hover:bg-bg-creamy"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected ? "border-primary" : "border-secondary/30"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        )}
                      </span>
                      <div>
                        <span className="text-sm font-semibold capitalize text-secondary">
                          {option.label}
                        </span>
                        {qty > 1 && (
                          <p className="text-xs text-secondary/50">
                            Pack of {qty}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      ${Number(option.price ?? 0).toFixed(2)}{" "}
                      <span className="text-xs font-normal text-secondary/50">
                        {unitLabel}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT — title, review, flavors, add to cart */}
        <div className="min-w-0 rounded-3xl bg-background p-6 shadow-sm sm:p-8">
          <div className="space-y-5">
            {/* Title, description & rating */}
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold capitalize tracking-tight text-secondary sm:text-4xl">
                {productTitle}
              </h1>
              <p className="wrap-break-word text-sm leading-7 text-gray sm:text-base">
                {productDescription}
              </p>
              <div className="flex items-center gap-2">
                <RatingStars value={productRating} />
                <span className="text-sm text-gray">
                  ({productRating.toFixed(1)})
                </span>
              </div>
            </div>

            {/* Add review box */}
            <div className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-secondary">
                  Share your experience
                </p>
                <p className="mt-1 text-xs leading-5 text-gray sm:text-sm">
                  Tried this item before? Add your review to help other
                  customers.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddReviewOpen(true)}
                className="h-10 shrink-0 rounded-full border-primary bg-background px-5 text-sm font-semibold text-primary hover:bg-primary/5 hover:text-secondary"
              >
                <span>Add Review</span>
                <MoveRight className="size-4" />
              </Button>
            </div>

            {/* Flavor picker */}
            {showFlavorPicker ? (
              <div className="space-y-1">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-secondary/50">
                  Choose your flavor
                </h3>

                <div className="max-h-85 divide-y divide-secondary/5 overflow-y-auto overscroll-contain pr-2 sm:max-h-105 lg:max-h-[38vh]">
                  {flavors.map((flavor) => {
                    const count = flavorCounts[flavor] ?? 0;
                    return (
                      <div
                        key={flavor}
                        className="flex items-center justify-between py-2.5"
                      >
                        <span className="text-sm font-medium capitalize text-secondary">
                          {flavor}
                        </span>
                        <Counter
                          value={count}
                          onChange={(val) => handleFlavorCount(flavor, val)}
                          min={0}
                          max={getMaxForFlavor(flavor)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Summary bar */}
                {isFlavorsComplete ? (
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-green-700">
                          {totalFlavorsSelected}{" "}
                          {totalFlavorsSelected === 1 ? "item" : "items"}{" "}
                          selected
                        </p>
                        {!isPackMode && (
                          <p className="text-xs text-green-600">
                            {totalFlavorsSelected} × ${selectedPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-secondary/50">Total</p>
                      <p className="text-sm font-bold text-primary">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="mb-2 h-px bg-secondary/10" />
                    <div className="flex items-center justify-between px-1 py-1 text-sm">
                      <span className="text-secondary/50">
                        {isPackMode
                          ? `${totalFlavorsSelected} of ${optionQty} selected`
                          : totalFlavorsSelected > 0
                            ? `${totalFlavorsSelected} selected`
                            : "Pick your flavors"}
                      </span>
                      <span className="font-semibold text-primary">
                        Total ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : hasPricing ? (
              /* Has pricing but no flavors — qty counter */
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-secondary/10 bg-bg-creamy px-4 py-3">
                <p className="text-xl font-semibold text-primary">
                  ${selectedPrice.toFixed(2)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-dark">Qty:</span>
                  <Counter
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={MAX_CART_ITEM_QUANTITY}
                  />
                </div>
              </div>
            ) : (
              /* No pricing at all */
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-secondary/10 bg-bg-creamy px-4 py-3">
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-semibold text-primary">
                    ${fallbackPrice.toFixed(2)}
                  </p>
                  {originalPrice > fallbackPrice && (
                    <span className="text-sm font-medium text-[#F04438] line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-dark">Qty:</span>
                  <Counter
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={MAX_CART_ITEM_QUANTITY}
                  />
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              className="h-auto min-h-11 w-full whitespace-normal rounded-3xl bg-primary px-4 py-3 text-center text-sm font-semibold leading-5 text-white hover:bg-card/90 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-full sm:px-6"
              onClick={handleAddToCart}
              disabled
            >
              <CalendarDays className="size-4 shrink-0" />
              <span>Online ordering available in October 2026</span>
            </Button>
          </div>
        </div>
      </div>

      {productSlug ? (
        <AddReviewModal
          open={isAddReviewOpen}
          onClose={() => setIsAddReviewOpen(false)}
          onSubmitReview={(payload) => productReviewAPI(productSlug, payload)}
          invalidateQueryKeys={[["singleProduct", productSlug], ["reviews"]]}
        />
      ) : (
        <AddReviewModal
          open={isAddReviewOpen}
          onClose={() => setIsAddReviewOpen(false)}
        />
      )}
    </section>
  );
}
