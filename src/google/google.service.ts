import { Injectable, Session } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { google, drive_v3, Auth } from 'googleapis';
import config from './google.config';

@Injectable()
export class GoogleService {
  oAuth2Client: Auth.OAuth2Client;
  drive: drive_v3.Drive;
  constructor() {
    const { client_id, client_secret, redirect_uris } = config.web;
    this.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
    this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });

    this.oAuth2Client.on('tokens', tokens => {
      if (tokens.refresh_token) {
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
    });
  }
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

  async listFiles(request, @Session() session) {
    this.oAuth2Client.setCredentials({
      refresh_token: session.refreshToken,
      access_token: session.accessToken,
    });
    let result = (
      await this.drive.files.list({
        corpora: 'user',
      })
    ).data;
    this.oAuth2Client.setCredentials({});
    return result;
  }
}
