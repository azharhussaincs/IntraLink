import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async createGroup(name: string, creator: User, memberIds: string[]) {
    const group = this.groupRepository.create({
      name,
      createdBy: creator,
      members: memberIds.map(id => ({ id } as User)),
    });
    return this.groupRepository.save(group);
  }

  async findAll() {
    return this.groupRepository.find({ relations: ['members'] });
  }
}
