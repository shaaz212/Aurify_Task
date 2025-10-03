import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

// import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      {
        title: 'Dashboard',
        path: paths.app.dashboard,
        icon: <Iconify icon="material-symbols:dashboard-outline" />,
      },
      {
        title: 'Trade',
        path: paths.app.trade,
        icon: <Iconify icon="hugeicons:trade-up" />,
      },
      {
        title: 'Positions',
        path: paths.app.positions,
        icon: <Iconify icon="system-uicons:graph-bar" />,
      },
      {
        title: 'Users',
        path: paths.app.users.root,
        icon: <Iconify icon="tabler:users" />,
      },
    ],
  },
];
