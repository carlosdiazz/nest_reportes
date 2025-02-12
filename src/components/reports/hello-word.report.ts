import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface Props {
  name: string;
}

export const getHelloWorldReport = (data: Props): TDocumentDefinitions => {
  const { name } = data;

  const docDefinition: TDocumentDefinitions = {
    content: [`Hola mundo ${name}`],
  };

  return docDefinition;
};
