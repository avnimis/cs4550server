import * as reviewDao from "./dao.js";
export default function ReveiwRoutes(app) {


  //create review route
  app.post("/", async (req, res) => {
    const reviewData = req.body;

  try {
    const newReview = await reviewDao.createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to create review." });
  }
  });

  // delete review route
  app.delete("/", async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required." });
    }
  
    try {
      const result = await reviewDao.deleteReview(userId, productId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Failed to delete review." });
    }
  });



}