import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { chartJsToImage } from 'src/helpers';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };
  return chartJsToImage(chartConfig);
};

export const getBasicChartSvggReport =
  async (): Promise<TDocumentDefinitions> => {
    const chart = await generateChartImage();

    return {
      content: [
        {
          svg: svgContent,
          width: 150,
        },
        {
          image: chart,
          width: 500,
        },
      ],
    };
  };
