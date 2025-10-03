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

export function UsersTableToolbar({ filters, options, onResetPage }) {
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

      <Box display="flex" alignItems="center" gap={2}>
        <Box sx={{ typography: 'body2', display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Iconify icon="mdi:filter-outline" />
          Filter : All
        </Box>
        <Box sx={{ typography: 'body2', display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Iconify icon="mdi:filter-outline" />
          Status : All
        </Box>
      </Box>
    </Stack>
  );
}
