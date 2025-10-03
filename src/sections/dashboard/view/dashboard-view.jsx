import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { ChartSelect } from 'src/components/chart';

import { TradeVolume } from '../trade-volume';
import { GoldLiveRate } from '../gold-live-rate';
import { TradingProducts } from '../trading-products';
import { DashboardWidget } from '../dashboard-widget';
import { GoldPriceTrends } from '../gold-price-trends';
import { RecentActivities } from '../recent-activities';
import { BuySellDistribution } from '../buy-sell-distribution';
import { TopPerformingTraders } from '../top-performing-traders';

const recentActivities = [
  {
    id: 1,
    type: 'sell',
    title: 'New Sell Order',
    user: 'Jane Smith',
    time: '25 mins ago',
    amount: '-$1,890',
  },
  {
    id: 2,
    type: 'buy',
    title: 'New Buy Order',
    user: 'Jane Smith',
    time: '25 mins ago',
    amount: '-$1,890',
  },
  {
    id: 3,
    type: 'sell',
    title: 'New Sell Order',
    user: 'Jane Smith',
    time: '25 mins ago',
    amount: '-$1,890',
  },
  {
    id: 4,
    type: 'sell',
    title: 'New Sell Order',
    user: 'Jane Smith',
    time: '25 mins ago',
    amount: '-$1,890',
  },
  {
    id: 5,
    type: 'buy',
    title: 'New Buy Order',
    user: 'Jane Smith',
    time: '25 mins ago',
    amount: '-$1,890',
  },
];

const options = ['1 Month', '3 Months', '6 Months'];

export function DashboardView() {
  const [range, setRange] = useState('6 Months');

  const handleChange = (newValue) => {
    setRange(newValue);
    console.log('Selected range:', newValue);
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Dashboard Overview</Typography>
        <ChartSelect options={options} value={`Last ${range}`} onChange={handleChange} />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <DashboardWidget title="Total Users" percent={2.6} total={18765} icon="tabler:users" />
        </Grid>

        <Grid xs={12} md={4}>
          <DashboardWidget
            title="Total Open Traders"
            percent={0.2}
            total={4876}
            icon="eva:trending-up-fill"
            color="warning"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <DashboardWidget
            title="Daily Trade Volume"
            percent={-0.1}
            total={678}
            icon="bx:dollar"
            color="success"
            dollar
          />
        </Grid>
        <Grid xs={12} md={7}>
          <GoldPriceTrends />
        </Grid>
        <Grid xs={12} md={5}>
          <GoldLiveRate title="Gold (OZ) Live Rate" />
        </Grid>
        <Grid xs={12}>
          <TradingProducts />
        </Grid>
        <Grid xs={12} md={6}>
          <BuySellDistribution
            title="Buy vs. Sell Distribution"
            chart={{
              series: [
                { label: 'Buy Orders', value: 65 },
                { label: 'Sell Orders', value: 35 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TradeVolume
            title="Trade Volume"
            chart={{
              series: [
                {
                  name: 'Daily',
                  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  data: [{ name: 'Volume', data: [119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: 'Weekly',
                  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                  data: [{ name: 'Volume', data: [24, 41, 35, 151, 49] }],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TopPerformingTraders
            title="Top Performing Traders"
            chart={{
              categories: ['Sibin', 'Rahul', 'Meera', 'John', 'Fatima'],
              series: [
                {
                  name: 'Profit',
                  data: [10000, 8500, 7200, 6400, 5200],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <RecentActivities title="News" list={recentActivities} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
