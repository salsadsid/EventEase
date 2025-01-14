"use client";

import socket from "@/utils/socket";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for new attendee registration
    socket.on("newAttendee", (data) => {
      setNotifications((prev) => [
        ...prev,
        `New attendee registered for event: ${data.eventName}`,
      ]);
    });

    // Listen for event updates
    socket.on("eventUpdated", (data) => {
      const message = data.isFull
        ? `Event "${data.eventName}" is now full!`
        : `Event "${data.eventName}" has been updated.`;
      setNotifications((prev) => [...prev, message]);
    });

    // Cleanup
    return () => {
      socket.off("newAttendee");
      socket.off("eventUpdated");
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((note, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded-md">
            {note}
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="bg-gray-100 p-2 rounded-md">No notifications</li>
        )}
      </ul>
    </div>
  );
}
