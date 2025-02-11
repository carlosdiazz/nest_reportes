import { Controller, Get } from '@nestjs/common';
import { ResponsePropio } from 'src/common';

@Controller('app')
export class AppController {
  constructor() {}

  @Get('healthcheck')
  healthcheck(): ResponsePropio {
    return {
      message: 'Server Up',
      statusCode: 200,
    };
  }
}
