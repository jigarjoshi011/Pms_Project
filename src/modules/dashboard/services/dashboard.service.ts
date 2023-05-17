import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getDashboards() {
    try {
      console.log('hello');
    } catch (error) {}
  }
}
