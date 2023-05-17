import { Module } from '@nestjs/common';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { DashboardController } from '../dashboard/controller/dashboard.controller';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
