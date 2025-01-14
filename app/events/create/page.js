"use client";
import Loading from "@/app/loading";
import { CreateEventForm } from "@/components/forms/create-event-form";
import { useSession } from "next-auth/react";

export default function CreateEvent() {
  const { status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white">
      <CreateEventForm />
    </div>
  );
}
