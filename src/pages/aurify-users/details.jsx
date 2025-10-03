import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UsersDetailView } from 'src/sections/aurify-users/view';

// ----------------------------------------------------------------------

const metadata = { title: `Users Details - ${CONFIG.site.name}` };

export default function AurifyUsersDetailViewPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UsersDetailView />
    </>
  );
}
