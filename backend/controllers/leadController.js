import Lead from "../models/Lead.js";
import jwt from "jsonwebtoken";
import sendRegistrationEmail from "../utils/sendEmail.js";

export const registerLead = async (req, res) => {

  try {

    const {
      fullName,
      mobileNumber,
      whatsappNumber,
      email,
      city,
      ageGroup,
      interest,
    } = req.body;

    // Validation
    if (!fullName || !mobileNumber || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Save lead
    const lead = await Lead.create({
      fullName,
      mobileNumber,
      whatsappNumber,
      email,
      city,
      ageGroup,
      interest,
      leadSource: "Website",
      leadStatus: "NEW LEAD",
    });

    // Generate JWT
    const token = jwt.sign(
      {
        leadId: lead._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send email
    try {

      await sendRegistrationEmail(lead);

    } catch (emailError) {

      console.error(
        "Email sending failed:",
        emailError.message
      );

    }

    // Success response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      leadId: lead._id,
      token,
    });

  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};