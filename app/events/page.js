"use client";

import EventCard from "@/components/event-card/event-card";
import Notifications from "@/components/notifications/notification";
import socket from "@/utils/socket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [registerLoading, setRegisterLoading] = useState(false);
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
      setRegisterLoading(id);
      const res = await fetch(`/api/events/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendeeEmail: session.user.email,
          attendeeName: session.user.name,
        }),
      });

      if (res.ok) {
        // Wait for the response to be converted to JSON before using it
        const data = await res.json();
        alert(data.message);
        console.log(data, "data");

        // Emit real-time event for new attendee registration
        socket.emit("registerAttendee", { eventName: data.event.name });

        // Optionally navigate to the event page
        // router.push(`/events/${params.id}`);
      } else {
        // Handle error response
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(error.message);
      console.error("Failed to fetch events");
    } finally {
      setRegisterLoading(false);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="grid grid-cols-1 py-6 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            handleRegister={handleRegister}
            edit={false}
            registerLoading={registerLoading}
          />
        ))}

        <Notifications />
      </div>
    </main>
  );
};

export default Page;
