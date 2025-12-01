import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: String,
      required: true,
      trim: true,
    },

    supplier: {
      type: String,
      required: true,
      trim: true,
    },

    taste: {
      type: String,
      required: true,
      trim: true,
    },

    price : {
      type: String,
      required: true,
      trim: true,
    },

    details: {
      type: String,
      required: true,
      trim: true,
    },

    photoUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

const Coffee = mongoose.model("Coffee", coffeeSchema);
export default Coffee;