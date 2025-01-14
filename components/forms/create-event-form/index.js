"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import socket from "@/utils/socket";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useCreateEventFormHook from "./useCreateEventFormHook";

export function CreateEventForm({ className, isEdit, ...props }) {
  // console.log(user);
  const { id } = useParams();

  const { data: session, status } = useSession();
  const { renderCreateEventForm } = useCreateEventFormHook();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = renderCreateEventForm;

  const onSubmit = async (data) => {
    setErrorMessage("");
    // e.preventDefault();
    if (isEdit && id) {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          // Await and parse the JSON response
          const updatedEvent = await res.json();
          console.log(updatedEvent);
          alert("Event updated successfully!");

          // Emit real-time update only if the event has a name and attendees
          socket.emit("updateEvent", {
            eventName: updatedEvent?.data?.name || "Unknown Event",
            isFull:
              updatedEvent?.data?.attendees?.length >=
              updatedEvent?.data?.maxAttendees,
          });
        } else {
          alert("Failed to update event");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          router.push("/events");
        } else {
          setErrorMessage("Failed to create event");
          // console.error("Failed to create event");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isEdit && id) {
      async function getEvent(id) {
        const res = await fetch(`/api/events/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await res.json();
        return data.data;
      }

      getEvent(id).then((event) => {
        // console.log("event: ", event);
        if (event) {
          renderCreateEventForm.setValue("name", event.name);
          renderCreateEventForm.setValue(
            "date",
            new Date(event.date).toISOString().split("T")[0]
          );
          renderCreateEventForm.setValue("location", event.location);
          renderCreateEventForm.setValue(
            "maxAttendees",
            Number(event.maxAttendees)
          );
          renderCreateEventForm.setValue("createdBy", event.createdBy);
        }
      });
    }
  }, [isEdit, id, renderCreateEventForm]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEdit ? "Update" : "Create"} Event
          </CardTitle>
          <CardDescription>
            Enter your details to {isEdit ? "update" : "create"} an event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Birthday Party"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="date">Date</Label>
                </div>
                <Input id="date" type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="location">Location</Label>
                </div>
                <Input id="location" type="text" {...register("location")} />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                </div>
                <Input
                  id="maxAttendees"
                  type="number"
                  {...register("maxAttendees")}
                />
                {errors.maxAttendees && (
                  <p className="text-red-500 text-sm">
                    {errors.maxAttendees.message}
                  </p>
                )}
              </div>

              {errorMessage && (
                <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {errorMessage}
                </p>
              )}
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </>
                ) : isEdit ? (
                  "Update Event"
                ) : (
                  "Create Event"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
