import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PositionsListView } from 'src/sections/positions/view';

// ----------------------------------------------------------------------

const metadata = { title: `Positions - ${CONFIG.site.name}` };

export default function PositionsViewPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PositionsListView />
    </>
  );
}
