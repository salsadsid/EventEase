"use client";

import Loading from "@/app/loading";
import EventCard from "@/components/event-card/event-card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events/user");
        const data = await res.json();

        if (res.ok) {
          setEvents(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  async function deleteEvent(id) {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Event deleted successfully!");
        // Optionally refresh the page or update the UI
        window.location.reload(); // or use router.push if you're using Next.js navigation
      } else {
        const errorData = await res.json();
        alert(`Failed to delete event: ${errorData.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  }
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className=" mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Your Events</h1>
      {events.length === 0 ? (
        <p>You haven&apos;t created any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              handleDelete={deleteEvent}
              edit={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
