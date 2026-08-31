import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";



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