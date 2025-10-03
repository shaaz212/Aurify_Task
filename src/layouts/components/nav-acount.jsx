import { Box, Avatar, Typography } from '@mui/material';

export function NavAccount() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 2,
        borderTop: (theme) => `1px dashed ${theme.palette.divider}`,
        position: 'sticky',
        bottom: 0,
        bgcolor: 'background.default',
      }}
    >
      <Avatar
        alt="User Name"
        src="/assets/images/avatar/avatar_1.jpg"
        sx={{ width: 36, height: 36 }}
      />

      <Box>
        <Typography variant="subtitle2" noWrap>
          John Doe
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          Admin
        </Typography>
      </Box>
    </Box>
  );
}
