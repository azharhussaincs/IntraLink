import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: any, creator: User): Promise<User>;
    private validateRoleCreation;
    findAll(): Promise<User[]>;
    findOneByUsername(username: string): Promise<User | undefined>;
    findOneById(id: string): Promise<User | undefined>;
}
