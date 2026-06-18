import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { EncryptionService } from '../auth/encryption.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // In production, validate JWT from handshake
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { content: string; receiverId?: string; groupId?: string; senderId: string },
  ) {
    // 1. Encrypt message content before saving
    const encryptedContent = this.encryptionService.encrypt(data.content);
    
    // 2. Save to database
    const message = await this.chatService.saveMessage({
      ...data,
      content: encryptedContent,
    });

    // 3. Broadcast (Decrypted for the recipient in this simple implementation, 
    // but in E2EE the client would decrypt)
    const broadcastData = {
      ...message,
      content: data.content, // Sending raw for now, ideally client-side decryption
    };

    if (data.groupId) {
      this.server.to(data.groupId).emit('receiveMessage', broadcastData);
    } else if (data.receiverId) {
      // Find socket for receiverId and send
      this.server.emit('receiveMessage', broadcastData); // Simplified
    }
  }

  @SubscribeMessage('joinGroup')
  handleJoinGroup(@ConnectedSocket() client: Socket, @MessageBody() groupId: string) {
    client.join(groupId);
  }
}
