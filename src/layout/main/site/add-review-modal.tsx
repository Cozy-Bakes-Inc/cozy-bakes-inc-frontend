"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import RatingInputStars from "@/components/ui/rating-input-stars";

type AddReviewModalProps = {
  open: boolean;
  onClose: () => void;
  rating: number;
  reviewText: string;
  onRatingChange: (rating: number) => void;
  onReviewTextChange: (value: string) => void;
};

export default function AddReviewModal({
  open,
  onClose,
  rating,
  reviewText,
  onRatingChange,
  onReviewTextChange,
}: AddReviewModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Review"
      contentClassName="sm:max-w-2xl border-none"
      titleClassName="text-xl font-bold text-dark"
    >
      <div className="border-t border-black/6 px-6 py-6 sm:px-8 sm:py-8">
        <div className="">
          <div className="space-y-7">
            <div className="space-y-4">
              <p className="text-[16px] font-medium leading-6 text-dark">
                Rating
              </p>
              <div className="flex items-center gap-3">
                <RatingInputStars value={rating} onChange={onRatingChange} />
                <span className="text-[18px] font-bold leading-7 text-chocolate">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="review-text"
                className="text-[16px] font-medium leading-6 text-dark"
              >
                Review Text
              </label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(event) => onReviewTextChange(event.target.value)}
                placeholder="Enter customer review..."
                rows={5}
                className="min-h-36.5 w-full resize-none rounded-xl border border-border/60 bg-background px-4 py-3 text-base font-medium text-dark outline-none transition-colors placeholder:text-gray focus:border-primary"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                className="h-13.5 min-w-50.5 rounded-xl border border-primary bg-primary px-4 text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-primary/90"
              >
                Add Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
