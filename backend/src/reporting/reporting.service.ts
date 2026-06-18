import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Message } from '../chat/entities/message.entity';

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async getUserActivity() {
    return this.userRepository.count();
  }

  async getMessageStats() {
    return this.messageRepository.count();
  }

  async getDashboardData() {
    const userCount = await this.getUserActivity();
    const messageCount = await this.getMessageStats();
    return {
      totalUsers: userCount,
      totalMessages: messageCount,
      // Add more stats as needed
    };
  }
}
