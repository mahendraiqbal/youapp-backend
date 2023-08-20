import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { DatabaseModule } from 'src/database/database.module';
import { authsProviders } from './auth.providers';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, ...authsProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
