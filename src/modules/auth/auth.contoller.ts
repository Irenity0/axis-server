import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { loginSchema } from "../../utils/validation";
import { sendResponse } from "../../utils/response";
import { User } from "../user/user.model";

export const login = async (req: Request, res: Response) => {
  try {
    // 1. Validate request body
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendResponse(res, 400, false, "Invalid input", parseResult.error.format());
    }
    const { email, password } = parseResult.data;

    // 2. Find me
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    // 4. res
    return sendResponse(res, 200, true, "Login successful", {
      name: user.name,
      email: user.email,
    });

  } catch (error: any) {
    return sendResponse(res, 500, false, "Server error", error.message);
  }
};
