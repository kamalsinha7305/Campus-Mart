import { z } from "zod";
import { REPORT_REASONS } from "../config/constants.js";

export const reportProductSchema = z.object({
  reason: z.enum(Object.values(REPORT_REASONS)),

  message: z
    .string()
    .trim()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),
});
