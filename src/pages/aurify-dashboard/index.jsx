import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { DashboardView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function AurifyDashboardViewPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
