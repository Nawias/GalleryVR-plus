import {
  Controller,
  Get,
  UseGuards,
  Req,
  Session,
  Query,
  Res,
  Header,
} from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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
  async googleDriveListFiles(
    @Req() request,
    @Session() session,
    @Query('parent') parent,
  ) {
    return await this.googleService.listFiles(parent, session);
  }

  @Get('file')
  async googleDriveGetFile(
    @Req() request: Request,
    @Session() session,
    @Query('fileId') fileId,
    @Res() response: Response,
  ) {
    this.googleService.getFile(fileId, session, response);
  }
}
