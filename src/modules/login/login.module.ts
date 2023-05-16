import { Module } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [LoginController],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
