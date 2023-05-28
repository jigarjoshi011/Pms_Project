import { Body, Controller, Get, HttpStatus, Post, Render, Req, Res } from '@nestjs/common';
import { SignupService } from '../services/signup.service';
import { getSignUpUserDTO } from '../DTOs/getSignUpUser.dto';
import { Request, Response } from 'express';

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
  async getSignup( @Req() req: Request,
  @Res() res: Response,@Body() getSignUpUser: getSignUpUserDTO) {
   const result : any =  await this.signupService.getSignUpUser(getSignUpUser);
   console.log(result);
   
   if(result.status===400){
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      data: result,
      message: `Failed to Sign-Up`,
    });
   }
   else{
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully Registered`,
    });
   }

  
  }
}
