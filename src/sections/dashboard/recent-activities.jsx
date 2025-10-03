import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Stack, useTheme } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RecentActivities({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button size="small" color="inherit" sx={{ color: 'info.dark', fontWeight: 500 }}>
            View all
          </Button>
        }
        sx={{ mb: 1 }}
      />

      <Box>
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Box>
    </Card>
  );
}

function Item({ item, sx, ...other }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: `solid 2px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor:
            item.type === 'buy' ? theme.palette.success.lighter : theme.palette.error.lighter,
          color: item.type === 'buy' ? theme.palette.success.main : theme.palette.error.main,
        }}
      >
        <Iconify
          icon={item.type === 'buy' ? 'solar:arrow-up-outline' : 'solar:arrow-down-outline'}
        />
      </Box>

      <ListItemText
        primary={item.title}
        secondary={
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            divider={
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />
            }
            sx={{ typography: 'caption' }}
          >
            <Box sx={{ typography: 'caption' }}>{item.user}</Box>
            <Box sx={{ typography: 'caption' }}>{item.time}</Box>
          </Stack>
        }
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{ noWrap: true, component: 'span' }}
      />

      <Box sx={{ color: 'text.primary', typography: 'caption', fontWeight: 600 }}>
        {item.amount || 0}
      </Box>
    </Box>
  );
}
