import WebSocket, { WebSocketServer } from "ws";
import http from "http";

// Creating an HTTP server
const server = http.createServer((req, res) => {
    console.log(Date.now() + " Request came from " + req.url);
    res.end("Hi there");
});

// Upgrading HTTP connection to WebSocket
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {

    ws.on("error", console.error);

    ws.on("message", function message(data, isBinary) {

        // Broadcasting message to all connected clients
        wss.clients.forEach(function each(client) {

            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }

        });
    });

    ws.send("Welcome to the WebSocket server");
});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});