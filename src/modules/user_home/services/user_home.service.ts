import { Injectable } from '@nestjs/common';

@Injectable()
export class user_homeService {
  async getuser_home() {
    try {
      console.log('user_home');
    } catch (error) {}
  }
  async AddToCart(data) {
    try {
      console.log(
        '🚀 ~ file: user_home.service.ts:11 ~ user_homeService ~ AddToCart ~ data:',
        data,
      );

      console.log('user_home');
    } catch (error) {}
  }
}
