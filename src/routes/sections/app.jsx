import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// layouts
import { DashboardLayout } from 'src/layouts/dashboard';

// components
import { LoadingScreen } from 'src/components/loading-screen';

// Dashboard
const IndexPage = lazy(() => import('src/pages/aurify-dashboard'));

// Trade
const TradeViewPage = lazy(() => import('src/pages/trade'));

// Positions
const PositionViewPage = lazy(() => import('src/pages/positions'));

// Users
const UsersViewPage = lazy(() => import('src/pages/aurify-users'));
const UsersDetailsPage = lazy(() => import('src/pages/aurify-users/details'));

// Reusable Layout
const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const appRoutes = [
  {
    path: '/',
    element: layoutContent,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'dashboard',
        element: <IndexPage />,
      },
      {
        path: 'trade',
        children: [
          { element: <TradeViewPage />, index: true },
          { path: 'list', element: <TradeViewPage /> },
        ],
      },
      {
        path: 'positions',
        children: [
          { element: <PositionViewPage />, index: true },
          { path: 'list', element: <PositionViewPage /> },
        ],
      },
      {
        path: 'users',
        children: [
          { element: <UsersViewPage />, index: true },
          { path: 'list', element: <UsersViewPage /> },
          { path: ':id', element: <UsersDetailsPage /> },
        ],
      },
    ],
  },
];
