import { Box, Stack, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { UsersDetailTable } from './users-detail-table';

export const DUMMY_ROWS = [
  {
    transactionId: 'TXN-1001',
    lastUpdated: '2025-10-01T10:15:00Z',
    type: 'buy',
    amount: 15000,
    rate: 5800,
  },
  {
    transactionId: 'TXN-1002',
    lastUpdated: '2025-10-01T14:40:00Z',
    type: 'sell',
    amount: 8000,
    rate: 5750,
  },
  {
    transactionId: 'TXN-1003',
    lastUpdated: '2025-10-02T09:20:00Z',
    type: 'buy',
    amount: 12000,
    rate: 5900,
  },
  {
    transactionId: 'TXN-1004',
    lastUpdated: '2025-10-02T16:55:00Z',
    type: 'sell',
    amount: 9500,
    rate: 5785,
  },
  {
    transactionId: 'TXN-1005',
    lastUpdated: '2025-10-03T11:10:00Z',
    type: 'buy',
    amount: 20000,
    rate: 6000,
  },
];

export function UsersDetailOverview() {
  return (
    <Stack spacing={3} p={3}>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3,1fr)' }} gap={3}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Iconify icon="bx:dollar" color="primary.dark" />
            <Typography variant="subtitle1">Account Summary</Typography>
          </Box>
          <PriceTag title="Account Value" value="$125,000" />
          <PriceTag title="Total Trades" value="43" />
          <PriceTag title="Total Volume" value="$125,0" />
          <PriceTag title="Account Total" value="$12,000" />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Iconify icon="ri:user-line" color="primary.dark" />
            <Typography variant="subtitle1">Contact Information</Typography>
          </Box>
          <LabelValueIcon title="Email" value="sarah.johnson@gmail.com" icon="mdi-light:email" />
          <LabelValueIcon title="Phone" value="+91 9875898379" icon="mdi-light:phone" />
          <LabelValueIcon
            title="Address"
            value="Thazhathethil House Mulayankavu"
            icon="mdi:address-marker-outline"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Iconify icon="uil:calender" color="primary.dark" />
            <Typography variant="subtitle1">Account Details</Typography>
          </Box>
          <LabelValueIcon title="Join Date" value="Jun 15, 2025" icon="uil:calender" />
          <LabelValueIcon
            title="Last Active"
            value="Sep 29, 2023 at 02:30 PM"
            icon="mdi:clock-outline"
          />
        </Box>
      </Box>
      <UsersDetailTable
        title="Recent Trades"
        tableData={DUMMY_ROWS}
        headLabel={[
          { id: 'id', label: 'Transaction ID' },
          { id: 'date', label: 'Date & Time' },
          { id: 'type', label: 'Type' },
          { id: 'amount', label: 'Amount' },
          { id: 'rate', label: 'rate' },
        ]}
      />
    </Stack>
  );
}

function PriceTag({ title, value }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        color={title === 'Account Total' ? 'success.main' : 'text.primary'}
      >
        {value}
      </Typography>
    </Box>
  );
}

function LabelValueIcon({ title, value, icon }) {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} sx={{ color: 'text.secondary' }}>
        <Iconify icon={icon} />
        <Typography variant="body2">{title}</Typography>
      </Box>
      <Typography variant="subtitle2" color="text.primary" ml={3}>
        {value}
      </Typography>
    </Box>
  );
}
