import { z } from "zod";

const flavorSchema = z.object({
  name: z.string().trim().min(1, "Flavor name is required"),
  qty: z.number().int().min(1, "Flavor quantity must be at least 1"),
});

export const checkoutProductSchema = z.object({
  slug: z.string().trim().min(1, "Product slug is required"),
  price_id: z.number().int().positive("Price ID is required").optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  meta: z
    .object({
      flavors: z.array(flavorSchema).optional(),
    })
    .optional(),
});

const baseCheckoutSchema = z.object({
  payment_method: z.enum(["stripe", "cod"]),
  cod_payment_method: z
    .enum(["cash", "zelle", "venmo", "apple_pay", "cash_app"])
    .optional(),
  note: z.string().trim().optional(),
  products: z
    .array(checkoutProductSchema)
    .min(1, "Your cart must contain at least one product"),
});

export const checkoutSchema = z
  .discriminatedUnion("fulfillment_type", [
    baseCheckoutSchema.extend({
      fulfillment_type: z.literal("delivery"),
      shipping_rate_id: z
        .string({ error: "Please select a shipping method" })
        .trim()
        .min(1, "Please select a shipping method"),
    }),
    baseCheckoutSchema.extend({
      fulfillment_type: z.literal("pickup"),
      shop_id: z
        .number({ error: "Pickup location is required" })
        .int()
        .positive("Pickup location is required"),
    }),
  ])
  .superRefine((value, ctx) => {
    if (value.payment_method === "cod" && !value.cod_payment_method) {
      ctx.addIssue({
        code: "custom",
        path: ["cod_payment_method"],
        message: "Cash payment method is required",
      });
    }
  });

export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
