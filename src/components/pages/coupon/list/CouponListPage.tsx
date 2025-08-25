'use client';

import React from 'react';
import { Layout } from '@/components/common/Layout';
import { CouponListTable } from './useCouponList';
import { useToast } from '@/provider';

export function CouponListPage() {
  return (
    <Layout showBackButton={false} showActionBar={false}>
      <CouponListTable />
    </Layout>
  );
}
