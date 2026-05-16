import mongoose, { Schema } from "mongoose";

import { REPORT_REASONS, REPORT_STATUS } from "../config/constants.js";

const reportSchema = new Schema(
  {
    reporter_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    target_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "target_model",
    },

    target_model: {
      type: String,
      required: true,
      enum: ["Product", "User"],
    },

    reason: {
      type: String,
      enum: Object.values(REPORT_REASONS),
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: Object.values(REPORT_STATUS),
      default: REPORT_STATUS.PENDING,
    },

    admin_note: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    reviewed_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

reportSchema.index(
  {
    reporter_id: 1,
    target_id: 1,
    target_model: 1,
  },
  { unique: true },
);

reportSchema.index({
  status: 1,
  createdAt: -1,
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
