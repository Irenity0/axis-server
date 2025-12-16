/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { sendError, sendResponse } from "../../utils/response";
import { User } from "../user/user.model";
import { AuthRequest } from "../../types";

const generateToken = (payload: object): string => {
  const jwtSecret = process.env.JWT_SECRET!;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const signOptions: SignOptions = {
    expiresIn: jwtExpiresIn as any,
  };

  return jwt.sign(payload, jwtSecret, signOptions);
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendError(res, 401, "Invalid email or password");
    }
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, 401, "Invalid email or password");
    }

    // Generate JWT token
    const token = generateToken({ id: user._id });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return sendResponse(res, 200, true, "Login successful", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token,
    });
  } catch (error: any) {
    return sendError(res, 500, "Login failed", error.message);
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    res.clearCookie("token");
    return sendResponse(res, 200, true, "Logout successful");
  } catch (error: any) {
    return sendError(res, 500, "Logout failed", error.message);
  }
};