import React from 'react';
import { Box, Stack, Typography, Button, useTheme } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

const trades = [
  { title: 'Gold', value: 15.32, percent: 0.5 },
  { title: 'Silver', value: 23.45, percent: -0.2 },
  { title: 'Crude Oil', value: 84.12, percent: 1.2 },
  { title: 'Natural Gas', value: 6.75, percent: -0.7 },
  { title: 'Platinum', value: 10.5, percent: 0.3 },
];

export function TradingProducts() {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Trading Products</Typography>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(5, 1fr)' }} gap={1}>
        {trades.map((trade, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              border: '1px solid #3A75B7',
              borderRadius: 2,
              bgcolor: '#071F3A',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Title and Trend */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" color="white">
                {trade.title}
              </Typography>
              <Label color={trade.percent > 0 ? 'success' : 'error'}>
                <Iconify
                  icon={trade.percent > 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                />
                {`${trade.percent}%`}
              </Label>
            </Box>

            {/* Value */}
            <Typography sx={{ typography: 'body2', color: 'text.secondary' }}>
              {trade.value}
            </Typography>

            {/* Bid / Ask */}
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ typography: 'body2', color: 'text.secondary', textAlign: 'left' }}>
                Bid
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    typography: 'subtitle2',
                    color: '#3A75B7',
                  }}
                >
                  ${trade.value}
                </Box>
              </Box>
              <Box sx={{ typography: 'body2', color: 'text.secondary', textAlign: 'left' }}>
                Ask
                <Box
                  sx={{
                    typography: 'subtitle2',
                    color: '#3A75B7',
                  }}
                >
                  ${trade.value + 10}
                </Box>
              </Box>
            </Box>

            {/* Trade Button */}
            <Button
              size="large"
              variant="contained"
              endIcon={<Iconify icon="lucide:arrow-up-right" />}
              sx={{ bgcolor: '#3A75B7' }}
            >
              Trade Now
            </Button>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
