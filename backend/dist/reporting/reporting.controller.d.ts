import { ReportingService } from './reporting.service';
export declare class ReportingController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    getDashboard(): Promise<{
        totalUsers: number;
        totalMessages: number;
    }>;
}
