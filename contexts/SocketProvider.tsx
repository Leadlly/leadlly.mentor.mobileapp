import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  notifications: { [key: string]: number };
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const socket = io(process.env.EXPO_PUBLIC_CHAT_API_BASE_URL!, {
      transports: ["websocket"],
      withCredentials: true,
    });

    if (socket) {
      socket.on("mentor_notification", ({ room, messageCount }) => {
        setNotifications((prev) => ({
          ...prev,
          [room]: messageCount,
        }));
      });
    }

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
