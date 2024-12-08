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