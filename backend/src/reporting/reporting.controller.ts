import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { UserRole } from '../roles/role.enum';

@Controller('reporting')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('dashboard')
  @Roles(UserRole.ADMIN, UserRole.SUPER_USER, UserRole.TEAM_LEAD)
  async getDashboard() {
    return this.reportingService.getDashboardData();
  }
}
