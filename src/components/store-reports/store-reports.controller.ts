import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderID')
  async getOrderReportById(
    @Res() response: Response,
    @Param('orderID', ParseIntPipe) orderID: number,
  ) {
    const pdfDoc = await this.storeReportsService.getOrderReportById(orderID);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('svgs-chart')
  async getSvgsChart(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSvgsChart();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'svgs-chart';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
