"use client";

import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Listen for new attendee registration
    socket.on("newAttendee", (data) => {
      setNotifications((prev) => [
        ...prev,
        `New attendee registered for ${data.eventName}!`,
      ]);
    });

    // Listen for event updates
    socket.on("eventUpdated", (data) => {
      setNotifications((prev) =>
        [
          ...prev,
          `Event ${data.eventName} has been updated!`,
          data.isFull && `The event has reached maximum capacity.`,
        ].filter(Boolean)
      );
    });

    // Cleanup event listeners on component unmount
    return () => {
      if (socket) {
        socket.off("newAttendee");
        socket.off("eventUpdated");
      }
    };
  }, [socket]);

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((note, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded-md flex justify-between"
          >
            {note}
            <button
              onClick={() =>
                setNotifications((prev) => prev.filter((_, i) => i !== index))
              }
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="bg-gray-100 p-2 rounded-md">No notifications</li>
        )}
      </ul>
    </div>
  );
}
