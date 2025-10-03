import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Stack, Button, useTheme, CardHeader, CardContent, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { UsersTableRow } from '../users-table-row';
import { UsersTableToolbar } from '../users-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user', label: 'User' },
  { id: 'status', label: 'Status' },
  { id: 'trades', label: 'Trades' },
  { id: 'volume', label: 'Volume' },
  { id: 'lastActive', label: 'Last Active' },
  { id: '#', label: 'Actions' },
];

export const dummyUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'active',
    trades: 12,
    volume: 15000,
    lastUpdated: '2025-10-03T09:30:00Z',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'inactive',
    trades: 5,
    volume: 5000,
    lastUpdated: '2025-10-03T10:00:00Z',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    status: 'active',
    trades: 8,
    volume: 7500,
    lastUpdated: '2025-10-03T11:15:00Z',
  },
  {
    name: 'Diana Prince',
    email: 'diana@example.com',
    status: 'active',
    trades: 20,
    volume: 25000,
    lastUpdated: '2025-10-03T08:45:00Z',
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    status: 'inactive',
    trades: 3,
    volume: 3000,
    lastUpdated: '2025-10-03T12:30:00Z',
  },
];

// ----------------------------------------------------------------------

export function UsersListView() {
  const table = useTable();
  const router = useRouter();

  const [tableData, setTableData] = useState(dummyUsers);

  const filters = useSetState({ name: '', type: 'all' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: filters.state,
  });

  const canReset = !!filters.state.name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleViewRow = useCallback(
    (rowId) => {
      router.push(paths.app.users.details(rowId));
    },
    [router]
  );

  return (
    <DashboardContent>
      <Stack spacing={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">User Management</Typography>
          <Button
            variant="contained"
            color="info"
            startIcon={<Iconify icon="mingcute:user-add-line" />}
            sx={{ bgcolor: '#3A75B7' }}
          >
            Add User
          </Button>
        </Box>

        <Card>
          <UsersTableToolbar
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
                    .map((row, rI) => (
                      <UsersTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(rI)}
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
