import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    let parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket: ws,
        room: parsedMessage.payload.roomId,
      });
      ws.send(`Joined room ${parsedMessage.payload.roomId}`);
    }

    if (parsedMessage.type === "chat") {
      let currentUser = allSockets.find((x) => x.socket === ws);

      if (!currentUser) return;

      // broadcast to everyone in the same room
      allSockets.forEach((user) => {
        if (user.room === currentUser.room && user.socket.readyState === WebSocket.OPEN) {
          user.socket.send(parsedMessage.payload.message);
        }
      });
    }
  });

  ws.on("close", () => {
    // remove disconnected client from array
    allSockets = allSockets.filter((u) => u.socket !== ws);
  });
});
