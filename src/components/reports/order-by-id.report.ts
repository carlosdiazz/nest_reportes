import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';
import { Order } from 'src/interface';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },

  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

interface ReportValues {
  title?: string;
  subTitle?: string;
  order: Order;
}

export const getOrderByIdReport = (opt: ReportValues): TDocumentDefinitions => {
  const { order } = opt;
  const { customer_id, customers, order_date, order_details, order_id } = order;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.25;

  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      //Header
      {
        text: 'Tucan Code',
        style: 'header',
      },
      //Direccion
      {
        columns: [
          {
            text: '\nRepublica Dominicana, Santo Santiago, Las Montanas, calle 10, #76\n\n',
          },
          {
            text: [
              { text: `Recibo No. ${order.order_id}\n`, bold: true },
              `Fecha del recibo ${DateFormatter.getDDMMMYYYY(order.order_date)}\nFecha del pago ${DateFormatter.getDDMMMYYYY(new Date())}\n\n`,
            ],
            alignment: 'right',
          },
        ],
      },
      //QR
      { qr: 'https://www.diazcode.com/', fit: 75, alignment: 'right' },

      //Direccion del cliente
      {
        text: [
          { text: 'Cobrar a: \n', style: 'subHeader' },
          `Razon social: ${customers.customer_name}\n`,
          `Contacto: ${customers.contact_name}`,
        ],
      },

      //Tabla del detalle de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],

            ...order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              {
                text: CurrencyFormatter.formartCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formartCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },

      //Salto de Linea
      '\n\n',

      //Totales
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'SubTotal',
                  {
                    text: CurrencyFormatter.formartCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formartCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
