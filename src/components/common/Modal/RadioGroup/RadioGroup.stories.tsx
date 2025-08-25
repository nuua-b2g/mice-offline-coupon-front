import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { RadioGroup, RadioOption } from './RadioGroup';

// 기본 옵션들
const basicOptions: RadioOption[] = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

// 설명이 있는 옵션들
const optionsWithDescription: RadioOption[] = [
  {
    value: 'basic',
    label: '기본 플랜',
    description: '개인 사용자를 위한 기본 기능을 제공합니다.',
  },
  {
    value: 'pro',
    label: '프로 플랜',
    description: '고급 기능과 우선 지원을 제공합니다.',
  },
  {
    value: 'enterprise',
    label: '엔터프라이즈',
    description: '대규모 조직을 위한 완전한 기능을 제공합니다.',
  },
];

// 쿠폰 타입 옵션들
const couponTypeOptions: RadioOption[] = [
  {
    value: 'percentage',
    label: '퍼센트 할인',
    description: '상품 가격의 일정 비율을 할인합니다.',
  },
  {
    value: 'fixed',
    label: '고정 금액 할인',
    description: '고정된 금액을 할인합니다.',
  },
  {
    value: 'freeShipping',
    label: '무료 배송',
    description: '배송비를 무료로 제공합니다.',
  },
];

// 상태 옵션들
const statusOptions: RadioOption[] = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'pending', label: '대기중' },
  { value: 'expired', label: '만료됨', disabled: true },
];

const meta = {
  title: 'Components/Common/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '라디오 버튼 배치 방향',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '컴포넌트 크기',
    },
    disabled: {
      control: 'boolean',
      description: '전체 비활성화',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 라디오 그룹
export const Default: Story = {
  args: {
    name: 'default',
    options: basicOptions,
    label: '옵션을 선택하세요',
    defaultValue: 'option1',
  },
};

// 제어되는 컴포넌트
export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState<string | number>('option2');

    return (
      <div>
        <RadioGroup {...args} value={value} onChange={setValue} />
        <p style={{ marginTop: '16px', color: '#666' }}>
          선택된 값: <strong>{value}</strong>
        </p>
      </div>
    );
  },
  args: {
    name: 'controlled',
    options: basicOptions,
    label: '제어되는 라디오 그룹',
  },
};

// 설명이 있는 라디오 그룹
export const WithDescription: Story = {
  args: {
    name: 'plan',
    options: optionsWithDescription,
    label: '플랜 선택',
    description: '사용 목적에 맞는 플랜을 선택해주세요.',
    defaultValue: 'basic',
  },
};

// 쿠폰 타입 선택
export const CouponType: Story = {
  args: {
    name: 'couponType',
    options: couponTypeOptions,
    label: '쿠폰 타입',
    description: '생성할 쿠폰의 할인 방식을 선택하세요.',
    required: true,
    defaultValue: 'percentage',
  },
};

// 수평 배치
export const Horizontal: Story = {
  args: {
    name: 'horizontal',
    options: basicOptions,
    label: '수평 배치',
    direction: 'horizontal',
    defaultValue: 'option1',
  },
};

// 작은 크기
export const Small: Story = {
  args: {
    name: 'small',
    options: basicOptions,
    label: '작은 크기',
    size: 'small',
    defaultValue: 'option1',
  },
};

// 큰 크기
export const Large: Story = {
  args: {
    name: 'large',
    options: optionsWithDescription,
    label: '큰 크기',
    size: 'large',
    defaultValue: 'basic',
  },
};

// 비활성화된 옵션들
export const WithDisabledOptions: Story = {
  args: {
    name: 'status',
    options: statusOptions,
    label: '상태 선택',
    description: '일부 옵션은 현재 선택할 수 없습니다.',
    defaultValue: 'active',
  },
};

