import * as productDao from "./dao.js";
// import * as reviewDao from "../Reviews/dao.js";
export default function ProductRoutes(app) {

  const findAllProducts = async (req, res) => {
    const products = await productDao.findAllProducts();
    res.json(products);
  };
  app.get("/api/products", findAllProducts);


  // Create a new product
  app.post("/api/products", async (req, res) => {
    const newProduct = req.body;
    try {
      const createdProduct = await productDao.createProduct(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product." });
    }
  });

  //parses ID of the course through the URL and and product updates from the HTTP request body. use the DAO's updateProduct to apply the updates to the module.
  app.put("/api/products/:_id", async (req, res) => {
    const { productId } = req.params;
    const productUpdates = req.body;
    const status = await productDao.updateProduct(productId, productUpdates);
    res.send(status);
  });



  app.delete("/api/products/:_id", async (req, res) => {
    const { productId } = req.params;
    const status = await productDao.deleteProduct(productId);
    res.send(status);
  });
}