import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function BuySellDistribution({ title = 'Buy vs. Sell Distribution', chart, ...other }) {
  const theme = useTheme();

  const series = chart.series.map((item) => item.value);
  const labels = chart.series.map((item) => item.label);
  const colors = chart.colors ?? ['#22C55E', '#EF4444']; // green, red

  const chartOptions = useChart({
    chart: {
      type: 'donut',
    },
    labels,
    colors,
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (val) => fCurrency(val),
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Math.round(val)}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Chart type="donut" series={series} options={chartOptions} width={280} height={280} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 1,
          p: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            bgcolor: '#F0FDF4',
            borderRadius: 2,
            p: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Buy Volume
          </Typography>
          <Typography variant="h6" sx={{ color: '#16A34A' }}>
            {fCurrency(chart.series[0].value)}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            bgcolor: '#FEF2F2',
            borderRadius: 2,
            p: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Sell Volume
          </Typography>
          <Typography variant="h6" sx={{ color: '#DC2626' }}>
            {fCurrency(chart.series[1].value)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
