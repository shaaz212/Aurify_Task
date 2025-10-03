import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TradeView } from 'src/sections/trade/view';

// ----------------------------------------------------------------------

const metadata = { title: `Trade - ${CONFIG.site.name}` };

export default function TradeViewPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TradeView />
    </>
  );
}
