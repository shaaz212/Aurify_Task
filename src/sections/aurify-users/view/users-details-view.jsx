import { Avatar, Box, Button, Card, CardHeader, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';
import { UsersDetailOverview } from '../users-detail-overview';

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'trades', label: 'Trades & Activities' },
  { value: 'documents', label: 'Documents' },
];

export function UsersDetailView() {
  const theme = useTheme();
  const tabs = useTabs('overview');

  return (
    <DashboardContent>
      <Stack spacing={2}>
        <Box>
          <Button startIcon={<Iconify icon="solar:alt-arrow-left-outline" />}>
            Back to Users Management
          </Button>
        </Box>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'transparent', color: 'primary.main', width: 70, height: 70 }}>
                S
              </Avatar>
            }
            title="Sarah Johnson"
            subheader="CUS-12345"
            action={<Button startIcon={<Iconify icon="bxs:edit" />}>Edit Profile</Button>}
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
          <Box mt={2} mx={2}>
            <Tabs
              variant="standard"
              value={tabs.value}
              onChange={tabs.onChange}
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.dark',
                },

                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              {TABS?.map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
          </Box>
          <Box mt={2}>{tabs.value === 'overview' && <UsersDetailOverview />}</Box>
        </Card>
      </Stack>
    </DashboardContent>
  );
}
