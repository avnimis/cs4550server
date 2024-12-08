import model from "./model.js";
import userModel from "../Users/model.js";
import productModel from "../Products/model.js";

export const createReview = async (reviewData) => {
  const { userId, productId, ...reviewDetails } = reviewData;

  try {
    // Step 1: Create the review
    const newReview = new model({
      ...reviewDetails,
      userId,
      productId
    });
    const savedReview = await newReview.save();

    // Step 2: Add review to the user's reviews array
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { reviews: savedReview._id } },
      { new: true } // Return the updated document
    );

     // Step 3: Add review to the product's reviews array
     await productModel.findByIdAndUpdate(
      productId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );
    return savedReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

//removes from user and product array!
export const deleteReview = async (userId, productId) => {
  try {
    // Step 1: Remove the review from the user's reviews array
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    //remove the review with product ID from the users reviews array
    user.reviews = user.reviews.filter(
      (review) => review.productId.toString() !== productId
    );
    await user.save();

    // Step 2: Remove the review from the product's reviews array
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }
    product.reviews = product.reviews.filter(
      (review) => review.userId.toString() !== userId
    );
    await product.save();

    return { message: "Review successfully deleted." };
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
