import { UserRole } from '../../roles/role.enum';
export declare class User {
    id: string;
    username: string;
    fullName: string;
    passwordHash: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    role: UserRole;
    managerId: string;
    createdBy: string;
    status: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
