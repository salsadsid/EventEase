"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch events");
      }
    }

    fetchEvents();
  }, []);

  const handleRegister = async (id) => {
    if (!session) {
      alert("You must be logged in to register for an event!");
      return;
    }

    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendeeEmail: session.user.email,
          attendeeName: session.user.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        // router.push(`/events/${params.id}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
      console.error("Failed to fetch events");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {events.map((event) => (
        <Card key={event._id} className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex gap-2 text-xl">
              🌃 {event.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 bg-gray-200 p-2 rounded">
              <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>🗺️ Location: {event.location}</p>
              <p>🧑‍🤝‍🧑 Max Attendees: {event.maxAttendees}</p>
              <p>📝 Created By: {event.createdBy}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/dashboard/events/${event._id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button onClick={() => handleRegister(event._id)}>Register</Button>
          </CardFooter>
        </Card>
      ))}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold mb-6">Event Management</h1>
        <Link
          href="/dashboard/events/create"
          className="block bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Create Event
        </Link>
        <Link
          href="/dashboard/events"
          className="block bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          View Events
        </Link>
      </div>
    </div>
  );
};

export default Page;
