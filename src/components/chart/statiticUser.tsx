import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo() {
      return (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: ['Connectés', 'Total', 'Non connectés'],
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: [2, 5, 3], label: 'Utilisateurs'
            },
          ]}
          width={500}
          height={300}
        />
      );
    }