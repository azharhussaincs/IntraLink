import { User } from '../../users/entities/user.entity';
export declare class Group {
    id: string;
    name: string;
    createdBy: User;
    members: User[];
    createdAt: Date;
}
