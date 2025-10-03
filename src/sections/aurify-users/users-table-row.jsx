import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Avatar, IconButton, ListItemText, ListItemAvatar } from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function UsersTableRow({ row, selected, onViewRow }) {
  return (
    <TableRow
      hover
      selected={selected}
      aria-checked={selected}
      tabIndex={-1}
      sx={{ cursor: 'pointer' }}
      onClick={onViewRow}
    >
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ListItemAvatar>
          <Avatar>{row.name?.[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={row.name} secondary={row.email} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Label color={row?.status === 'active' ? 'success' : 'default'}>
          <Iconify
            icon={row?.status === 'active' ? 'charm:circle-tick' : 'solar:close-circle-outline'}
          />
          {row.status}
        </Label>
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.trades}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(row.volume)}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(row.lastUpdated)}</TableCell>
      <TableCell>
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
