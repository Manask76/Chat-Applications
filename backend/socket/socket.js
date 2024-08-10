import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [`http://localhost:3000`],
        methods: ['GET', 'POST'],
    }
});
export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}
const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    const userId = socket.handshake.query.userId;
    
    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    } else {
        console.log('No userId provided for socket:', socket.id);
    }

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
