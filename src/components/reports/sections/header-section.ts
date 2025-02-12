import type { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface Opt {
  title?: string;
  subTitulo?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  //width: 150,
};

export const headerSection = (opt: Opt): Content => {
  const { title, subTitulo, showDate = true, showLogo = true } = opt;

  const headerLogo: Content = showLogo ? logo : '';

  const headerDate: Content = showDate ? currentDate : { text: '' };

  const headerSubTitle: Content = subTitulo
    ? {
        text: subTitulo,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
        },
      }
    : '';

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubTitle,
        ],
      }
    : '';

  return {
    columns: [
      headerLogo,
      headerTitle,
      {
        ...headerDate,
        width: 200,
      },
    ],
  };
};
