import { z } from "zod";
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() - 1);
export const createEventFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  date: z.coerce.date().min(tomorrow, "Date must be today or later"),
  maxAttendees: z.string().min(1, "Max Attendees is required"),
  createdBy: z.string().min(2, "Created By is required"),
});
