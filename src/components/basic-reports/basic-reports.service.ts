import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PdfPrinter from 'pdfmake';
//TODO

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('BasicReportsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DB UP');
  }

  async hello() {}
}
