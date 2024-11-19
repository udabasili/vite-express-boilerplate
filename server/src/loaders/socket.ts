
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

// Define a type for the socket instance to use elsewhere
type IOServer = SocketIOServer;

// Socket.IO instance
let io: IOServer;

/**
 * Initialize Socket.IO server
 * @param server - The HTTP server instance
 */
export function initializeIO(server: HttpServer): IOServer {
    io = new SocketIOServer(server, {
        cors: {
            origin  : '*', // Adjust this for production, replace '*' with allowed origins
            methods: ['GET', 'POST'],
        },
    });

    console.log('Socket.IO initialized');

    // Socket connection event
    io.on('connection', (socket: Socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Example event handling
        socket.on('message', (data) => {
            console.log('Message received:', data);
            socket.broadcast.emit('message', data); // Broadcast to all other clients
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
}

/**
 * Get the existing Socket.IO server instance
 * @returns The Socket.IO instance
 */
export function getIO(): IOServer {
    if (!io) {
        throw new Error('Socket.IO has not been initialized. Call initializeIO first.');
    }
    return io;
}
