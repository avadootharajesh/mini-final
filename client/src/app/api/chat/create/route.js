import { NextResponse } from "next/server";
import Room from "@/../db/schema/room.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import { getToken, getUserByToken } from "@/../actions/userActions";

export async function POST(request) {}
