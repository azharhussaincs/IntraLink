import { User } from '../../users/entities/user.entity';
export declare class Message {
    id: string;
    content: string;
    sender: User;
    receiverId: string;
    groupId: string;
    createdAt: Date;
}
