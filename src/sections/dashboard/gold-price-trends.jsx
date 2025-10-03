import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useTabs } from 'src/hooks/use-tabs';

import { Chart, useChart } from 'src/components/chart';
import { CustomTabs } from 'src/components/custom-tabs';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'day',
    label: '1D',
    chart: {
      series: [{ name: 'Gold', data: [5800, 5820, 5840, 5815, 5835] }],
      categories: ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'],
    },
  },
  {
    value: 'week',
    label: '1W',
    chart: {
      series: [{ name: 'Gold', data: [5700, 5750, 5800, 5850, 5900, 5880, 5920] }],
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  },
  {
    value: 'month',
    label: '1M',
    chart: {
      series: [{ name: 'Gold', data: [5600, 5650, 5700, 5800] }],
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
  },
  {
    value: 'quarter',
    label: '3M',
    chart: {
      series: [{ name: 'Gold', data: [5400, 5600, 5800] }],
      categories: ['Jan', 'Feb', 'Mar'],
    },
  },
  {
    value: 'year',
    label: '1Y',
    chart: {
      series: [
        {
          name: 'Gold',
          data: [5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 7000, 7200],
        },
      ],
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  },
];

// ----------------------------------------------------------------------

export function GoldPriceTrends({ sx, ...other }) {
  const theme = useTheme();
  const tabs = useTabs('day');

  const currentTab = TABS.find((tab) => tab.value === tabs.value);

  const chartOptions = useChart({
    colors: [theme.palette.primary.main],
    xaxis: { categories: currentTab?.chart.categories },
    stroke: { width: 3 },
    tooltip: {
      y: { formatter: (value) => value, title: { formatter: () => 'Price' } },
    },
  });

  const renderTabs = (
    <CustomTabs
      value={tabs.value}
      onChange={tabs.onChange}
      variant="fullWidth"
      sx={{ borderRadius: 2 }}
    >
      {TABS.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
    </CustomTabs>
  );

  return (
    <Card sx={{ ...sx }} {...other}>
      <CardHeader title="Gold Price Trends" action={renderTabs} />

      <Chart
        type="line"
        series={currentTab?.chart.series || []}
        options={chartOptions}
        height={270}
      />
    </Card>
  );
}
