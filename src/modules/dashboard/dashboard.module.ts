import { Module } from '@nestjs/common';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { DashboardController } from '../dashboard/controller/dashboard.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, JwtService],
})
export class DashboardModule {}
