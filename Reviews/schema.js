import mongoose from "mongoose"; //load mongoose library

const reviewSchema = new mongoose.Schema({ //create schema
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel', // Reference to a User model
    required: true
  },
  username: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel', // Reference to the Product model
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{ collection: "products" } // store data in "products" collection
);

export default reviewSchema;