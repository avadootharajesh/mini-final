import Event from "@/../db/schema/event.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import { NextResponse } from "next/server";
import { getUserByToken } from "@/../actions/userActions";

connectToDatabase();

export async function GET(request) {
  try {
    const upcomingEvents = await Event.find({ eventDate: { $gt: Date.now() } })
      .sort({ eventDate: 1 })
      .lean();
    const formattedEvents = upcomingEvents.map((event) => ({
      ...event,
      _id: event._id?.toString() || "",
      eventDate: event.eventDate
        ? new Date(event.eventDate).toISOString()
        : null,
    }));
    return NextResponse.json({
      success: true,
      message: "Events fetched successfully",
      events: formattedEvents,
    });
  } catch (err) {
    console.error("Error in GET events:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  const { eventData, token } = body;
  const response = await getUserByToken(token, "user");
  if (!response.success) {
    return NextResponse.json(
      { success: false, error: response.message },
      { status: 401 }
    );
  }
  const user = response.user;
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "User not found",
      },
      { status: 400 }
    );
  }
  try {
    const date = new Date();
    const event = new Event({
      ...eventData,
      organisedBy: user._id,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });
    await event.save();
    return NextResponse.json({
      success: true,
      message: "New event added successfully",
      event,
    });
  } catch (err) {
    console.error("Error in POST event:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
