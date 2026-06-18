import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { User } from '../users/entities/user.entity';
import { Message } from '../chat/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}
