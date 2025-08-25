'use client';

import React from 'react';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/common/Table';
import Button from '@/components/common/Button';
import couponList from '@/data/couponList';

interface CouponListTableColumnsProps {
  data: typeof couponList;
  onAction: (action: string, couponId: number) => void;
}

export function CouponListTableColumns({ data, onAction }: CouponListTableColumnsProps) {
  // 쿠폰 ID 컬럼
  const couponIdColumn: ColumnDef<(typeof couponList)[0]> = {
    accessorKey: 'couponID',
    header: '쿠폰 ID',
    cell: ({ row }) => (
      <div
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center',
        }}
      >
        {row.original.couponID}
      </div>
    ),
    size: 70,
  };

  // 베뉴명 컬럼
  const venueNameColumn: ColumnDef<(typeof couponList)[0]> = {
    accessorKey: 'venueName',
    header: '베뉴명',
    cell: ({ row }) => (
      <div style={{ maxWidth: '250px' }}>
        <div
          style={{
            padding: '4px 8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: '#374151',
            display: 'inline-block',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {row.original.venueName}
        </div>
      </div>
    ),
    size: 120,
  };

  // 쿠폰명 컬럼
  const couponNameColumn: ColumnDef<(typeof couponList)[0]> = {
    accessorKey: 'couponName',
    header: '쿠폰명',
    cell: ({ row }) => (
      <div style={{ maxWidth: '1000px' }}>
        <div
          style={{
            fontWeight: '500',
            color: '#111827',
            lineHeight: '1.4',
            fontSize: '13px',
            width: '100%',
          }}
        >
          {row.original.couponName}
        </div>
      </div>
    ),
    size: 400,
  };

  // 이용기간 컬럼
  const validityPeriodColumn: ColumnDef<(typeof couponList)[0]> = {
    accessorKey: 'validityPeriod',
    header: '이용기간',
    cell: ({ row }) => (
      <div style={{ fontSize: '12px', color: '#6b7280' }}>{row.original.validityPeriod}</div>
    ),
    size: 200,
  };

  // 발급량 컬럼 (추가 버튼 포함)
  const issuedCountColumn: ColumnDef<(typeof couponList)[0]> = {
    accessorKey: 'issuedCount',
    header: '발급량',
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '4px 8px',
            backgroundColor: '#dbeafe',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#1e40af',
            minWidth: '50px',
          }}
        >
          {row.original.issuedCount.toLocaleString()}
        </div>
        <Button
          size="small"
          variant="primary"
          onClick={() => onAction('발급량 추가', row.original.couponID)}
          style={{
            padding: '2px 6px',
            fontSize: '10px',
            minWidth: 'auto',
          }}
        >
          +
        </Button>
      </div>
    ),
    size: 100,
  };

  // 사용량 컬럼
  const usedCountColumn: ColumnDef<(typeof couponList)[0]> = {
    accessorKey: 'usedCount',
    header: '사용량',
    cell: ({ row }) => (
      <div
        style={{
          textAlign: 'center',
          padding: '4px 8px',
          backgroundColor: '#dcfce7',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#166534',
        }}
      >
        {row.original.usedCount.toLocaleString()}
      </div>
    ),
    size: 100,
  };

  // 컬럼 정의
  const columns: ColumnDef<(typeof couponList)[0]>[] = [
    couponIdColumn,
    venueNameColumn,
    couponNameColumn,
    validityPeriodColumn,
    issuedCountColumn,
    usedCountColumn,
  ];

  // 테이블 인스턴스 생성
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ marginTop: '20px' }}>
      <Table table={table} emptyMessage="쿠폰 데이터가 없습니다." />
    </div>
  );
}
