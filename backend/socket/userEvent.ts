import { Socket, Server as SocketIOServer } from "socket.io";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
    
    // Listen for event from client
    socket.on("testSocket", (data) => {
        console.log("Received:", data);

        // Respond back to client
        socket.emit("testSocket", { msg: "realtime updates!" });
    });

}
