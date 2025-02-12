import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { getOrderByIdReport } from '../reports';
import { PrinterService } from '../printer';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('StoreReportsService');

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DB UP');
  }

  async getOrderReportById(orderID: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderID,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderID} not found`);
    }
    const docDefinition = getOrderByIdReport({ order: order as any });

    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
