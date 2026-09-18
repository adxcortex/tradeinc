import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    colorSlot: { type: Number, default: 1, min: 1, max: 4 }, // maps to --series-N in globals.css
    avatarDataUrl: { type: String, default: null }, // small image stored inline as a data: URL
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: Schema.Types.ObjectId };

export const User: Model<UserDoc> = models.User || model<UserDoc>("User", UserSchema);
