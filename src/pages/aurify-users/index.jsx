import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UsersListView } from 'src/sections/aurify-users/view';

// ----------------------------------------------------------------------

const metadata = { title: `Users - ${CONFIG.site.name}` };

export default function AurifyUsersViewPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UsersListView />
    </>
  );
}
