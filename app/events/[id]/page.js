"use client";
import { CreateEventForm } from "@/components/forms/create-event-form";

export default function EditEvent() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white">
      <CreateEventForm isEdit />
    </div>
  );
}
