import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { countries as Country } from '@prisma/client';
import { headerSection } from './sections/header-section';
import { footerSection } from './sections/footer.section';

interface Opt {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountriesReport = (opt: Opt): TDocumentDefinitions => {
  const { title, subTitle, countries } = opt;

  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitulo: subTitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        //layout: 'lightHorizontalLines', // optional
        layout: 'customLayout01',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local name'],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            ...countries.map((country) => [
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              country.id.toString(),
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              country.iso2,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              country.iso3 ?? '',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              { text: country.name ?? '', bold: true },
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              country.continent ?? '',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              country.local_name ?? '',
            ]),
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            [
              { text: 'Total de paises', bold: true, colSpan: 2 },
              {},
              {},
              { text: `${countries.length.toString()} paises`, bold: true },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
