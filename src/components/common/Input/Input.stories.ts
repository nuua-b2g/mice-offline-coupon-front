import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import React from 'react';
import Input from './Input';

const meta = {
  title: 'Components/Common/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    link: {
      control: 'text',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 입력 필드
export const Default: Story = {
  args: {
    placeholder: '여기에 입력하세요',
  },
};

// 레이블이 있는 입력 필드
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    error: '올바른 이메일 형식이 아닙니다',
    value: 'invalid-email',
  },
};

// 링크가 포함된 입력 필드
export const WithLink: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    link: '/forgot-password',
  },
};

// 아이콘이 포함된 입력 필드
export const WithIcon: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력하세요',
    icon: '🔍',
  },
};

// 비활성화된 상태
export const Disabled: Story = {
  args: {
    label: '비활성화된 필드',
    placeholder: '수정할 수 없습니다',
    disabled: true,
    value: '고정된 값',
  },
};

// 다양한 타입들
export const EmailType: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@domain.com',
  },
};

export const PasswordType: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const NumberType: Story = {
  args: {
    label: '나이',
    type: 'number',
    placeholder: '숫자만 입력 가능',
  },
};

// 폼 예시 (여러 필드)
export const FormExample: Story = {
  render: () =>
    React.createElement(
      'div',
      {
        style: { display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' },
      },
      [
        React.createElement(Input, { key: '1', label: '이름', placeholder: '이름을 입력하세요' }),
        React.createElement(Input, {
          key: '2',
          label: '이메일',
          type: 'email',
          placeholder: 'example@domain.com',
        }),
        React.createElement(Input, {
          key: '3',
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력하세요',
        }),
        React.createElement(Input, {
          key: '4',
          label: '전화번호',
          type: 'tel',
          placeholder: '010-0000-0000',
        }),
      ]
    ),
};
