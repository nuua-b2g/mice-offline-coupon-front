import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Form } from './Form';

const meta = {
  title: 'Components/Common/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
      description: '폼 레이아웃 스타일',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '폼 요소들의 크기',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    submitText: {
      control: 'text',
      description: '제출 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
  },
  args: {
    layout: 'vertical',
    size: 'medium',
    loading: false,
    submitText: '제출',
    cancelText: '취소',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 폼
export const Default: Story = {
  args: {
    fields: [
      {
        name: 'username',
        label: '사용자명',
        type: 'text',
        placeholder: '사용자명을 입력하세요',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 20,
        },
      },
      {
        name: 'email',
        label: '이메일',
        type: 'email',
        placeholder: '이메일을 입력하세요',
        required: true,
      },
      {
        name: 'password',
        label: '비밀번호',
        type: 'password',
        placeholder: '비밀번호를 입력하세요',
        required: true,
        validation: {
          minLength: 8,
        },
      },
    ],
    onSubmit: data => console.log('폼 제출:', data),
  },
};

// 쿠폰 등록 폼
export const CouponForm: Story = {
  args: {
    fields: [
      {
        name: 'name',
        label: '쿠폰명',
        type: 'text',
        required: true,
        placeholder: '쿠폰 이름을 입력하세요',
        validation: {
          minLength: 2,
          maxLength: 50,
        },
      },
      {
        name: 'description',
        label: '쿠폰 설명',
        type: 'textarea',
        placeholder: '쿠폰에 대한 설명을 입력하세요',
        rows: 3,
      },
      {
        name: 'discount',
        label: '할인율',
        type: 'number',
        required: true,
        validation: {
          min: 1,
          max: 100,
        },
      },
      {
        name: 'category',
        label: '카테고리',
        type: 'select',
        required: true,
        options: [
          { value: 'food', label: '음식점' },
          { value: 'shopping', label: '쇼핑' },
          { value: 'entertainment', label: '엔터테인먼트' },
          { value: 'health', label: '헬스/뷰티' },
          { value: 'other', label: '기타' },
        ],
      },
      {
        name: 'validFrom',
        label: '유효 시작일',
        type: 'date',
        required: true,
      },
      {
        name: 'validTo',
        label: '유효 종료일',
        type: 'date',
        required: true,
      },
    ],
    onSubmit: data => {
      console.log('쿠폰 등록:', data);
      alert('쿠폰이 등록되었습니다!');
    },
    onCancel: () => console.log('쿠폰 등록 취소'),
    submitText: '쿠폰 등록',
  },
};

// 관리자 등록 폼
export const AdminForm: Story = {
  args: {
    fields: [
      {
        name: 'adminName',
        label: '관리자명',
        type: 'text',
        placeholder: '관리자 이름을 입력하세요',
        required: true,
      },
      {
        name: 'adminEmail',
        label: '이메일',
        type: 'email',
        placeholder: '관리자 이메일을 입력하세요',
        required: true,
      },
      {
        name: 'role',
        label: '권한',
        type: 'select',
        required: true,
        options: [
          { value: 'super', label: '슈퍼 관리자' },
          { value: 'admin', label: '일반 관리자' },
          { value: 'moderator', label: '모더레이터' },
        ],
      },
      {
        name: 'department',
        label: '부서',
        type: 'text',
        placeholder: '소속 부서를 입력하세요',
      },
    ],
    layout: 'horizontal',
    onSubmit: data => console.log('관리자 등록:', data),
    onCancel: () => console.log('관리자 등록 취소'),
    submitText: '관리자 등록',
  },
};

// 인라인 레이아웃 폼
export const InlineLayout: Story = {
  args: {
    fields: [
      {
        name: 'searchKeyword',
        label: '검색어',
        type: 'text',
        placeholder: '검색할 키워드를 입력하세요',
      },
      {
        name: 'searchCategory',
        label: '카테고리',
        type: 'select',
        options: [
          { value: 'all', label: '전체' },
          { value: 'coupons', label: '쿠폰' },
          { value: 'users', label: '사용자' },
          { value: 'admins', label: '관리자' },
        ],
      },
      {
        name: 'dateRange',
        label: '기간',
        type: 'date',
      },
    ],
    layout: 'inline',
    onSubmit: data => console.log('검색:', data),
    submitText: '검색',
    onCancel: () => console.log('검색 초기화'),
  },
};

// 작은 크기 폼
export const SmallSize: Story = {
  args: {
    fields: [
      {
        name: 'username',
        label: '사용자명',
        type: 'text',
        placeholder: '사용자명을 입력하세요',
        required: true,
      },
      {
        name: 'password',
        label: '비밀번호',
        type: 'password',
        placeholder: '비밀번호를 입력하세요',
        required: true,
      },
    ],
    size: 'small',
    onSubmit: data => console.log('로그인:', data),
    submitText: '로그인',
  },
};

// 큰 크기 폼
export const LargeSize: Story = {
  args: {
    fields: [
      {
        name: 'fullName',
        label: '전체 이름',
        type: 'text',
        placeholder: '전체 이름을 입력하세요',
        required: true,
      },
      {
        name: 'bio',
        label: '자기소개',
        type: 'textarea',
        placeholder: '자기소개를 입력하세요',
        rows: 4,
      },
    ],
    size: 'large',
    onSubmit: data => console.log('프로필 업데이트:', data),
    submitText: '프로필 업데이트',
  },
};

// 로딩 상태 폼
export const LoadingState: Story = {
  args: {
    fields: [
      {
        name: 'title',
        label: '제목',
        type: 'text',
        placeholder: '제목을 입력하세요',
        required: true,
      },
      {
        name: 'content',
        label: '내용',
        type: 'textarea',
        placeholder: '내용을 입력하세요',
        rows: 5,
      },
    ],
    loading: true,
    submitText: '저장',
    onSubmit: data => console.log('저장:', data),
  },
};

// 에러가 있는 폼
export const WithErrors: Story = {
  args: {
    fields: [
      {
        name: 'email',
        label: '이메일',
        type: 'email',
        placeholder: '이메일을 입력하세요',
        required: true,
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
      },
      {
        name: 'age',
        label: '나이',
        type: 'number',
        placeholder: '나이를 입력하세요',
        validation: {
          min: 18,
          max: 100,
        },
      },
    ],
    onSubmit: data => console.log('제출:', data),
    submitText: '제출',
  },
};

// 비활성화된 폼
export const DisabledForm: Story = {
  args: {
    fields: [
      {
        name: 'readonlyField',
        label: '읽기 전용 필드',
        type: 'text',
        placeholder: '수정할 수 없는 값',
        disabled: true,
      },
      {
        name: 'disabledSelect',
        label: '비활성화된 선택',
        type: 'select',
        options: [
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
        ],
        disabled: true,
      },
    ],
    onSubmit: data => console.log('제출:', data),
    submitText: '제출',
  },
};
