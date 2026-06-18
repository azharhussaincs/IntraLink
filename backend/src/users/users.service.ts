import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UserRole } from '../roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, email: string, password: string, role: UserRole = UserRole.TEAM_MEMBER): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: [{ username }, { email }] });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const passwordHash = await argon2.hash(password);
    const user = this.usersRepository.create({
      username,
      email,
      passwordHash,
      role,
    });

    return this.usersRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
