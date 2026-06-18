import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';
export declare class ChatService {
    private messageRepository;
    private userRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>);
    validateMessagingPermission(senderId: string, receiverId?: string, groupId?: string): Promise<boolean>;
    saveMessage(data: {
        content: string;
        senderId: string;
        receiverId?: string;
        groupId?: string;
    }): Promise<Message>;
    getMessages(groupId?: string, receiverId?: string, senderId?: string): Promise<Message[]>;
}
