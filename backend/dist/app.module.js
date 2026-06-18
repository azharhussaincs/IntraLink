"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = crypto.webcrypto || crypto;
}
if (typeof globalThis.crypto.randomUUID === 'undefined') {
    globalThis.crypto.randomUUID = () => crypto.randomUUID();
}
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const chat_module_1 = require("./chat/chat.module");
const files_module_1 = require("./files/files.module");
const groups_module_1 = require("./groups/groups.module");
const roles_module_1 = require("./roles/roles.module");
const reporting_module_1 = require("./reporting/reporting.module");
const user_entity_1 = require("./users/entities/user.entity");
const message_entity_1 = require("./chat/entities/message.entity");
const group_entity_1 = require("./groups/entities/group.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [user_entity_1.User, message_entity_1.Message, group_entity_1.Group],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            chat_module_1.ChatModule,
            files_module_1.FilesModule,
            groups_module_1.GroupsModule,
            roles_module_1.RolesModule,
            reporting_module_1.ReportingModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map