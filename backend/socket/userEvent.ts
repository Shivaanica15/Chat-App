import { Socket, Server as SocketIOServer } from "socket.io";
import User from "../models/User";
import { generateToken } from "../utils/token";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
    
    // Listen for event from client
    socket.on("testSocket", (data) => {
        console.log("Received:", data);

        // Respond back to client
        socket.emit("testSocket", { msg: "realtime updates!" });
    });

    socket.on("updateProfile", async (data: {name?: string; avatar?: string})=>{
        console.log('updateprofile event: ',data);

        const userId = socket.data.userId;

        if(!userId){
            return socket.emit('updateProfile',{
                success: false, msg: "Unauthorized"
            })
        }

        try{

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { name: data.name, avatar: data.avatar },
                { new: true }// will return the user with updated values
    );

    if(!updatedUser){
        return socket.emit("updateProfile", {
            success: false,
            msg: "User not found",
        });
    }

    // gen token with updated value

    const newToken = generateToken(updatedUser);

    socket.emit('updateProfile',{
        success: true,
        data: {token: newToken},
        msg: "Profile updated successfully",
    });

        }catch(error){
            console.log('Error updating profile: ',error);
            socket.emit('updateProfile',{
                success: false, msg: "Error updating profile"
            })
        }
    })

}
