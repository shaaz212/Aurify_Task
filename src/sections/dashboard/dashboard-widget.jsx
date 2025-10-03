import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fNumber, fPercent } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function DashboardWidget({
  title,
  percent,
  total,
  color = 'primary',
  icon,
  dollar,
  sx,
  ...other
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        ...sx,
      }}
      {...other}
    >
      {/* Top Section */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            {dollar && <Iconify icon="bx:dollar" />}
            <Typography variant="h5" color="text.primary">
              {fNumber(total)}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: theme.palette[color]?.lighter || theme.palette.grey[200],
            color: theme.palette[color]?.main,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          typography: 'caption',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          color: percent >= 0 ? 'success.main' : 'error.main',
        }}
      >
        <Iconify
          icon={percent >= 0 ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'}
          width={16}
          height={16}
        />
        {fPercent(percent)} from last period
      </Box>
    </Card>
  );
}
