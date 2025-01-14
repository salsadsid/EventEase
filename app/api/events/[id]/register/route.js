import dbConnect from "@/lib/dbConnect";
import Event from "@/models/event";

export async function POST(req, { params }) {
  const { id } = params;
  const { attendeeName, attendeeEmail } = await req.json();

  if (!attendeeName || !attendeeEmail) {
    return new Response(
      JSON.stringify({ message: "Name and email are required" }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the event by ID
    const event = await Event.findById(id);
    console.log("event: ", event);
    if (!event) {
      return new Response(JSON.stringify({ message: "Event not found" }), {
        status: 404,
      });
    }
    console.log(!Array.isArray(event.attendees));
    if (!Array.isArray(event.attendees)) {
      event.attendees = [];
    }

    // Check if maxAttendees limit has been reached
    if (event.attendees.length >= event.maxAttendees) {
      return new Response(
        JSON.stringify({ message: "Event is fully booked" }),
        { status: 400 }
      );
    }

    // Check if the attendee is already registered
    const isAlreadyRegistered = event.attendees.some(
      (attendee) => attendee.email === attendeeEmail
    );

    if (isAlreadyRegistered) {
      return new Response(
        JSON.stringify({
          message: "You are already registered for this event",
        }),
        { status: 400 }
      );
    }

    // Register the attendee
    event.attendees.push({ name: attendeeName, email: attendeeEmail });
    await event.save();

    return new Response(
      JSON.stringify({ message: "Successfully registered", event }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
