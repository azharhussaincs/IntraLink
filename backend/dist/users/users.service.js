"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const argon2 = require("argon2");
const role_enum_1 = require("../roles/role.enum");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(userData, creator) {
        const { username, password, email, role, fullName, phone, department, designation, managerId } = userData;
        this.validateRoleCreation(creator.role, role);
        const searchConditions = [{ username }];
        if (email) {
            searchConditions.push({ email });
        }
        const existingUser = await this.usersRepository.findOne({ where: searchConditions });
        if (existingUser) {
            throw new common_1.ConflictException('Username or email already exists');
        }
        const passwordHash = await argon2.hash(password);
        const user = this.usersRepository.create({
            username,
            email,
            passwordHash,
            role: role || role_enum_1.UserRole.TEAM_MEMBER,
            fullName: fullName || username,
            phone,
            department,
            designation,
            managerId,
            createdBy: creator.id,
        });
        return this.usersRepository.save(user);
    }
    validateRoleCreation(creatorRole, targetRole) {
        if (creatorRole === role_enum_1.UserRole.ADMIN) {
            if (![role_enum_1.UserRole.SUPER_USER, role_enum_1.UserRole.TEAM_LEAD].includes(targetRole)) {
            }
        }
        else if (creatorRole === role_enum_1.UserRole.TEAM_LEAD) {
            if (![role_enum_1.UserRole.TEAM_MANAGER, role_enum_1.UserRole.PROJECT_MANAGER, role_enum_1.UserRole.TEAM_MEMBER].includes(targetRole)) {
                throw new common_1.ConflictException('Team Lead can only create Team Managers, Project Managers, and Team Members');
            }
        }
        else {
            throw new common_1.ConflictException('This role is not allowed to create users');
        }
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOneByUsername(username) {
        return this.usersRepository.findOne({ where: { username } });
    }
    async findOneById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map