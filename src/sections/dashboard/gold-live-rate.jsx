import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function GoldLiveRate({ title }) {
  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton>
              <Iconify icon="solar:refresh-bold" />
            </IconButton>
            <Box
              sx={{
                typography: 'caption',
                color: 'text.secondary',
                whiteSpace: 'pre-line',
              }}
            >
              {'Last Updated\n23:20:08'}
            </Box>
          </Box>
        }
        sx={{
          position: 'relative',
          overflow: 'visible',

          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          borderTop: '1px solid',
          borderImageSlice: 1,
          borderImageSource: 'linear-gradient(90deg, #FFFFFF 0%, #3A75B7 55%, #FFFFFF 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            background: 'linear-gradient(180deg, #ECF5FF 0%, #FFFFFF 100%)',
            zIndex: -1,
          },
        }}
      />

      <CardContent>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
          <Box display="flex" flexDirection="column" gap={2}>
            <FirstCard title="Ask" value={1875.32} />
            <SecondCard label="Highest Today" value={1902.45} color="success" bgcolor="#F0FDF4" />
            <Button variant="contained" color="success" sx={{ bgcolor: '#16A34A' }}>
              Buy Gold
            </Button>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <FirstCard title="Bid" value={1860.75} />
            <SecondCard label="Highest Today" value={1850.12} color="error" bgcolor="##FEF2F2" />
            <Button variant="contained" color="error" sx={{ bgcolor: '#DC2626' }}>
              Sell Gold
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

function FirstCard({ title, value }) {
  return (
    <Card>
      <Box p={2}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5">
            {value}{' '}
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              USD
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

function SecondCard({ label, value, color, bgcolor }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor,
      }}
    >
      <Box p={2}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{ typography: 'subtitle2', color: `${color}.main` }}
          >
            <Iconify icon="bx:dollar" />
            {value}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
