import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';
import Table from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Common/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showPagination: {
      control: 'boolean',
      description: '페이지네이션 표시 여부',
    },
    emptyMessage: {
      control: 'text',
      description: '데이터가 없을 때 표시할 메시지',
    },
    selectedRowId: {
      control: 'text',
      description: '선택된 행의 ID',
    },
    totalPage: {
      control: 'number',
      description: '전체 페이지 수',
    },
    currentPage: {
      control: 'number',
      description: '현재 페이지 (0부터 시작)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터 타입
interface SampleData {
  idx: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// 샘플 데이터
const sampleData: SampleData[] = [
  { idx: '1', name: '김철수', email: 'kim@example.com', role: '관리자', status: '활성' },
  { idx: '2', name: '이영희', email: 'lee@example.com', role: '사용자', status: '활성' },
  { idx: '3', name: '박민수', email: 'park@example.com', role: '사용자', status: '비활성' },
  { idx: '4', name: '정수진', email: 'jung@example.com', role: '관리자', status: '활성' },
  { idx: '5', name: '최동욱', email: 'choi@example.com', role: '사용자', status: '활성' },
];

// 테이블 생성 함수
const createTable = (data: SampleData[]) => {
  const columnHelper = createColumnHelper<SampleData>();

  const columns = [
    columnHelper.accessor('name', {
      header: '이름',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: '이메일',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: '역할',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: '상태',
      cell: info => (
        <span
          style={{
            color: info.getValue() === '활성' ? '#52c41a' : '#ff4d4f',
            fontWeight: '500',
          }}
        >
          {info.getValue()}
        </span>
      ),
    }),
  ];

  return columns;
};

// 기본 테이블
export const Default: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: sampleData,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return <Table table={table} showPagination={true} totalPage={1} currentPage={0} />;
  },
};

// 페이지네이션 없는 테이블
export const NoPagination: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: sampleData,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return <Table table={table} showPagination={false} totalPage={1} currentPage={0} />;
  },
};

// 페이지 크기 선택기가 있는 테이블
export const WithPageSize: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: sampleData,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return <Table table={table} showPagination={true} totalPage={1} currentPage={0} />;
  },
};

// 클릭 가능한 행이 있는 테이블
export const ClickableRows: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: sampleData,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Table
        table={table}
        showPagination={true}
        onRowClick={(row: SampleData) => alert(`선택된 행: ${row.name}`)}
        totalPage={1}
        currentPage={0}
      />
    );
  },
};

// 선택된 행이 있는 테이블
export const SelectedRow: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: sampleData,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Table table={table} showPagination={true} selectedRowId="2" totalPage={1} currentPage={0} />
    );
  },
};

// 빈 데이터 테이블
export const EmptyData: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Table
        table={table}
        showPagination={false}
        emptyMessage="표시할 데이터가 없습니다."
        totalPage={0}
        currentPage={0}
      />
    );
  },
};

// 커스텀 빈 메시지
export const CustomEmptyMessage: Story = {
  render: () => {
    const columns = createTable(sampleData);
    const table = useReactTable({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Table
        table={table}
        showPagination={false}
        emptyMessage="검색 결과가 없습니다. 다른 조건으로 검색해보세요."
        totalPage={0}
        currentPage={0}
      />
    );
  },
};
