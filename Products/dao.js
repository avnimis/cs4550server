import model from "./model.js";

export const createProduct = (product) => {
  return model.create(product);
};

export const deleteProduct = (productId) => {
  model.deleteOne({ _id: productId });
};

export const updateProduct = (productId, product) =>
  model.updateOne({ _id: productId }, { $set: product });

