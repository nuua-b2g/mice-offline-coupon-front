import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { Layout } from './Layout';
import Button from '../Button';

const meta = {
  title: 'Components/Common/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    showSidebar: {
      control: 'boolean',
      description: '사이드바 표시 여부',
    },
    sidebarCollapsed: {
      control: 'boolean',
      description: '사이드바 접힘 상태',
    },
    showBackButton: {
      control: 'boolean',
      description: '뒤로가기 버튼 표시 여부',
    },
    showActionBar: {
      control: 'boolean',
      description: '하단 액션바 표시 여부',
    },
    onSidebarToggle: {
      action: 'sidebarToggle',
      description: '사이드바 토글 이벤트',
    },
    children: {
      control: 'text',
      description: '메인 콘텐츠',
    },
  },
  args: {
    showSidebar: true,
    sidebarCollapsed: false,
    showBackButton: false,
    showActionBar: false,
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ marginBottom: '16px', color: '#333' }}>콘텐츠 섹션</h3>
    <p style={{ marginBottom: '16px', color: '#666', lineHeight: '1.6' }}>
      여기는 메인 콘텐츠 영역입니다. 다양한 컴포넌트와 콘텐츠가 들어갈 수 있습니다.
    </p>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
      <Button variant="primary">주요 작업</Button>
      <Button variant="secondary">보조 작업</Button>
      <Button variant="gray">취소</Button>
    </div>
    <div
      style={{
        background: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
      }}
    >
      <h4 style={{ marginBottom: '8px', color: '#333' }}>통계 정보</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          style={{ background: 'white', padding: '16px', borderRadius: '4px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>1,234</div>
          <div style={{ color: '#666' }}>총 쿠폰 수</div>
        </div>
        <div
          style={{ background: 'white', padding: '16px', borderRadius: '4px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>567</div>
          <div style={{ color: '#666' }}>활성 쿠폰</div>
        </div>
        <div
          style={{ background: 'white', padding: '16px', borderRadius: '4px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>89</div>
          <div style={{ color: '#666' }}>사용된 쿠폰</div>
        </div>
      </div>
    </div>
  </div>
);

const ActionBarContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Button variant="gray">취소</Button>
    <Button variant="primary">저장</Button>
    <Button variant="primary">등록</Button>
  </div>
);

// 기본 레이아웃
export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

// 사이드바 토글이 가능한 레이아웃
export const WithSidebarToggle: Story = {
  render: args => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Layout {...args} sidebarCollapsed={collapsed} onSidebarToggle={setCollapsed}>
        <SampleContent />
      </Layout>
    );
  },
  args: {
    children: <SampleContent />,
  },
};

// 사이드바가 접힌 상태
export const CollapsedSidebar: Story = {
  args: {
    children: <SampleContent />,
    sidebarCollapsed: true,
  },
};

// 뒤로가기 버튼이 있는 레이아웃
export const WithBackButton: Story = {
  args: {
    children: <SampleContent />,
    showBackButton: true,
  },
};

// 하단 액션바가 있는 레이아웃
export const WithActionBar: Story = {
  args: {
    children: <SampleContent />,
    showActionBar: true,
    actionBarContent: <ActionBarContent />,
  },
};

// 뒤로가기 버튼과 액션바가 모두 있는 레이아웃
export const WithBackButtonAndActionBar: Story = {
  args: {
    children: <SampleContent />,
    showBackButton: true,
    showActionBar: true,
    actionBarContent: <ActionBarContent />,
  },
};

// 사이드바 없는 레이아웃
export const NoSidebar: Story = {
  args: {
    children: <SampleContent />,
    showSidebar: false,
  },
};

// 빈 콘텐츠 레이아웃
export const EmptyContent: Story = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          color: '#999',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <div>콘텐츠가 없습니다.</div>
        </div>
      </div>
    ),
  },
};

// 긴 콘텐츠로 스크롤 테스트
export const LongContent: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', color: '#333' }}>긴 콘텐츠 테스트</h3>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            style={{
              marginBottom: '16px',
              padding: '16px',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <h4 style={{ marginBottom: '8px' }}>섹션 {i + 1}</h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              이것은 스크롤 테스트를 위한 긴 콘텐츠입니다. 레이아웃이 올바르게 스크롤되는지 확인할
              수 있습니다. 각 섹션은 충분한 내용을 포함하고 있어 전체 레이아웃의 스크롤 동작을
              테스트할 수 있습니다.
            </p>
          </div>
        ))}
      </div>
    ),
  },
};