// 전체 비활성화
export const Disabled: Story = {
  args: {
    name: 'disabled',
    options: basicOptions,
    label: '비활성화된 라디오 그룹',
    description: '모든 옵션이 비활성화되어 있습니다.',
    disabled: true,
    defaultValue: 'option1',
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    name: 'error',
    options: basicOptions,
    label: '필수 선택',
    required: true,
    error: '옵션을 반드시 선택해주세요.',
  },
};

// 긴 옵션 목록
export const LongList: Story = {
  args: {
    name: 'longList',
    options: [
      { value: '1', label: '첫 번째 옵션', description: '첫 번째 옵션에 대한 설명입니다.' },
      { value: '2', label: '두 번째 옵션', description: '두 번째 옵션에 대한 설명입니다.' },
      { value: '3', label: '세 번째 옵션', description: '세 번째 옵션에 대한 설명입니다.' },
      { value: '4', label: '네 번째 옵션', description: '네 번째 옵션에 대한 설명입니다.' },
      { value: '5', label: '다섯 번째 옵션', description: '다섯 번째 옵션에 대한 설명입니다.' },
      { value: '6', label: '여섯 번째 옵션', description: '여섯 번째 옵션에 대한 설명입니다.' },
    ],
    label: '긴 옵션 목록',
    description: '많은 옵션 중에서 선택할 수 있습니다.',
    defaultValue: '1',
  },
};

// 수평 배치 + 설명
export const HorizontalWithDescription: Story = {
  args: {
    name: 'horizontalDesc',
    options: [
      { value: 'yes', label: '예', description: '동의합니다' },
      { value: 'no', label: '아니오', description: '동의하지 않습니다' },
      { value: 'maybe', label: '보류', description: '나중에 결정하겠습니다' },
    ],
    label: '동의 여부',
    direction: 'horizontal',
    required: true,
  },
};

// 복잡한 사용 사례 (설정 페이지)
export const SettingsExample: Story = {
  args: {
    name: 'settings',
    options: [
      { value: 'light', label: '라이트 모드' },
      { value: 'dark', label: '다크 모드' },
      { value: 'auto', label: '시스템 설정' },
    ],
    label: '테마 설정',
    description: '원하는 테마를 선택하세요.',
  },
  render: () => {
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState('all');
    const [privacy, setPrivacy] = useState('friends');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
        <RadioGroup
          name="theme"
          value={theme}
          onChange={value => setTheme(value as string)}
          label="테마 설정"
          description="원하는 테마를 선택하세요."
          options={[
            { value: 'light', label: '라이트 모드', description: '밝은 배경의 테마입니다.' },
            { value: 'dark', label: '다크 모드', description: '어두운 배경의 테마입니다.' },
            { value: 'auto', label: '시스템 설정', description: '시스템 설정을 따릅니다.' },
          ]}
        />

        <RadioGroup
          name="notifications"
          value={notifications}
          onChange={value => setNotifications(value as string)}
          label="알림 설정"
          description="받고 싶은 알림을 설정하세요."
          options={[
            { value: 'all', label: '모든 알림', description: '모든 종류의 알림을 받습니다.' },
            { value: 'important', label: '중요 알림만', description: '중요한 알림만 받습니다.' },
            { value: 'none', label: '알림 끄기', description: '모든 알림을 받지 않습니다.' },
          ]}
        />

        <RadioGroup
          name="privacy"
          value={privacy}
          onChange={value => setPrivacy(value as string)}
          label="프라이버시 설정"
          description="프로필 공개 범위를 설정하세요."
          direction="horizontal"
          options={[
            { value: 'public', label: '전체 공개' },
            { value: 'friends', label: '친구만' },
            { value: 'private', label: '비공개' },
          ]}
        />

        <div
          style={{
            padding: '16px',
            background: '#f5f5f5',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#666',
          }}
        >
          <strong>현재 설정:</strong>
          <br />
          테마: {theme}, 알림: {notifications}, 프라이버시: {privacy}
        </div>
      </div>
    );
  },
};
