'use client';

import React, { useState, useMemo } from 'react';
import { ListLayout } from '@/components/common/ListLayout';
import { CouponListTableColumns } from './CouponListTableColumns';
import { useToast } from '@/provider';
import Button from '@/components/common/Button';
import couponList from '@/data/couponList';

export function CouponListTable() {
  const { showToast } = useToast();
  const [couponNameSearch, setCouponNameSearch] = useState('');
  const [venueNameSearch, setVenueNameSearch] = useState('');

  // 검색 필터링
  const filteredCoupons = useMemo(() => {
    return couponList.filter(coupon => {
      const matchesCouponName =
        !couponNameSearch ||
        coupon.couponName.toLowerCase().includes(couponNameSearch.toLowerCase());
      const matchesVenueName =
        !venueNameSearch || coupon.venueName.toLowerCase().includes(venueNameSearch.toLowerCase());

      return matchesCouponName && matchesVenueName;
    });
  }, [couponNameSearch, venueNameSearch]);

  // 쿠폰 액션 처리
  const handleCouponAction = (action: string, couponId: number) => {
    showToast({
      message: `${action}이(가) 실행되었습니다. (쿠폰 ID: ${couponId})`,
      type: 'success',
      duration: 2000,
    });
  };

  // 새 쿠폰 생성 처리
  const handleCreateCoupon = () => {
    //이후에 navigate cnrk
  };

  // 쿠폰명 검색 처리
  const handleCouponNameSearch = (value: string) => {
    setCouponNameSearch(value);
  };

  // 베뉴명 검색 처리
  const handleVenueNameSearch = (value: string) => {
    setVenueNameSearch(value);
  };

  return (
    <ListLayout
      title="쿠폰 목록"
      description={`총 ${filteredCoupons.length}개의 쿠폰이 있습니다.`}
      headerActions={
        <Button variant="primary" size="medium" onClick={handleCreateCoupon}>
          새 쿠폰 생성
        </Button>
      }
      showSearch={[
        {
          key: 'venueName',
          placeholder: '베뉴명으로 검색...',
          value: venueNameSearch,
          onSearch: handleVenueNameSearch,
        },
        {
          key: 'couponName',
          placeholder: '쿠폰명으로 검색...',
          value: couponNameSearch,
          onSearch: handleCouponNameSearch,
        },
      ]}
    >
      <CouponListTableColumns data={filteredCoupons} onAction={handleCouponAction} />
    </ListLayout>
  );
}
