"use server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/../db/dbConfig";
import User from "../../../../db/schema/user.schema";
import { z } from "zod";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const userValidationSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const setCookie = async (token) => {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
};

export async function loginUser({ email, password }) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
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
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    setCookie(token);

    return {
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
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

export async function registerUser({ name, email, password }) {
  try {
    const validate = userValidationSchema.safeParse({ name, email, password });
    if (!validate.success) {
      return {
        success: false,
        error: validate.error.errors.map((e) => e.message).join(", "),
      };
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    setCookie(token);

    console.log("User created", user);
    return {
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
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
