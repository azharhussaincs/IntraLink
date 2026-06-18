import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string; // This will be encrypted

  @ManyToOne(() => User)
  sender: User;

  @Column({ nullable: true })
  receiverId: string; // For DM

  @Column({ nullable: true })
  groupId: string; // For Group Chat

  @CreateDateColumn()
  createdAt: Date;
}
