import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export const dataset = [
    {
        agl: 59,
        socopao: 57,
        camrail: 86,
        kct: 21,
        company: 'Sociétés',
    },
  ];
  

const chartSetting = {
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function StatisticCompany() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'company' }]}
      series={[
        { dataKey: 'agl', label: 'AGL'},
        { dataKey: 'socopao', label: 'Socopao'},
        { dataKey: 'camrail', label: 'Camrail'},
        { dataKey: 'kct', label: 'KCT'},
      ]}
      {...chartSetting}
    />
  );
}