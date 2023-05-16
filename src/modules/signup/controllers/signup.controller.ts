import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { SignupService } from '../services/signup.service';
import { getSignUpUserDTO } from '../DTOs/getSignUpUser.dto';
import { Response } from 'express';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Get('')
  @Render('register')
  roots() {
    console.log('register');

    return;
  }

  @Post('')
  async getSignup(@Body() getSignUpUser: getSignUpUserDTO) {
    await this.signupService.getSignUpUser(getSignUpUser);
    if (await this.signupService.getSignUpUser(getSignUpUser)) {
      return { message: 'signup successful' };
    }
  }
}
