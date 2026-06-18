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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const user_entity_1 = require("../users/entities/user.entity");
const role_enum_1 = require("../roles/role.enum");
let ChatService = class ChatService {
    constructor(messageRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async validateMessagingPermission(senderId, receiverId, groupId) {
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        if (!sender)
            throw new common_1.ForbiddenException('Sender not found');
        if (receiverId) {
            const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
            if (!receiver)
                throw new common_1.ForbiddenException('Receiver not found');
            if ([role_enum_1.UserRole.ADMIN, role_enum_1.UserRole.SUPER_USER].includes(sender.role))
                return true;
            if (sender.role === role_enum_1.UserRole.TEAM_LEAD) {
                if (receiver.role === role_enum_1.UserRole.TEAM_LEAD)
                    return true;
                if (receiver.managerId === sender.id)
                    return true;
                return true;
            }
            if (sender.role === role_enum_1.UserRole.TEAM_MANAGER) {
                if (receiver.managerId === sender.id || receiver.id === sender.managerId)
                    return true;
            }
            if (sender.role === role_enum_1.UserRole.PROJECT_MANAGER) {
                if (receiver.managerId === sender.id || receiver.id === sender.managerId)
                    return true;
            }
            if (sender.role === role_enum_1.UserRole.TEAM_MEMBER) {
                if (receiver.managerId === sender.managerId || receiver.id === sender.managerId)
                    return true;
            }
            return true;
        }
        if (groupId) {
            return true;
        }
        return true;
    }
    async saveMessage(data) {
        await this.validateMessagingPermission(data.senderId, data.receiverId, data.groupId);
        const sender = await this.userRepository.findOne({ where: { id: data.senderId } });
        const message = this.messageRepository.create({
            content: data.content,
            sender,
            receiverId: data.receiverId,
            groupId: data.groupId,
        });
        return this.messageRepository.save(message);
    }
    async getMessages(groupId, receiverId, senderId) {
        const where = groupId ? { groupId } : [{ receiverId, sender: { id: senderId } }, { receiverId: senderId, sender: { id: receiverId } }];
        return this.messageRepository.find({
            where,
            relations: ['sender'],
            order: { createdAt: 'ASC' },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map