import {
  productReviewSchema,
  updateProductReviewSchema,
} from "../../schemas/reviews.schema.js";
import {
  createReview,
  deleteReview,
  retrieveReviews,
  updateReview,
} from "../../services/reviews.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpReviewProduct(req, res) {
  const validation = productReviewSchema.safeParse(req.body);
  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ productReviewSchema: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  try {
    const { user } = req;
    const { productId } = req.params;
    const { media } = res.locals.uploadMapping;

    const review = await createReview({
      ...validation.data,
      reviewer: user.id,
      productId,
      media,
    });

    if (!review) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to add review." });
    }

    return res.status(201).json({
      success: true,
      message: "Product reviewed.",
      data: { review },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateReview(req, res) {
  const validation = updateProductReviewSchema.safeParse(req.body);
  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ updateProductReviewSchema: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  try {
    const { id } = req.user;
    const { reviewId } = req.params;
    const { uploadMapping } = res.locals;

    const review = await updateReview(
      { reviewId, reviewer: id },
      { ...validation.data, media: uploadMapping?.media }
    );

    if (!review) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update review." });
    }

    return res.status(200).json({
      success: true,
      message: "Product review updated.",
      data: { review },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteReview(req, res) {
  try {
    const { id } = req.user;
    const { reviewId } = req.params;

    const review = await deleteReview({ reviewId, reviewer: id });
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
      data: { review },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpRetrieveReviews(req, res) {
  try {
    const { productId } = req.params;
    const { reviews, cursor } = await retrieveReviews({
      productId,
      cursor: req.query?.cursor,
    });

    if (!reviews) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found." });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Reviews retrieved successfully.",
        data: { reviews, cursor },
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
