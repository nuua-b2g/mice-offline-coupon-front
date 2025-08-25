import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { ListLayout } from './ListLayout';
import Table from '../Table';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Button from '../Button';

import adminList from '../../../data/adminList';

// 관리자 테이블 컬럼 정의
const adminColumns: ColumnDef<(typeof adminList)[0]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: '이메일',
  },
  {
    accessorKey: 'joinDate',
    header: '가입일',
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === '승인' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: '작업',
    cell: ({ row }) => (
      <div style={{ display: 'flex', gap: '4px' }}>
        <Button size="small" variant="primary" onClick={() => alert(`편집: ${row.original.name}`)}>
          편집
        </Button>
        <Button size="small" variant="danger" onClick={() => alert(`삭제: ${row.original.name}`)}>
          삭제
        </Button>
      </div>
    ),
  },
];

// Table 컴포넌트를 위한 래퍼
const TableWrapper: React.FC<{
  data: typeof adminList;
  columns: ColumnDef<(typeof adminList)[0]>[];
}> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Table table={table} />;
};

const meta = {
  title: 'Components/Common/ListLayout',
  component: ListLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '레이아웃 제목',
    },
    description: {
      control: 'text',
      description: '레이아웃 설명',
    },
    showSearch: {
      control: 'boolean',
      description: '검색 기능 표시',
    },
    searchPlaceholder: {
      control: 'text',
      description: '검색 입력창 플레이스홀더',
    },
  },
} satisfies Meta<typeof ListLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 레이아웃
export const Default: Story = {
  args: {
    title: '관리자 관리',
    description: '시스템에 등록된 관리자들을 관리할 수 있습니다.',
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 검색 기능이 있는 레이아웃
export const WithSearch: Story = {
  args: {
    title: '관리자 목록',
    description: '관리자 정보를 검색하고 관리할 수 있습니다.',
    showSearch: true,
    searchPlaceholder: '관리자 이름 또는 이메일로 검색...',
    onSearch: value => console.log('검색:', value),
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 다중 검색창이 있는 레이아웃
export const WithMultipleSearch: Story = {
  args: {
    title: '고급 관리자 검색',
    description: '여러 조건으로 관리자를 검색할 수 있습니다.',
    showSearch: [
      {
        key: 'name',
        placeholder: '이름으로 검색...',
        value: '',
        onSearch: value => console.log('이름 검색:', value),
      },
      {
        key: 'email',
        placeholder: '이메일로 검색...',
        value: '',
        onSearch: value => console.log('이메일 검색:', value),
      },
    ],
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 다중 검색창과 액션이 함께 있는 레이아웃
export const WithMultipleSearchAndActions: Story = {
  args: {
    title: '통합 관리자 검색 및 관리',
    description: '다양한 검색 조건과 관리 기능을 제공합니다.',
    showSearch: [
      {
        key: 'name',
        placeholder: '이름 검색...',
        value: '',
        onSearch: value => console.log('이름 검색:', value),
      },
      {
        key: 'status',
        placeholder: '상태 검색...',
        value: '',
        onSearch: value => console.log('상태 검색:', value),
      },
    ],
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">새 관리자</Button>
        <Button variant="secondary">필터 적용</Button>
        <Button variant="gray">검색 초기화</Button>
      </div>
    ),
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 이름과 이메일 검색창
export const NameAndEmailSearch: Story = {
  args: {
    title: '관리자 상세 검색',
    description: '이름과 이메일로 정확한 관리자를 찾을 수 있습니다.',
    showSearch: [
      {
        key: 'name',
        placeholder: '이름 입력...',
        value: '',
        onSearch: value => console.log('이름 검색:', value),
      },
      {
        key: 'email',
        placeholder: '이메일 입력...',
        value: '',
        onSearch: value => console.log('이메일 검색:', value),
      },
    ],
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 이름과 상태 검색창
export const NameAndStatusSearch: Story = {
  args: {
    title: '관리자 권한별 검색',
    description: '이름과 승인 상태로 관리자를 검색합니다.',
    showSearch: [
      {
        key: 'name',
        placeholder: '이름 입력...',
        value: '',
        onSearch: value => console.log('이름 검색:', value),
      },
      {
        key: 'status',
        placeholder: '승인 상태...',
        value: '',
        onSearch: value => console.log('상태 검색:', value),
      },
    ],
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">승인 대기자 보기</Button>
        <Button variant="secondary">전체 목록</Button>
      </div>
    ),
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 툴바 액션이 있는 레이아웃
export const WithActions: Story = {
  args: {
    title: '관리자 관리',
    description: '전체 150명의 관리자가 등록되어 있습니다.',
    showSearch: true,
    searchPlaceholder: '관리자 검색...',
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">새 관리자 추가</Button>
        <Button variant="secondary">내보내기</Button>
        <Button variant="gray">일괄 처리</Button>
      </div>
    ),
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};

// 헤더 액션이 있는 레이아웃
export const WithHeaderActions: Story = {
  args: {
    title: '고급 관리자 관리',
    description: '시스템 관리자 권한을 가진 관리자들을 관리합니다.',
    headerActions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="warning">권한 설정</Button>
        <Button variant="secondary">로그 보기</Button>
      </div>
    ),
    showSearch: true,
    searchPlaceholder: '권한별 검색...',
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">새 관리자 추가</Button>
        <Button variant="secondary">권한 내보내기</Button>
      </div>
    ),
    children: (
      <TableWrapper
        data={adminList.filter(admin => admin.status === '승인')}
        columns={adminColumns}
      />
    ),
  },
};

// 검색과 액션이 모두 있는 레이아웃
export const FullFeatured: Story = {
  args: {
    title: '통합 관리자 관리',
    description: '모든 관리자 정보를 한 곳에서 관리하고 검색할 수 있습니다.',
    showSearch: true,
    searchPlaceholder: '이름, 이메일, 상태로 검색...',
    onSearch: value => console.log('검색어:', value),
    headerActions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="secondary">통계 보기</Button>
        <Button variant="warning">설정</Button>
      </div>
    ),
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">새 관리자</Button>
        <Button variant="secondary">내보내기</Button>
        <Button variant="gray">필터</Button>
        <Button variant="danger">일괄 삭제</Button>
      </div>
    ),
    children: <TableWrapper data={adminList} columns={adminColumns} />,
  },
};
