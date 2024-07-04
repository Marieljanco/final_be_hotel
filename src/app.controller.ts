import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('saludar')
  saludar(): string {
    return this.appService.saludar();
  }

  @Post('saludar')
  saludarPost(): string {
    return this.appService.saludar();
  }
}
