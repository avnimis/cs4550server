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

  //make review function here
  app.post("/api/reviews", async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.body; // Extract the user ID from the request body

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    reviewDao.createReview(userId, productId);
    res.status(201).send({ message: "review successfully created" });
  });

}