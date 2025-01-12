"use client";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Max Attendees: {event.maxAttendees}</p>
            <p>Created By: {event.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
