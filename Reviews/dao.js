import model from "./model.js";

export const createReview = (review) => {
  return model.create({ review });
};

export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });


export const updateReview = (reviewId, review) => model.updateOne({ _id: reviewId }, { $set: review });

  
export const findReviewsForProduct =  (productId) => 
  model.find({ productId: productId })


export const findReviewsForUser =  (userId) => 
  model.find({ userId: userId })
