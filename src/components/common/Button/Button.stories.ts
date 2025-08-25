import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Button from './Button';

const meta = {
  title: 'Components/Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'gray', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    width: {
      control: 'text',
    },
  },
  args: {
    onClick: fn(),
    children: '버튼',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼들
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '기본 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '보조 버튼',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
    children: '회색 버튼',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: '경고 버튼',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '위험 버튼',
  },
};

// 크기별 버튼
export const Small: Story = {
  args: {
    size: 'small',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '큰 버튼',
  },
};

// 상태별 버튼
export const Loading: Story = {
  args: {
    isLoading: true,
    children: '로딩 중...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화됨',
  },
};

// 너비 설정
export const FullWidth: Story = {
  args: {
    width: '300px',
    children: '넓은 버튼',
  },
};

// 아이콘 포함 (예시)
export const WithIcon: Story = {
  args: {
    icon: '🚀',
    children: '아이콘 버튼',
  },
};
