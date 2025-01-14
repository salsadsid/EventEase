const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Setup Socket.IO
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Listen for connections
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Listen for registration event
    socket.on("registerAttendee", (data) => {
      console.log("New attendee registered:", data);
      io.emit("newAttendee", data);
    });

    // Listen for event updates
    socket.on("updateEvent", (data) => {
      console.log("Event updated:", data);
      io.emit("eventUpdated", data);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
