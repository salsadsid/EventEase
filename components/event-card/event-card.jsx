import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
const EventCard = ({
  event,
  handleRegister = null,
  handleDelete = null,
  edit = false,
  registerLoading = false,
  session = null,
}) => {
  console.log("event: ", session);
  return (
    <Card key={event._id} className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex gap-2 text-xl">🚀 {event.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm bg-gray-200 p-2 rounded">
          <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>🗺️ Location: {event.location}</p>
          <p>🧑‍🤝‍🧑 Max Attendees: {event.maxAttendees}</p>
          <p>✨ Currently Registered: {event?.attendees?.length}</p>
          <p>📝 Created By: {event.createdBy}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {edit && (
          <Link href={`/events/${event._id}`}>
            <Button variant="outline">Edit</Button>
          </Link>
        )}
        {handleRegister && session?.user?.email !== event.createdBy && (
          <Button
            disabled={registerLoading === event._id}
            onClick={() => handleRegister(event._id)}
          >
            {registerLoading === event._id ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Register"
            )}
          </Button>
        )}
        {handleDelete && (
          <Button onClick={() => handleDelete(event._id)}>Delete</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
