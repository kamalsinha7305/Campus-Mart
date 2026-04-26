import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    line1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    line2: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => /^\d{6}$/.test(v),
        message: "Pincode must be exactly 6 digits",
      },
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes (minimal + useful)
addressSchema.index({ user: 1 });
addressSchema.index({ user: 1, isDefault: 1 });

// Ensure only one default address per user
addressSchema.pre("save", async function () {
  if (this.isDefault) {
    await mongoose
      .model("Address")
      .updateMany(
        { user: this.user, _id: { $ne: this._id } },
        { $set: { isDefault: false } },
      );
  }
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
