import * as reviewDao from "./dao.js";
export default function ReviewRoutes(app) {

  //to get reivews for user
  app.get("/api/reviews/:userId", async (req, res) => {
    const { userId } = req.params;
    const reviews = await reviewDao.findReviewsForUser(userId);
    res.status(200).send(reviews);
  });

  
  //to get reivews for product
  app.get("/api/reviews/:productId", async (req, res) => {
    const { productId } = req.params;
    const reviews = await reviewDao.findReviewsForProduct(productId);
    res.status(200).send(reviews);
  });


  // create review 
  app.post("/api/reviews", async (req, res) => {
    const newReview = req.body;
    try {
      const createdProduct = await reviewDao.createReview(newReview);
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review." });
    }
  });


  // delete review
  app.delete("/api/reviews/:rid", async (req, res) => {
    const { rid } = req.params;
    const status = await productDao.deleteReview(rid);
    res.send(status);
  });


  //parses ID of the review through the URL and and reivew updates from the HTTP request body. use the DAO's updateReview to apply the updates to the review.
  app.put("/api/products/:_id", async (req, res) => {
    const { rid } = req.params;
    const reviewUpdates = req.body;
    const status = await productDao.updateReview(rid, reviewUpdates);
    res.send(status);
  });
}