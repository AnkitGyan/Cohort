
import React, { useState, useEffect } from 'react';

function App() {
 const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
      setSocket(ws);
    };

   ws.onmessage = async (event) => {
    let data = event.data;
    if (data instanceof Blob) {
        console.log(data);
        data = await data.text();
    }
    console.log("Message from server:", data);
    setMessages((prev) => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
    };

    return () => {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;

      ws.close();
    };
  }, []);

  if (!socket) {
    return <h3>Connecting to the Socket...</h3>;
  }

  return (
    <div>
      <h2>Hello from React App!</h2>

      <h3>Messages from server:</h3>

      {messages ? (
        <p>{messages}</p> 
      ) : (
        <p>No messages from server.</p>
      )}

      <button onClick={()=> socket.send("Hello from React APP!")}>Send Message</button>
    </div>
  );
}

export default App;
