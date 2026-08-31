import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/sendEmail.js"



export const registerUser = async (req, res) => {
    try {
        const {

            fullName,
            email,
            password,
        } = req.body;


        // Get leadId from JWT middleware
        const leadId = req.leadId;

        // 1. Check required fields
        if (!leadId || !fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required.",
            });
        }

        // 2. Check password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters.",
            });
        }

        // 3. Check whether email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: " An account with this email already exists."
            })
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create user
        const user = await User.create({
            leadId,
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "USER",
            accountStatus: "ACTIVE",
        });

        // 6. Send response
        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            userId: user._id,
        });
    } catch (error) {
        console.error("Register User Error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error while creating account.",
        });

    }
}



// ================================
// LOGIN USER
// ================================

export const loginUser = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        // 1. Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // 2. Find user by email
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        // 3. User not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // 4. Check account status
        if (user.accountStatus !== "ACTIVE") {
            return res.status(403).json({
                success: false,
                message: "Your account is not active.",
            });
        }

        // 5. Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        // 6. Wrong password
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // 7. Generate login JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // 8. Login successful
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while logging in.",
        });
    }
};


// ========================================
// FORGOT PASSWORD
// ========================================

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Check email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // 2. Find user
        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        // 3. Don't reveal whether account exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });
        }

        // 4. Generate random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // 5. Hash token before saving to database
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // 6. Save hashed token
        user.resetPasswordToken = hashedToken;

        // 7. Token expires after 15 minutes
        user.resetPasswordExpires = new Date(
            Date.now() + 15 * 60 * 1000
        );

        await user.save();

        // 8. Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
       
        // 9. password reset email - SEND EMAIL ACTIONS
        await sendPasswordResetEmail({
            email: user.email,
            fullName: user.fullName,
            resetUrl,
        });

        console.log("Password Reset URL:", resetUrl);

        



        return res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a password reset link has been sent.",
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while processing forgot password.",
        });
    }
};



// ========================================
// RESET PASSWORD
// ========================================

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        // 1. Check token
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required.",
            });
        }

        // 2. Check passwords
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are required.",
            });
        }

        // 3. Check passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        // 4. Check password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters.",
            });
        }

        // 5. Hash token received from URL
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // 6. Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: new Date(),
            },
        });

        // 7. Token invalid or expired
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset token is invalid or has expired.",
            });
        }

        // ========================================
        // 8. SHOW OLD PASSWORD HASH
        // ========================================

        // console.log("OLD PASSWORD HASH:", user.password);

        // ========================================
        // 9. HASH NEW PASSWORD
        // ========================================

        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log("NEW PASSWORD HASH:", hashedPassword);

        // ========================================
        // 10. UPDATE PASSWORD
        // ========================================

        user.password = hashedPassword;

        // console.log("PASSWORD BEFORE SAVE:", user.password);

        // ========================================
        // 11. DELETE RESET TOKEN
        // ========================================

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        // ========================================
        // 12. SAVE USER
        // ========================================

        await user.save();

        // console.log("PASSWORD AFTER SAVE:", user.password);

        // ========================================
        // 13. SUCCESS RESPONSE
        // ========================================

        return res.status(200).json({
            success: true,
            message: "Password reset successful.",
        });

    } catch (error) {
        console.error("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while resetting password.",
        });
    }
};