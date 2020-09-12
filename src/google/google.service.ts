import { Injectable, Session } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

@Injectable()
export class GoogleService {
  googleLogin(req, @Session() session) {
    if (!req.user) {
      return 'No user from google';
    }
    const { accessToken, refreshToken } = req.user;
    session.accessToken = accessToken;
    session.refreshToken = refreshToken;

    const { id, googleId, firstName, lastName, email } = req.user;

    return {
      message: 'User information from google',
      user: { id, googleId, firstName, lastName, email },
    };
  }
}
