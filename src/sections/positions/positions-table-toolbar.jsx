import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Box, Button } from '@mui/material';

// ----------------------------------------------------------------------

export function PositionsTableToolbar({ filters, options, onResetPage }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      p={2}
    >
      <TextField
        fullWidth
        variant="filled"
        value={filters.state.name}
        onChange={handleFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 500 }}
      />

      <Box display="flex" alignItems="center" gap={1}>
        <Button startIcon={<Iconify icon="mdi:filter-outline" />} color="inherit" size="small">
          Filter
        </Button>
        <Button
          color="info"
          size="small"
          sx={{
            bgcolor: filters.type === 'all' ? 'info.main' : '#E0EFFF',
            color: filters.type === 'all' ? 'white' : 'text.primary',
          }}
          onClick={() => filters.setState({ type: 'all' })}
        >
          All
        </Button>

        <Button
          color="success"
          size="small"
          sx={{
            bgcolor: filters.type === 'buy' ? 'success.main' : '#F0FDF4',
            color: filters.type === 'buy' ? 'white' : 'success.dark',
          }}
          onClick={() => filters.setState({ type: 'buy' })}
        >
          Buy
        </Button>

        <Button
          color="error"
          size="small"
          sx={{
            bgcolor: filters.type === 'sell' ? 'error.main' : '#FEF2F2',
            color: filters.type === 'sell' ? 'white' : 'error.dark',
          }}
          onClick={() => filters.setState({ type: 'sell' })}
        >
          Sell
        </Button>
      </Box>
    </Stack>
  );
}
