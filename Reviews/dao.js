import model from "./model.js";

export const createReview = (user, product) => {
  return model.create({ user, product });
};

//removes from user and product array!
export const deleteReview = (user, product) => {
  return model.deleteOne({ user, product });
};

//removes from user and product array!
export const findReviewsForProduct = async (productId) => {

  const reviews = await model.find({ product: productId }).populate("productId");
  return reviews.map((reviews) => reviews.productId);
  // return model.find({product: productId});
};

//removes from user and product array!
export const findReviewsForUser = async (userId) => {
  const reviews = await model.find({ user: userId }).populate("user");
  return reviews.map((reviews) => reviews.userId);
  //return model.find({user: userId});
};

