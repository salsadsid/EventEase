import dbConnect from "@/lib/dbConnect";
import Event from "@/models/event";
import { getToken } from "next-auth/jwt"; // For user authentication

export async function GET(req) {
  // Get the user token from the request
  const token = await getToken({ req });

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  console.log(token);
  try {
    // Connect to the database
    await dbConnect();

    // Fetch events created by the logged-in user
    const events = await Event.find({ createdBy: token.email });
    console.log(events);
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
