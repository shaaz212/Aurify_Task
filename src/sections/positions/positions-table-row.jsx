import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function PositionsTableRow({ row, selected }) {
  return (
    <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.transactionId}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.user}</TableCell>
      <TableCell>
        <Label variant="soft" color={row.type === 'buy' ? 'success' : 'error'}>
          {row.type}
        </Label>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(row.amount)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(row.entryRate)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(row.currentRate)}</TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          color: row.type === 'buy' ? 'success.main' : 'error.main',
        }}
      >
        <Iconify
          icon={row.difference > 0 ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'}
          width={14}
        />
        {fCurrency(row.difference)}
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateTime(row.timeStamp)}</TableCell>
    </TableRow>
  );
}
