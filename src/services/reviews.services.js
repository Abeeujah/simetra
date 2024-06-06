import { ReviewModel } from "../models/seller/review.model.js";

export async function createReview(reviewDto) {
  try {
    const review = await ReviewModel.create(reviewDto);
    if (!review) {
      return false;
    }
    return review.toJSON();
  } catch (error) {
    console.error({ createReviewError: error });
    throw new Error(error.message);
  }
}

export async function updateReview(filter, update) {
  try {
    const review = await ReviewModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!review) {
      return false;
    }
    return review.toJSON();
  } catch (error) {
    console.error({ updateReviewError: error });
    throw new Error(error.message);
  }
}

export async function deleteReview(filter) {
  try {
    const review = await ReviewModel.findOneAndDelete(filter);
    if (!review) {
      return false;
    }
    return review.toJSON();
  } catch (error) {
    console.error({ deleteReviewError: error });
    throw new Error(error.message);
  }
}

export async function retrieveReviews(filter) {
  try {
    const { productId, cursor } = filter;
    const filterQuery = cursor ? { _id: { $lt: cursor } } : {};
    const reviews = await ReviewModel.find(
      { ...filterQuery, productId },
      { rating: 1, review: 1, media: 1 }
    )
      .sort({ _id: -1 })
      .limit(20);

    if (!reviews.length) {
      return false;
    }
    
    const pointer = reviews.length;
    const newCursor = pointer ? reviews[pointer - 1]._id : "";
    return { reviews, cursor: newCursor };
  } catch (error) {
    console.error({ retrieveReviewsError: error });
    throw new Error(error.message);
  }
}
