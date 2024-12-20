import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';

const series = [
  {
    data: [
      { id: 0, value: 10, label: 'TIMONI' },
      { id: 1, value: 15, label: 'GEMOJ' },
      { id: 2, value: 20, label: 'KISSAIE' },
    ],
  },
];

export default function StatisticProject() {

  return (
    <Stack>
      <PieChart
        series={series}
        width={400}
        height={200}
      />
    </Stack>
  );
}