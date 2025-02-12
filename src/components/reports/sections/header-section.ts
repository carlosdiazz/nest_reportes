import { Content } from 'pdfmake/interfaces';
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

export const headerSection = (opt: Opt): Content => {
  const { title, subTitulo, showDate = true, showLogo = true } = opt;

  const headerLogo: Content = showLogo ? logo : '';

  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : '';

  const headerTitle: Content = title
    ? {
        text: title,
        bold: true,
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
