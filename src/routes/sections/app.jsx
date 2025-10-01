import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// layouts
import { DashboardLayout } from 'src/layouts/dashboard';

// components
import { LoadingScreen } from 'src/components/loading-screen';

// auth

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard'));

export const appRoutes = [
  {
    path: '/',
    element: (
      //   <AuthGuard>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
      //   </AuthGuard>
    ),
    Children: [
      { element: <IndexPage />, index: true },
      {
        path: 'dashboard',
        children: [{ path: 'dashboard', element: <IndexPage /> }],
      },
    ],
  },
];
