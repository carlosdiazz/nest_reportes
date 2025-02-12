import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BasicReportsModule, PrinterModule } from 'src/components';

@Module({
  imports: [BasicReportsModule, PrinterModule],
  controllers: [AppController],
})
export class AppModule {}
