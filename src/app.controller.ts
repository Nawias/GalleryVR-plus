import { Controller, Get, Req, Session } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(@Session() session, @Req() request: Request) {
    console.log(session);
    if (session.accessToken === undefined) request.res.status(401);
    else return request.headers.cookie;
  }
}
