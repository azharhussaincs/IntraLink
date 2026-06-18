import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Message } from '../chat/entities/message.entity';
export declare class ReportingService {
    private userRepository;
    private messageRepository;
    constructor(userRepository: Repository<User>, messageRepository: Repository<Message>);
    getUserActivity(): Promise<number>;
    getMessageStats(): Promise<number>;
    getDashboardData(): Promise<{
        totalUsers: number;
        totalMessages: number;
    }>;
}
