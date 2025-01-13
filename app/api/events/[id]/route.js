import dbConnect from "@/lib/dbConnect";
import Event from "@/models/event";
import { NextResponse } from "next/server";

// Connect to the database
await dbConnect();

// GET: Retrieve a single event by ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PATCH: Update a single event by ID
export async function PATCH(request, { params }) {
  const { id } = params;
  const updates = await request.json();

  try {
    const event = await Event.findByIdAndUpdate(id, updates, { new: true });
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a single event by ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
