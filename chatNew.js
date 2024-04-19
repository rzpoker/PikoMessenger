const express = require("express");
const app = express();
const session = require("express-session");
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  //build an array to send back the img and endpoint for each ns
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  //send nsdata to client, we need to use socket, NOT io because we want it to go to just that client
  socket.emit("nslist", nsData);
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    //get username from client side
    let username = nsSocket.handshake.query.username;

    //a socket has connected to one of our namespaces
    //send ns groups data back to client
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    nsSocket.on("joinRoom", (room, numberOfUsersUpdate) => {
      const currentRoom = Object.keys(nsSocket.rooms)[1];
      nsSocket.leave(currentRoom);
      updateUsersInRoom(namespace, currentRoom);
      nsSocket.join(room);
      const roomTrim = room.trim();
      const nsRoom = namespace.rooms.find((room) => {
        return room.title === roomTrim;
      });
      updateUsersInRoom(namespace, room);
      nsSocket.emit("historyCatchUp", nsRoom.history);
    });

    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        username: username,
        text: msg.text,
        timeHour: new Date().getHours(),
        timeMinute: new Date().getMinutes(),
      };

      //send this message to all sockets in the room
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const trimedTitle = roomTitle.trim();
      //we need to find the room object
      const nsRoom = namespace.rooms.find((room) => {
        return room.title === trimedTitle;
      });

      nsRoom.addmessage(fullMsg);
      io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});
function updateUsersInRoom(namespace, room) {
  io.of(namespace.endpoint)
    .in(room)
    .clients((err, clients) => {
      io.of(namespace.endpoint).in(room).emit("updateMembers", clients.length);
    });
}
