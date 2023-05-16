import { Module } from '@nestjs/common';
import { SignupService } from './services/signup.service';
import { SignupController } from './controllers/signup.controller';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
