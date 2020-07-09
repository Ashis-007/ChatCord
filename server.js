require("dotenv").config();
const express = require("express"),
  http = require("http");
const socketIo = require("socket.io"),
  cors = require("cors");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  socket.removeAllListeners();
  console.log("A user is connected!", socket.id);
  socket.on("message", (data) => {
    console.log("Client: ", data);
    // send msg to all the clients
    // connected to this socket
    socket.broadcast.emit("message", data.message);
  });

  socket.on("typing", (msg) => {
    socket.broadcast.emit("typing", msg);
    console.log("typing");
  });
});

app.use(cors());

// start server
const port = 5000 || process.env.PORT;
server.listen(port);
