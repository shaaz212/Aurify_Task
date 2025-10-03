import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function UsersDetailTable({ title, subheader, tableData, headLabel, ...other }) {
  return (
    <Card {...other}>
      <CardHeader
        avatar={<Iconify icon="eva:trending-up-fill" sx={{ color: 'warning.main' }} />}
        title={title}
        subheader={subheader}
        sx={{ mb: 3 }}
        action={
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            View all
          </Button>
        }
      />

      <Scrollbar sx={{ minHeight: 402 }}>
        <Table sx={{ minWidth: 680 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {tableData.map((row) => (
              <RowItem key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

function RowItem({ row }) {
  const popover = usePopover();

  return (
    <TableRow>
      <TableCell>{row.transactionId}</TableCell>

      <TableCell>{fDateTime(row.lastUpdated)}</TableCell>
      <TableCell>
        <Label variant="soft" color={row.type === 'buy' ? 'success' : 'error'}>
          {row.type}
        </Label>
      </TableCell>

      <TableCell>{fCurrency(row.amount)}</TableCell>
      <TableCell>{fCurrency(row.rate)}</TableCell>
    </TableRow>
  );
}
