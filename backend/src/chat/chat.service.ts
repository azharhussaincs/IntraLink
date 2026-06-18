import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveMessage(data: { content: string; senderId: string; receiverId?: string; groupId?: string }) {
    const sender = await this.userRepository.findOne({ where: { id: data.senderId } });
    const message = this.messageRepository.create({
      content: data.content,
      sender,
      receiverId: data.receiverId,
      groupId: data.groupId,
    });
    return this.messageRepository.save(message);
  }

  async getMessages(groupId?: string, receiverId?: string, senderId?: string) {
    // Basic logic for fetching history
    const where = groupId ? { groupId } : [{ receiverId, sender: { id: senderId } }, { receiverId: senderId, sender: { id: receiverId } }];
    return this.messageRepository.find({
      where,
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }
}
