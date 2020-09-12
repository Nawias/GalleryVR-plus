import { Controller, Get, UseGuards, Req, Session } from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'express';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Session() session) {
    return this.googleService.googleLogin(req, session);
  }

  @Get('listFiles')
  async googleDriveListFiles(@Req() request, @Session() session) {
    return await this.googleService.listFiles(request, session);
  }
}
