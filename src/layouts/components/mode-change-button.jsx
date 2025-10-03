import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings/context';

// ----------------------------------------------------------------------

export function ModeChangeButton({ sx, ...other }) {
  const settings = useSettingsContext();
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    settings.onUpdateField('colorScheme', newMode);
    setMode(newMode);
  };

  return (
    <IconButton
      aria-label="toggle theme"
      onClick={toggleMode}
      sx={{
        p: 0,
        width: 36,
        height: 36,
        mr: 1,
        color: 'primary.main',
        borderRadius: '50%',
        bgcolor: 'action.hover',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'action.selected',
          transform: 'scale(1.1)',
        },
        ...sx,
      }}
      {...other}
    >
      <m.div
        key={mode} // 🔑 important: re-animate on mode change
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <Iconify
          icon={mode === 'light' ? 'entypo:light-up' : 'material-symbols:clear-night'}
          width={22}
          height={22}
        />
      </m.div>
    </IconButton>
  );
}
