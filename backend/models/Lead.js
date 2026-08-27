import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        mobileNumber: {
            type: String,
            required: true,
            trim: true,
        },

        whatsappNumber: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        ageGroup: {
            type: String,
            required: true,
        },

        interest: {
            type: String,
            required: true,
        },

        leadSource: {
            type: String,
            default: "Website",
        },

        leadStatus: {
            type: String,
            default: "NEW LEAD",
        },

        registrationDate: {
            type: Date,
            default: Date.now,
        },

  
    },

            {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;