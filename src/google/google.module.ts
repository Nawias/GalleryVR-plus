import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthGuard } from 'src/google.auth.guard';
import { UsersModule } from 'src/users/users.module';
import { GoogleController } from './google.controller';
import { GoogleSerializer } from './google.serializer';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [UsersModule, HttpModule, TypeOrmModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy, GoogleSerializer, GoogleAuthGuard],
})
export class GoogleModule {}
