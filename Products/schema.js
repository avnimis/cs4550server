import mongoose from "mongoose"; //load mongoose library

const productSchema = new mongoose.Schema({ //create schema

    //String field that is required and unique
    name: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true },
    //string field that is required, but not unique
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true // URL to the product image
    },
    tags: {
      type: [String], // Array of tags (e.g., ["Vegan", "Cruelty-Free"])
      default: []
    },
  },
  { collection: "products" } // store data in "products" collection
);

export default productSchema;