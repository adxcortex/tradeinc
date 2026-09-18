import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const PROGRESS_STATUSES = ["not_started", "in_progress", "done"] as const;
export type ProgressStatus = (typeof PROGRESS_STATUSES)[number];

const ProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slug: { type: String, required: true }, // CurriculumItem.slug
    status: { type: String, enum: PROGRESS_STATUSES, default: "not_started" },
    note: { type: String, default: "" },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, slug: 1 }, { unique: true });

export type ProgressDoc = InferSchemaType<typeof ProgressSchema> & { _id: Schema.Types.ObjectId };

export const Progress: Model<ProgressDoc> = models.Progress || model<ProgressDoc>("Progress", ProgressSchema);
