import { useEffect, useState } from "react";
import websocketService from "../services/websocket";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Connect to WebSocket
      websocketService.connect(token);

      // Listen for connection status
      const handleConnected = () => setIsConnected(true);
      const handleDisconnected = () => setIsConnected(false);

      websocketService.on("connected", handleConnected);
      websocketService.on("disconnected", handleDisconnected);

      // Cleanup on unmount
      return () => {
        websocketService.off("connected", handleConnected);
        websocketService.off("disconnected", handleDisconnected);
      };
    }
  }, []);

  const subscribe = (event, callback) => {
    websocketService.on(event, callback);

    // Return unsubscribe function
    return () => {
      websocketService.off(event, callback);
    };
  };

  const send = (data) => {
    websocketService.send(data);
  };

  return {
    isConnected,
    lastMessage,
    subscribe,
    send,
    ws: websocketService,
  };
}
