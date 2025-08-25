import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Tab, TabItem } from './Tab';
import Button from '../Button';
import Input from '../Input';

// 기본 탭 아이템들
const basicTabs: TabItem[] = [
  {
    key: 'tab1',
    label: '첫 번째 탭',
    content: (
      <div>
        <h3>첫 번째 탭 내용</h3>
        <p>이것은 첫 번째 탭의 내용입니다.</p>
      </div>
    ),
  },
  {
    key: 'tab2',
    label: '두 번째 탭',
    content: (
      <div>
        <h3>두 번째 탭 내용</h3>
        <p>이것은 두 번째 탭의 내용입니다.</p>
      </div>
    ),
  },
  {
    key: 'tab3',
    label: '세 번째 탭',
    content: (
      <div>
        <h3>세 번째 탭 내용</h3>
        <p>이것은 세 번째 탭의 내용입니다.</p>
      </div>
    ),
  },
];

// 쿠폰 관리 탭들
const couponTabs: TabItem[] = [
  {
    key: 'active',
    label: '활성 쿠폰',
    badge: '24',
    content: (
      <div>
        <h3>활성 쿠폰 목록</h3>
        <p>현재 사용 가능한 24개의 쿠폰이 있습니다.</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
          <Button variant="primary">새 쿠폰 생성</Button>
          <Button variant="secondary">일괄 관리</Button>
        </div>
      </div>
    ),
  },
  {
    key: 'expired',
    label: '만료된 쿠폰',
    badge: '156',
    content: (
      <div>
        <h3>만료된 쿠폰 목록</h3>
        <p>156개의 만료된 쿠폰이 있습니다.</p>
        <div style={{ marginTop: '16px' }}>
          <Button variant="danger">일괄 삭제</Button>
        </div>
      </div>
    ),
  },
  {
    key: 'draft',
    label: '임시저장',
    badge: '3',
    content: (
      <div>
        <h3>임시저장된 쿠폰</h3>
        <p>3개의 임시저장된 쿠폰이 있습니다.</p>
        <div style={{ marginTop: '16px' }}>
          <Button variant="secondary">계속 편집</Button>
        </div>
      </div>
    ),
  },
];

// 폼 탭들
const formTabs: TabItem[] = [
  {
    key: 'basic',
    label: '기본 정보',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="제목" placeholder="제목을 입력하세요" />
        <Input label="설명" placeholder="설명을 입력하세요" />
        <div style={{ display: 'flex', gap: '12px' }}>
          <Input label="시작일" type="date" />
          <Input label="종료일" type="date" />
        </div>
      </div>
    ),
  },
  {
    key: 'advanced',
    label: '고급 설정',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="최대 사용 횟수" type="number" placeholder="0" />
        <Input label="사용자당 최대 사용" type="number" placeholder="1" />
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            추가 조건
          </label>
          <textarea
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical',
              minHeight: '80px',
            }}
            placeholder="추가 조건을 입력하세요"
          />
        </div>
      </div>
    ),
  },
  {
    key: 'preview',
    label: '미리보기',
    content: (
      <div>
        <h3>쿠폰 미리보기</h3>
        <div
          style={{
            border: '2px dashed #1976d2',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            background: '#f8f9ff',
            marginTop: '16px',
          }}
        >
          <div
            style={{ fontSize: '20px', fontWeight: 'bold', color: '#1976d2', marginBottom: '8px' }}
          >
            20% 할인 쿠폰
          </div>
          <div style={{ color: '#666' }}>유효기간: 2024-01-01 ~ 2024-12-31</div>
        </div>
      </div>
    ),
  },
];

const meta = {
  title: 'Components/Common/Tab',
  component: Tab,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'card', 'pill'],
      description: '탭 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '탭 크기',
    },
    position: {
      control: 'select',
      options: ['top', 'left'],
      description: '탭 위치',
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 탭
export const Default: Story = {
  args: {
    items: basicTabs,
    defaultActiveKey: 'tab1',
  },
};

// 카드 스타일 탭
export const CardStyle: Story = {
  args: {
    items: basicTabs,
    variant: 'card',
    defaultActiveKey: 'tab1',
  },
};

// 필 스타일 탭
export const PillStyle: Story = {
  args: {
    items: basicTabs,
    variant: 'pill',
    defaultActiveKey: 'tab1',
  },
};

// 작은 크기
export const Small: Story = {
  args: {
    items: basicTabs,
    size: 'small',
    defaultActiveKey: 'tab1',
  },
};

// 쿠폰 관리 예제
export const CouponManagement: Story = {
  args: {
    items: couponTabs,
    variant: 'card',
    defaultActiveKey: 'active',
  },
};

// 폼 탭 예제
export const FormTabs: Story = {
  args: {
    items: formTabs,
    variant: 'line',
    size: 'medium',
    defaultActiveKey: 'basic',
  },
};

// 많은 탭들
export const ManyTabs: Story = {
  args: {
    items: [
      { key: 'tab1', label: '탭 1', content: <div>탭 1 내용</div> },
      { key: 'tab2', label: '탭 2', content: <div>탭 2 내용</div> },
      { key: 'tab3', label: '탭 3', content: <div>탭 3 내용</div> },
      { key: 'tab4', label: '탭 4', content: <div>탭 4 내용</div> },
      { key: 'tab5', label: '탭 5', content: <div>탭 5 내용</div> },
      { key: 'tab6', label: '탭 6', content: <div>탭 6 내용</div> },
      { key: 'tab7', label: '탭 7', content: <div>탭 7 내용</div> },
      { key: 'tab8', label: '탭 8', content: <div>탭 8 내용</div> },
    ],
    variant: 'pill',
    defaultActiveKey: 'tab1',
  },
};

// 비활성화된 탭 포함
export const WithDisabledTabs: Story = {
  args: {
    items: [
      {
        key: 'available',
        label: '사용 가능',
        icon: '✅',
        content: (
          <div>
            <h3>사용 가능한 기능</h3>
            <p>이 기능은 현재 사용할 수 있습니다.</p>
          </div>
        ),
      },
      {
        key: 'coming-soon',
        label: '출시 예정',
        icon: '🚧',
        disabled: true,
        content: (
          <div>
            <h3>출시 예정</h3>
            <p>이 기능은 곧 출시될 예정입니다.</p>
          </div>
        ),
      },
      {
        key: 'maintenance',
        label: '점검 중',
        icon: '⚠️',
        disabled: true,
        content: (
          <div>
            <h3>점검 중</h3>
            <p>현재 점검 중인 기능입니다.</p>
          </div>
        ),
      },
    ],
    defaultActiveKey: 'available',
  },
};
