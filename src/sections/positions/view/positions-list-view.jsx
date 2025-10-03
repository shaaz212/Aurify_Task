import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { CardContent, CardHeader, Stack, Typography, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { PositionsTableRow } from '../positions-table-row';
import { PositionsTableToolbar } from '../positions-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'transactionId', label: 'Transaction Id' },
  { id: 'user', label: 'User' },
  { id: 'type', label: 'Type' },
  { id: 'amount', label: 'Amount' },
  { id: 'entryRate', label: 'Entry Rate' },
  { id: 'currentRate', label: 'Current Rate' },
  { id: 'profitLoss', label: 'Profit Loss' },
  { id: 'timeStamp', label: 'Time Stamp' },
];

const dummyPositions = [
  {
    transactionId: 'TXN001',
    user: 'Alice Johnson',
    type: 'buy',
    status: 'Completed',
    amount: 1000,
    entryRate: 2000,
    currentRate: 2100,
    difference: 100,
    timeStamp: '2025-10-03T10:30:00Z',
  },
  {
    transactionId: 'TXN002',
    user: 'Bob Smith',
    type: 'sell',
    status: 'Pending',
    amount: 500,
    entryRate: 1950,
    currentRate: 1920,
    difference: -30,
    timeStamp: '2025-10-03T11:00:00Z',
  },
  {
    transactionId: 'TXN003',
    user: 'Charlie Brown',
    type: 'buy',
    status: 'Completed',
    amount: 1200,
    entryRate: 2050,
    currentRate: 2075,
    difference: 25,
    timeStamp: '2025-10-03T09:45:00Z',
  },
  {
    transactionId: 'TXN004',
    user: 'Diana Prince',
    type: 'sell',
    status: 'Completed',
    amount: 800,
    entryRate: 1980,
    currentRate: 1960,
    difference: -20,
    timeStamp: '2025-10-03T12:15:00Z',
  },
  {
    transactionId: 'TXN005',
    user: 'Ethan Hunt',
    type: 'buy',
    status: 'Completed',
    amount: 1500,
    entryRate: 2100,
    currentRate: 2125,
    difference: 25,
    timeStamp: '2025-10-03T08:30:00Z',
  },
  {
    transactionId: 'TXN006',
    user: 'Fiona Gallagher',
    type: 'sell',
    status: 'Pending',
    amount: 600,
    entryRate: 2000,
    currentRate: 1985,
    difference: -15,
    timeStamp: '2025-10-03T13:00:00Z',
  },
  {
    transactionId: 'TXN007',
    user: 'George Martin',
    type: 'buy',
    status: 'Completed',
    amount: 900,
    entryRate: 2050,
    currentRate: 2070,
    difference: 20,
    timeStamp: '2025-10-03T07:45:00Z',
  },
  {
    transactionId: 'TXN008',
    user: 'Hannah Baker',
    type: 'sell',
    status: 'Completed',
    amount: 1100,
    entryRate: 2020,
    currentRate: 2000,
    difference: -20,
    timeStamp: '2025-10-03T14:30:00Z',
  },
  {
    transactionId: 'TXN009',
    user: 'Ian Curtis',
    type: 'buy',
    status: 'Pending',
    amount: 1300,
    entryRate: 2075,
    currentRate: 2090,
    difference: 15,
    timeStamp: '2025-10-03T09:00:00Z',
  },
  {
    transactionId: 'TXN010',
    user: 'Julia Roberts',
    type: 'sell',
    status: 'Completed',
    amount: 700,
    entryRate: 1990,
    currentRate: 1975,
    difference: -15,
    timeStamp: '2025-10-03T15:00:00Z',
  },
  {
    transactionId: 'TXN006',
    user: 'Fiona Gallagher',
    type: 'sell',
    status: 'Pending',
    amount: 600,
    entryRate: 2000,
    currentRate: 1985,
    difference: -15,
    timeStamp: '2025-10-03T13:00:00Z',
  },
  {
    transactionId: 'TXN007',
    user: 'George Martin',
    type: 'buy',
    status: 'Completed',
    amount: 900,
    entryRate: 2050,
    currentRate: 2070,
    difference: 20,
    timeStamp: '2025-10-03T07:45:00Z',
  },
  {
    transactionId: 'TXN008',
    user: 'Hannah Baker',
    type: 'sell',
    status: 'Completed',
    amount: 1100,
    entryRate: 2020,
    currentRate: 2000,
    difference: -20,
    timeStamp: '2025-10-03T14:30:00Z',
  },
  {
    transactionId: 'TXN009',
    user: 'Ian Curtis',
    type: 'buy',
    status: 'Pending',
    amount: 1300,
    entryRate: 2075,
    currentRate: 2090,
    difference: 15,
    timeStamp: '2025-10-03T09:00:00Z',
  },
  {
    transactionId: 'TXN010',
    user: 'Julia Roberts',
    type: 'sell',
    status: 'Completed',
    amount: 700,
    entryRate: 1990,
    currentRate: 1975,
    difference: -15,
    timeStamp: '2025-10-03T15:00:00Z',
  },
];
// ----------------------------------------------------------------------

export function PositionsListView() {
  const table = useTable();

  const [tableData, setTableData] = useState(dummyPositions);

  const filters = useSetState({ name: '', type: 'all' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: filters.state,
  });

  const canReset = !!filters.state.name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <DashboardContent>
      <Stack spacing={5}>
        <Typography variant="h4">Trade Execution</Typography>

        <Card>
          <PositionsTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: [] }}
          />

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <PositionsTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>

        <Card>
          <CardHeader title="Position Summary" />
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <SummaryCard title="Total Positions" value="5000" />
              <SummaryCard title="Total Positions" value="1122" color="success" />
              <SummaryCard title="Total Positions" value="1098" color="error" />
              <SummaryCard title="Total Positions" value="2817" color="warning" />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </DashboardContent>
  );
}

function applyFilter({ inputData, filters }) {
  const { name, status, role } = filters;

  // const stabilizedThis = inputData.map((el, index) => [el, index]);

  // inputData = stabilizedThis.map((el) => el[0]);

  // if (name) {
  //   inputData = inputData.filter(
  //     (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  //   );
  // }

  // if (status !== 'all') {
  //   inputData = inputData.filter((user) => user.status === status);
  // }

  // if (role.length) {
  //   inputData = inputData.filter((user) => role.includes(user.role));
  // }

  return inputData;
}

function SummaryCard({ title, value, color }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor:
          color === 'success'
            ? '#F0FDF4'
            : color === 'error'
              ? '#FEF2F2'
              : color === 'warning'
                ? '#FEFCE8'
                : 'inherit',
      }}
    >
      <CardContent>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color={color ? `${color}.dark` : 'inherit'}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
