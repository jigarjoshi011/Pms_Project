import { Injectable } from '@nestjs/common';

@Injectable()
export class user_homeService {
  async getuser_home() {
    try {
      console.log('user_home');
    } catch (error) {}
  }
}
