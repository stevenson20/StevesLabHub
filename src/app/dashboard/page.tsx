
import { Suspense } from 'react';
import { DashboardClient } from './dashboard-client';
import Loading from './loading';

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardClient />
    </Suspense>
  );
}
