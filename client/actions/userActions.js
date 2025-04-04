"use server";
import User from "../db/schema/user.schema";
import { connectToDatabase } from "../db/dbConfig";

export async function getUserById(userId) {
  try {
    const user = await User.findById(userId).lean();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, message: "Error fetching user" };
  }
}
