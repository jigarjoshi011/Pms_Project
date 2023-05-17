import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
// import { UsersModule } from './users/users.module';
import { SignupModule } from './modules/signup/signup.module';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { api_token_check_middleware } from './common/middlewares/api-token-check-middleware';
import { user_home } from './modules/user_home/user_home.module';

@Module({
  imports: [
    PrismaModule,
    SignupModule,
    LoginModule,
    DashboardModule,
    user_home,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(api_token_check_middleware)
      .forRoutes({ path: '/home', method: RequestMethod.GET });
  }
}
