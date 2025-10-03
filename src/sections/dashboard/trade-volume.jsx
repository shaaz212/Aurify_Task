import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fCurrency } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function TradeVolume({ title = 'Trade Volume', chart, ...other }) {
  const theme = useTheme();

  const [view, setView] = useState('Daily');

  const currentSeries = chart.series.find((i) => i.name === view);

  const chartOptions = useChart({
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '40%', borderRadius: 4 } },
    xaxis: { categories: currentSeries?.categories },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (val) => `${fCurrency(val)} `,
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${(val / 1000).toFixed(1)}M`,
      },
    },
    colors: ['#3A75B7'],
  });

  const total = currentSeries?.data[0].data.reduce((a, b) => a + b, 0) || 0;
  const average = total / (currentSeries?.categories.length || 1);
  const highest = Math.max(...currentSeries.data[0].data);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              color="info"
              sx={{
                bgcolor: view === 'Daily' ? 'primary.lighter' : 'transparent',
                color: view === 'Daily' ? 'primary.main' : 'text.secondary',
              }}
              onClick={() => setView('Daily')}
            >
              Daily
            </Button>

            <Button
              size="small"
              color="info"
              sx={{
                bgcolor: view === 'Weekly' ? 'primary.lighter' : 'transparent',
                color: view === 'Weekly' ? 'primary.main' : 'text.secondary',
              }}
              onClick={() => setView('Weekly')}
            >
              Weekly
            </Button>
          </Box>
        }
      />

      <Chart type="bar" series={currentSeries?.data} options={chartOptions} height={320} />

      {/* Bottom Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Volume
          </Typography>
          <Typography variant="subtitle1" fontSize={14}>
            {fCurrency(total)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Average
          </Typography>
          <Typography variant="subtitle1" fontSize={14}>
            {fCurrency(average)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Highest
          </Typography>
          <Typography variant="subtitle1" fontSize={14}>
            {fCurrency(highest)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
