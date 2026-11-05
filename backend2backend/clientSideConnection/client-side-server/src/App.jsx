
import React, { useState, useEffect } from 'react';

function App() {
 const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      console.log(`Message from server: ${event.data}`);

      setMessages((prev) => [...prev, event.data]);
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

      {messages.length > 0 ? (
        messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))
      ) : (
        <p>No messages from server.</p>
      )}
    </div>
  );
}

export default App;
