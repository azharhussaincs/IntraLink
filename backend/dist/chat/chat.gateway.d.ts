import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { EncryptionService } from '../auth/encryption.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly encryptionService;
    server: Server;
    constructor(chatService: ChatService, encryptionService: EncryptionService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, data: {
        content: string;
        receiverId?: string;
        groupId?: string;
        senderId: string;
    }): Promise<void>;
    handleJoinGroup(client: Socket, groupId: string): void;
}
