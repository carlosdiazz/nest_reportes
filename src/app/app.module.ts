import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BasicReportsModule } from 'src/components';

@Module({
  imports: [BasicReportsModule],
  controllers: [AppController],
})
export class AppModule {}
