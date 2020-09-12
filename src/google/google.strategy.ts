import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';
import config from './google.config';
import { VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: config.web.client_id,
      clientSecret: config.web.client_secret,
      callbackURL: config.web.redirect_uris[0],
      scope: [
        'email',
        'profile',
        'openid',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    await this.usersService.findOrCreate(profile).then(u => {
      let user = {
        id: u.id,
        googleId: u.googleId,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        accessToken,
        refreshToken,
      };
      done(null, user);
    });
  }
}
