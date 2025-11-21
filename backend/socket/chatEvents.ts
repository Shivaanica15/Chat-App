import { Server as SocketIOServer, Socket } from "socket.io";
import Conversation from "../models/Conversation";
import { error } from "console";
import { Message } from "../models/Message";






export function registerChatEvents (io: SocketIOServer, socket: Socket){

    socket.on("getConversations", async ()=>{
        console.log('getConversations event');

        try{
            const userId = socket.data.userId;
             if(!userId){
                socket.emit("getConversations", {
                success: false,
                msg: "Unauthorized",
            });
            return;
            }

            // find all conversations where user is a participants

            const conversations = await Conversation.find({
                participants: userId
            })

            .sort({updatedAt: -1})
            .populate({
                path: "lastMessage",
                select: "content senderId attachment createdAt"
            })
            .populate({
                path: "participants",
                select: "name avataremail",
            })
            .lean();

            socket.emit("getConversations", {
                success: true,
                data: conversations,
            });


        }catch(error: any){
            console.log("getConversations error", error);
            socket.emit("getConversations",{
                success: false,
                msg: "Failed to fetch conversation",
            });
        }
    })

    socket.on("newConversation", async (data) => {
        console.log("newConversation event: ", data);

        try{
            if(data.type == 'direct'){
                // check if already exists
                const existingConversation = await Conversation.findOne({
                    type: "direct",
                    participants: {$all: data.participants, $size:2},
                })

                .populate({
                    path: "participants",
                    select: "name avataremail",
                })
                .lean();

                if(existingConversation){
            socket.emit("newConversation",{
                success: true,
                msg: {...existingConversation},
            });
            return;

                }
            }

            // create new conversation

            const conversation = await Conversation.create({
                type: data.type,
                participants: data.participants,
                name: data.name || "", // can be empty if direct conversation
                avatar: data.avatar || "", //same
                createdBy: socket.data.userId,
            });

            // get all connected sockets
            const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
                s=> data.participants.includes(s.data.userId)
            );

            // join this conversation by all online participants

            connectedSockets.forEach(participantSocket=>{
                participantSocket.join(conversation._id.toString());
            });

            // send conversation data back (populated)

            const populatedConversation = await Conversation.findById(conversation._id)
            .populate({
                path:"participants",
                select: "name avatar email"
            }).lean();

            if(!populatedConversation){
                throw new Error("Failed to populate conversation");
            }

            // emit conversation to all participants
            io.to(conversation._id.toString()).emit("newConversation", {
                success: true,
                data: {...populatedConversation, isNew: true}
            });

        } catch(error: any){
            console.log("newConversation error", error);
            socket.emit("newConversation",{
                success: false,
                msg: "Failed to create conversation",
            });
        }
    });

    socket.on("newMessage", async (data)=>{
        console.log('newMessage event: ', data);
        try{
            const message = await Message.create({
                conversationId: data.conversationId,
                senderId: data.sender.id,
                content: data.content,
                attachment: data.attachment
            });

            io.to(data.conversationId).emit("newConversation", {
                success: true,
                data: {
                    id: message._id,
                    content: data.content,
                    sender:{
                        id: data.sender.id,
                        name: data.sender.name,
                        avatar: data.sender.avatar,
                    },
                    attachment: data.attachment,
                    createdAt: new Date().toISOString(),
                    conversationId: data.conversationId,
                },
            });

            // update conversation's last message

            await Conversation.findByIdAndUpdate(data.conversationId,{
                lastMessage: message.id,
            });

        }catch(error){
            socket.emit("newMessage",{
                success: false,
                msg: "Failed to send message",
            });
        }
        
    })

}