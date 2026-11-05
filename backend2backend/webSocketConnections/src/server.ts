import express from "express";
import websocket, { WebSocketServer } from "ws"

const app = express();

app.get("/", (req, res)=>{
  res.send("hello from api request");
})

const server =app.listen(3000)

const wss = new WebSocketServer({ server });

wss.on('connection', (ws)=>{

    console.log("New client connected");

    let messageCount = 0;
    ws.on('message', (message)=>{
        //BroadCasting messag to all connected clients
        wss.clients.forEach((client)=>{
            if(client.readyState === websocket.OPEN){
                client.send(message);
                messageCount++;
            }
            console.log(`Message count: ${messageCount}`);
        })
    })

    ws.send('Welcome to the webSocket server');

    ws.on('error', (err)=>{
        console.error(err);
    })
})