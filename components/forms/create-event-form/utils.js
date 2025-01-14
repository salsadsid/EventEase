export const initialCreateEventFormValues = {
  name: "",
  description: "",
  location: "",
  date: new Date().toISOString().split("T")[0],
  maxAttendees: 0,
};
