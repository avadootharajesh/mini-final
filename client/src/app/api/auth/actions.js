"use server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/../db/dbConfig";
import User from "../../../../db/schema/user.schema";
import Seller from "../../../../db/schema/seller.schema";
import { z } from "zod";
import { cookies } from "next/headers";

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const JWT_SELLER_SECRET = process.env.JWT_SELLER_SECRET;
const saltRounds = 10;

const userValidationSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const setCookie = async (token, userType) => {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  cookieStore.set("userType", userType, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });
};

export async function loginUser({ email, password, userType }) {
  try {
    await connectToDatabase();
    const Member = userType === "user" ? User : Seller;
    const user = await Member.findOne({ email });
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        error: "Invalid password",
      };
    }
    const JWT_SECRET =
      userType === "user" ? JWT_USER_SECRET : JWT_SELLER_SECRET;
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    setCookie(token, userType);

    return {
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        userType,
      },
      token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function registerUser({ name, email, password, userType }) {
  try {
    const validate = userValidationSchema.safeParse({ name, email, password });
    if (!validate.success) {
      return {
        success: false,
        error: validate.error.errors.map((e) => e.message).join(", "),
      };
    }

    await connectToDatabase();
    const Member = userType === "user" ? User : Seller;
    const existingUser = await Member.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        error: "Account with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await Member.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const JWT_SECRET =
      userType === "user" ? JWT_USER_SECRET : JWT_SELLER_SECRET;

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    setCookie(token, userType);

    console.log(userType + " created", user);
    return {
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        userType,
      },
      token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
