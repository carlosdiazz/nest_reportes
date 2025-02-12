import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  BasicReportsModule,
  PrinterModule,
  StoreReportsModule,
} from 'src/components';

@Module({
  imports: [BasicReportsModule, PrinterModule, StoreReportsModule],
  controllers: [AppController],
})
export class AppModule {}
