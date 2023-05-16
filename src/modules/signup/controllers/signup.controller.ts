import { Body, Controller, Post, Response } from '@nestjs/common';
import { SignupService } from '../services/signup.service';
import { getSignUpUserDTO } from '../DTOs/getSignUpUser.dto';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post('')
  async getSignup(@Body() getSignUpUser: getSignUpUserDTO) {
    await this.signupService.getSignUpUser(getSignUpUser);
    if (await this.signupService.getSignUpUser(getSignUpUser)) {
      return { message: 'signup successful' };
    }
  }
}
