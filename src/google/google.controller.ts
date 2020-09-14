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
  async googleAuthRedirect(@Req() req, @Session() session) {
    this.googleService.googleLogin(req, session);
    req.res.redirect('http://localhost:8081/index.html');
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
    @Query('filename') filename,
    @Res() response: Response,
  ) {
    response.header('Content-Disposition', 'inline; filename=' + filename);
    this.googleService.getFile(fileId, session, response);
  }
}
