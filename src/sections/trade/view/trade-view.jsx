import {
  Box,
  Tab,
  Card,
  Stack,
  Divider,
  Typography,
  CardContent,
  ListItemText,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { fCurrency, fNumber } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { CustomTabs } from 'src/components/custom-tabs';
import { Iconify } from 'src/components/iconify';
import { useState } from 'react';

const TABS = [
  { value: 'buy', label: 'Buy Gold' },
  { value: 'sell', label: 'Sell Gold' },
];

// Dummy data for buy/sell tabs
const trades = {
  buy: [
    { title: 'Gold 24K', percent: 1.2, secondary: 'Today', bid: 5000, ask: 5050 },
    { title: 'Gold 22K', percent: 0.8, secondary: 'Today', bid: 4600, ask: 4650 },
    { title: 'Gold 18K', percent: 0.5, secondary: 'Today', bid: 3800, ask: 3850 },
    { title: 'Silver 999', percent: 0.3, secondary: 'Today', bid: 60, ask: 62 },
    { title: 'Silver 925', percent: -0.2, secondary: 'Today', bid: 55, ask: 57 },
    { title: 'Platinum', percent: 0.7, secondary: 'Today', bid: 3500, ask: 3550 },
    { title: 'Palladium', percent: 1.5, secondary: 'Today', bid: 1800, ask: 1850 },
    { title: 'Gold Coin', percent: 1.0, secondary: 'Today', bid: 5100, ask: 5150 },
    { title: 'Silver Coin', percent: -0.1, secondary: 'Today', bid: 65, ask: 66 },
  ],
  sell: [
    { title: 'Gold 24K', percent: -0.5, secondary: 'Today', bid: 4950, ask: 5000 },
    { title: 'Gold 22K', percent: -0.3, secondary: 'Today', bid: 4550, ask: 4600 },
    { title: 'Gold 18K', percent: 0.1, secondary: 'Today', bid: 3750, ask: 3800 },
    { title: 'Silver 999', percent: 0.2, secondary: 'Today', bid: 58, ask: 60 },
    { title: 'Silver 925', percent: -0.4, secondary: 'Today', bid: 53, ask: 55 },
    { title: 'Platinum', percent: 0.5, secondary: 'Today', bid: 3450, ask: 3500 },
    { title: 'Palladium', percent: -1.0, secondary: 'Today', bid: 1750, ask: 1800 },
    { title: 'Gold Coin', percent: 0.3, secondary: 'Today', bid: 5050, ask: 5100 },
    { title: 'Silver Coin', percent: -0.2, secondary: 'Today', bid: 64, ask: 65 },
  ],
};

const amounts = [500, 1000, 2000, 5000, 10000];

export function TradeView() {
  const tabs = useTabs('buy');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState();

  const handleTabChange = (event, newValue) => {
    tabs.onChange(event, newValue);
    setSelectedProduct(null);
    setStep(1);
    setAmount('');
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  const renderTabs = (
    <CustomTabs
      variant="fullWidth"
      value={tabs.value}
      onChange={handleTabChange}
      sx={{
        width: 600,
        borderRadius: 3,
        overflow: 'hidden',
        '& .Mui-selected': {
          color: 'white',
          bgcolor: tabs.value === 'buy' ? '#16A34A' : '#DC2626',
        },
      }}
    >
      {TABS.map((tab, index) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          sx={{
            borderTopLeftRadius: index === 0 ? 5 : 0,
            borderBottomLeftRadius: index === 0 ? 5 : 0,
            borderTopRightRadius: index === TABS.length - 1 ? 5 : 0,
            borderBottomRightRadius: index === TABS.length - 1 ? 5 : 0,
          }}
        />
      ))}
    </CustomTabs>
  );

  const stepOne = (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }}
      gap={1}
      p={2}
    >
      {trades[tabs.value].map((trade, idx) => (
        <Card
          key={idx}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s ease',
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: tabs.value === 'buy' ? '#F0FDF4' : '#FEF2F2',
              transform: 'translateY(-2px)',
              boxShadow: 3,
              borderColor: tabs.value === 'buy' ? '#16A34A' : '#DC2626',
            },
          }}
          onClick={() => {
            setSelectedProduct(trade);
          }}
        >
          <Box p={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2">{trade.title}</Typography>
              <Label color={trade.percent > 0 ? 'success' : 'error'}>{trade.percent}%</Label>
            </Box>
            <Typography variant="body2" fontSize={12} color="text.secondary">
              1TTB
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(2,1fr)" gap={2} mt={3}>
              <ListItemText
                primary="Bid"
                secondary={fNumber(trade.bid)}
                primaryTypographyProps={{ color: 'text.secondary', variant: 'caption' }}
                secondaryTypographyProps={{ color: 'text.primary', variant: 'subtitle2' }}
              />
              <ListItemText
                primary="Ask"
                secondary={fNumber(trade.ask)}
                primaryTypographyProps={{ color: 'text.secondary', variant: 'caption' }}
                secondaryTypographyProps={{ color: 'text.primary', variant: 'subtitle2' }}
              />
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );

  const stepTwo = (
    <Box display="flex" justifyContent="center" width="100%">
      <Box width="80%" py={3} px={5}>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          maxWidth={900}
          borderRadius={2}
        >
          <ListItemText
            primary={selectedProduct?.title}
            secondary="1TTB"
            sx={{ flex: '0 0 auto' }}
            primaryTypographyProps={{ mb: 0.5, color: 'text.secondary', variant: 'caption' }}
            secondaryTypographyProps={{ color: 'text.primary', variant: 'subtitle2' }}
          />
          <ListItemText
            primary="Ask Price"
            secondary={fCurrency(selectedProduct?.ask)}
            sx={{ flex: '0 0 auto', textAlign: 'right' }}
            primaryTypographyProps={{ mb: 0.5, color: 'text.secondary', variant: 'caption' }}
            secondaryTypographyProps={{ color: 'text.primary', variant: 'subtitle2' }}
          />
        </Box>
        <Box mt={3}>
          <Typography variant="body2">Enter Amount (USD)</Typography>
          <TextField
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            InputProps={{
              endAdornment: <InputAdornment position="end">USD</InputAdornment>,
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1} mt={3}>
          <Typography variant="body2">Quick Amounts</Typography>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(2,1fr)', md: 'repeat(5,1fr)' }}
            gap={2}
            p={2}
          >
            {amounts.map((amt) => (
              <Button variant="outlined" sx={{ fontWeight: 600 }} onClick={() => setAmount(amt)}>
                {amt}
              </Button>
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} mt={5}>
          <PriceTag title="Estimated Ten Tola Bar Amount" value={`$${amount || 0}`} />
          <PriceTag title="Total Value" value={`$${amount || 0}`} />
        </Box>
      </Box>
    </Box>
  );

  const stepThree = (
    <Box display="flex" justifyContent="center" width="100%">
      <Box width="80%" py={3} px={5}>
        <Box display="flex" flexDirection="column" gap={2}>
          <PriceTag title="Product" value="Ten Tola Bar (1TTB)" />
          <PriceTag title="Trade Type" value="$20,000.00" />
          <PriceTag title="Amount (USD)" value="Buy" />
          <PriceTag title="Rate" value="$1,000" />
          <PriceTag title="Ten Tola Bar Amount" value="$42700.25 per 1TTB" />
          <Divider />
          <PriceTag title="Transaction Fee" value="0.00" />
          <Divider />
          <PriceTag title="Total" value="0.00" />
        </Box>
      </Box>
    </Box>
  );
  return (
    <DashboardContent>
      <Stack spacing={3}>
        <Typography variant="h4">Trade Execution</Typography>
        <Card>
          <Box display="flex" justifyContent="center" p={1}>
            {renderTabs}
          </Box>
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">
                  Step {step} :{' '}
                  {step === 1 ? 'Select A Product' : step === 2 ? 'Enter Amount' : 'Confirm Trade'}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="caption" color="text.secondary">
                    Current Rate :
                  </Typography>
                  <Typography variant="caption" color="text.primary" fontWeight={700}>
                    42700.25 / 1TTB
                  </Typography>
                </Box>
              </Box>

              {step === 1 && stepOne}
              {step === 2 && stepTwo}
              {step === 3 && stepThree}

              {selectedProduct && (
                <Box
                  display="flex"
                  justifyContent={step > 1 ? 'space-between' : 'flex-end'}
                  alignItems="center"
                >
                  {step > 1 && (
                    <Button startIcon={<Iconify icon="tabler:arrow-left" />} onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color={tabs?.value === 'buy' ? 'success' : 'error'}
                    endIcon={<Iconify icon="tabler:arrow-right" />}
                    sx={{ bgcolor: tabs?.value === 'buy' ? '#16A34A' : '#DC2626' }}
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </DashboardContent>
  );
}

function PriceTag({ title, value }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        variant={title === 'Total' ? 'subtitle1' : 'body2'}
        color={title === 'Total' ? 'text.primary' : 'text.secondary'}
      >
        {title}
      </Typography>
      <Typography variant="subtitle2" color={value === 'Buy' ? 'success.main' : 'text.primary'}>
        {value}
      </Typography>
    </Box>
  );
}
