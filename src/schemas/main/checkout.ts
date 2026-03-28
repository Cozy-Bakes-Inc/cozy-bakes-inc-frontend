import { z } from "zod";

export const checkoutProductSchema = z.object({
  slug: z.string().trim().min(1, "Product slug is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const checkoutSchema = z
  .object({
    fulfillment_type: z.enum(["delivery", "pickup"]),
    payment_method: z.enum(["stripe", "cod"]),
    cod_payment_method: z
      .enum(["cash", "zelle", "venmo", "apple_pay", "cash_app"])
      .optional(),
    shop_id: z.number().int().positive().optional(),
    note: z.string().trim().optional(),
    products: z
      .array(checkoutProductSchema)
      .min(1, "Your cart must contain at least one product"),
  })
  .superRefine((value, ctx) => {
    if (value.fulfillment_type === "pickup" && !value.shop_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["shop_id"],
        message: "Pickup location is required",
      });
    }

    if (value.payment_method === "cod" && !value.cod_payment_method) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cod_payment_method"],
        message: "Cash payment method is required",
      });
    }
  });

export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
