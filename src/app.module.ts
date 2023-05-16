import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
// import { UsersModule } from './users/users.module';
import { SignupModule } from './modules/signup/signup.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [PrismaModule, SignupModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
