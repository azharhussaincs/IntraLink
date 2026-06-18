import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../users/entities/user.entity';
export declare class GroupsService {
    private groupRepository;
    constructor(groupRepository: Repository<Group>);
    createGroup(name: string, creator: User, memberIds: string[]): Promise<Group>;
    findAll(): Promise<Group[]>;
}
