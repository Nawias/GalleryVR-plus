import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './google/google.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SessionStorageModule } from './session/session.module';
import { PassportModule } from '@nestjs/passport';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { Repository } from 'typeorm';
import { Session } from './session/session.entity';
import { TypeormStore } from 'typeorm-store';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'google',
      session: true,
    }),
    SessionModule.forRootAsync({
      imports: [SessionStorageModule],
      inject: ['SESSION_REPOSITORY'],
      useFactory: (repository: Repository<Session>): NestSessionOptions => {
        return {
          session: {
            secret: 'gallerygobrr',
            store: new TypeormStore({ repository: repository }),
          },
        };
      },
    }),
    GoogleModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
