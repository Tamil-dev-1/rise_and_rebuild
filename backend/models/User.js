
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    accountStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    // ========================================
    // MEMBERSHIP
    // ========================================
    membership: {
      planId: {
        type: String,
        default: null,
      },

      planName: {
        type: String,
        default: null,
      },

      price: {
        type: Number,
        default: null,
      },

      period: {
        type: String,
        default: null,
      },

      status: {
        type: String,
        enum: ["NONE", "PENDING", "ACTIVE", "EXPIRED", "CANCELLED"],
        default: "NONE",
      },

      startedAt: {
        type: Date,
        default: null,
      },

      expiresAt: {
        type: Date,
        default: null,
      },
    },

    // ========================================
    // PASSWORD RESET
    // ========================================
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

