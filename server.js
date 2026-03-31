const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", (username) => {
    socket.username = username;
    io.emit("chat message", {
      user: "System",
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      user: socket.username,
      text: msg,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("chat message", {
        user: "System",
        text: `${socket.username} left the chat`,
        time: new Date().toLocaleTimeString()
      });
    }
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running...");
});
  console.log("Server running on http://localhost:3000");
});