// models/Event.js
import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  maxAttendees: { type: Number, required: true },
  createdBy: { type: String, required: true },
  attendees: {
    type: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    default: [],
  },
});

const Event = models.Event || mongoose.model("Event", eventSchema);

export default Event;
