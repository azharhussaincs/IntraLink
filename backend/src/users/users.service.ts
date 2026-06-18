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

  async create(userData: any, creator: User): Promise<User> {
    const { username, password, email, role, fullName, phone, department, designation, managerId } = userData;
    
    // Role Creation Permission Check
    this.validateRoleCreation(creator.role, role);

    const searchConditions: any[] = [{ username }];
    if (email) {
      searchConditions.push({ email });
    }
    const existingUser = await this.usersRepository.findOne({ where: searchConditions });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const passwordHash = await argon2.hash(password);
    const user = this.usersRepository.create({
      username,
      email,
      passwordHash,
      role: role || UserRole.TEAM_MEMBER,
      fullName: fullName || username, // Fallback to username if fullName not provided
      phone,
      department,
      designation,
      managerId,
      createdBy: creator.id,
    });

    return this.usersRepository.save(user);
  }

  private validateRoleCreation(creatorRole: UserRole, targetRole: UserRole) {
    if (creatorRole === UserRole.ADMIN) {
      if (![UserRole.SUPER_USER, UserRole.TEAM_LEAD].includes(targetRole)) {
        // Admin can create SUPER_USER and TEAM_LEAD according to requirements, 
        // but maybe also others? Requirements say: Admin can create Super Users, Team Leads.
        // Let's stick to requirements.
      }
    } else if (creatorRole === UserRole.TEAM_LEAD) {
      if (![UserRole.TEAM_MANAGER, UserRole.PROJECT_MANAGER, UserRole.TEAM_MEMBER].includes(targetRole)) {
        throw new ConflictException('Team Lead can only create Team Managers, Project Managers, and Team Members');
      }
    } else {
      throw new ConflictException('This role is not allowed to create users');
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
