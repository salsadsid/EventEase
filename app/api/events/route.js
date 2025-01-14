import dbConnect from "@/lib/dbConnect";
import Event from "@/models/event";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const events = await Event.find({});
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch events",
    });
  }
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const token = await getToken({ req });

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    const newEvent = { ...body, createdBy: token.email };

    const event = await Event.create(newEvent);
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 400 }
    );
  }
}
