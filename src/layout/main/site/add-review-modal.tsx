"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import InputErrorMessage from "@/components/ui/input-error-message";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modal";
import RatingInputStars from "@/components/ui/rating-input-stars";
import {
  testimonialsSchema,
  type TestimonialsSchemaValues,
} from "@/schemas/main";
import { reviewAPI } from "@/services/mutations";
import type { ApiResult, ErrorBody } from "@/types";

type AddReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitReview?: (
    payload: TestimonialsSchemaValues,
  ) => Promise<ApiResult<unknown, ErrorBody>>;
  invalidateQueryKeys?: readonly unknown[][];
};

const defaultValues: TestimonialsSchemaValues = {
  rating: 0,
  review_text: "",
};

export default function AddReviewModal({
  open,
  onClose,
  onSubmitReview,
  invalidateQueryKeys = [["reviews"]],
}: AddReviewModalProps) {
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialsSchemaValues>({
    defaultValues,
  });

  const rating = useWatch({
    control,
    name: "rating",
  });

  const handleModalClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = async (data: TestimonialsSchemaValues) => {
    const parsed = testimonialsSchema.safeParse(data);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Invalid review data");
      return;
    }

    const result = await (onSubmitReview
      ? onSubmitReview(parsed.data)
      : reviewAPI(parsed.data));

    if (result?.ok) {
      toast.success(result?.message || "Review added successfully");
      await Promise.all(
        invalidateQueryKeys.map((queryKey) =>
          queryClient.invalidateQueries({
            queryKey,
          }),
        ),
      );
      handleModalClose();
      return;
    }

    toast.error(result?.message || "Failed to add review");
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      title="Add New Review"
      contentClassName="sm:max-w-2xl border-none"
      titleClassName="text-xl font-bold text-dark"
    >
      <div className="border-t border-black/6 px-6 py-6 sm:px-8 sm:py-8">
        <div className="">
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <p className="text-[16px] font-medium leading-6 text-dark">
                Rating
              </p>
              <div className="flex items-center gap-3">
                <Controller
                  name="rating"
                  control={control}
                  rules={{
                    validate: (value) => {
                      const result =
                        testimonialsSchema.shape.rating.safeParse(value);
                      return (
                        result.success || result.error.issues[0]?.message
                      );
                    },
                  }}
                  render={({ field }) => (
                    <RatingInputStars
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <span className="text-[18px] font-bold leading-7 text-chocolate">
                  {rating.toFixed(1)}
                </span>
              </div>
              <InputErrorMessage msg={errors.rating?.message} />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="review-text"
                className="text-[16px] font-medium leading-6 text-dark block"
              >
                Review Text
              </label>
              <textarea
                {...register("review_text", {
                  validate: (value) => {
                    const result =
                      testimonialsSchema.shape.review_text.safeParse(value);
                    return result.success || result.error.issues[0]?.message;
                  },
                })}
                id="review-text"
                placeholder="Enter customer review..."
                rows={5}
                className="min-h-36.5 w-full resize-none rounded-xl border border-border/60 bg-background px-4 py-3 text-base font-medium text-dark outline-none transition-colors placeholder:text-gray focus:border-primary"
              />
              <InputErrorMessage msg={errors.review_text?.message} />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-13.5 min-w-50.5 rounded-xl border border-primary bg-primary px-4 text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-primary/90"
              >
                {isSubmitting ? <Loader /> : "Add Review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
