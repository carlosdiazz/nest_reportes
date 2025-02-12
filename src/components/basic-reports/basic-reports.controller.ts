import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get('hola-mundo')
  hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeID')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeID', ParseIntPipe) employeeID: number,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(employeeID);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
