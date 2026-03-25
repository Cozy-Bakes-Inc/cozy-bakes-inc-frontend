import type { AuthenticatedUser } from "@/interfaces";
import type { ReadonlyURLSearchParams } from "next/navigation";

function hasValue(value?: string | null) {
  return Boolean(value?.trim());
}

export function hasSavedCheckoutDetails(user?: AuthenticatedUser | null) {
  if (!user) return false;

  const hasReceiver =
    hasValue(user.receiver?.first_name) &&
    hasValue(user.receiver?.last_name) &&
    hasValue(user.receiver?.phone_number);

  const hasShipping = hasValue(user.shipping?.address_line);

  return hasReceiver && hasShipping;
}

export function getCheckoutPath(lastFulfillmentType?: string | null) {
  const fulfillmentType = getFulfillmentType(lastFulfillmentType);

  return `/checkout?fulfillment_type=${fulfillmentType}`;
}

export function getFulfillmentType(value?: string | null) {
  return value === "pickup" ? "pickup" : "delivery";
}

export function getFulfillmentTypeFromSearchParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
) {
  return getFulfillmentType(searchParams.get("fulfillment_type"));
}

export function getCheckoutUrlWithFulfillmentType(
  pathname: string,
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  fulfillmentType?: string | null,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("fulfillment_type", getFulfillmentType(fulfillmentType));

  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}
