import { Injectable, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/users/user.entity';
import { google, drive_v3, Auth } from 'googleapis';
import config from './google.config';
import { file } from 'googleapis/build/src/apis/file';

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
    this.oAuth2Client.setCredentials({
      refresh_token: session.refreshToken,
      access_token: session.accessToken,
    });
    const { id, googleId, firstName, lastName, email } = req.user;

    return {
      message: 'User information from google',
      user: { id, googleId, firstName, lastName, email },
    };
  }

  async listFiles(parent, @Session() session) {
    if (session.accessToken !== undefined)
      this.oAuth2Client.setCredentials({
        refresh_token: session.refreshToken,
        access_token: session.accessToken,
      });
    let parentFolder =
      parent !== undefined && parent !== '' && parent !== 'undefined'
        ? parent
        : await this.getRootFolder();
    let result = (
      await this.drive.files.list({
        q: `(mimeType='application/vnd.google-apps.folder' or mimeType contains 'image/' or mimeType contains 'video/') and '${parentFolder}' in parents`,
        fields: 'files(id, name,parents, mimeType, webContentLink)',
        spaces: 'drive',
      })
    ).data.files;
    //this.oAuth2Client.setCredentials({});
    return result;
  }
  async getRootFolder() {
    let rootFolder = '';
    let folders = (
      await this.drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder'`,
        fields: 'files(id, name,parents)',
        spaces: 'drive',
      })
    ).data.files;
    folders.forEach(folder => {
      folder.parents.forEach(parent => {
        if (folders.find(f => f.id == parent) === undefined)
          rootFolder = parent;
      });
    });

    return rootFolder;
  }

  async getFile(fileId: any, session: any, response: Response): Promise<any> {
    if (session.accessToken !== undefined)
      this.oAuth2Client.setCredentials({
        refresh_token: session.refreshToken,
        access_token: session.accessToken,
      });

    this.drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' },
      async (err, res) => {
        res.data
          .on('end', () => {
            console.log('Done');
          })
          .on('error', err => {
            console.log('Error', err);
          })
          .pipe(response);
      },
    );
  }
}
