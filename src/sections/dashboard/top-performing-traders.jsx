import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { fNumber, fShortenNumber } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function TopPerformingTraders({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    hexAlpha(theme.palette.primary.dark, 0.24),
  ];

  const chartOptions = useChart({
    colors: ['#3A75B7'],
    stroke: { width: 2, colors: ['transparent'] },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `$${fNumber(value)}`,
        title: { formatter: (seriesName) => `${seriesName}: ` },
      },
    },
    xaxis: {
      categories: chart.categories,
      labels: {
        formatter: (value) => `$${fShortenNumber(value)}`,
      },
      tickAmount: 5,
    },

    dataLabels: {
      enabled: true,
      offsetX: -6,
      formatter: (val) => `$${fShortenNumber(val)}`,
      style: { fontSize: '10px', colors: ['#FFFFFF', theme.palette.text.primary] },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 3,
        barHeight: '60%',
        dataLabels: { position: 'top' },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button color="info" sx={{ color: 'info.dark', fontWeight: 500 }}>
            View All
          </Button>
        }
      />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={360}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
