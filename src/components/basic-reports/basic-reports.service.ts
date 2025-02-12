import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer';
import {
  getCountriesReport,
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
} from '../reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('BasicReportsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DB UP');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  public hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Carlos',
    });

    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  public employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  public async employmentLetterById(employeedId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeedId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeedId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerCompany: 'Diaz Code',
      employerName: 'Carlos Jose Diaz',
      employerPosition: 'CEO',
      employeeHours: employee.hours_per_day,
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
    });

    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  public async getCountries() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });

    const docDefinition = getCountriesReport({
      countries,
      title: 'Countries Report',
      subTitle: 'List of countries',
    });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }

  public async getCountriesByName(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const countries = await this.countries.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
        local_name: {
          not: null,
        },
      },
    });

    const docDefinition = getCountriesReport({
      countries,
      title: 'Countries Report',
      subTitle: 'List of countries',
    });
    const doc = this.printerService.createPDF(docDefinition);
    return doc;
  }
}
