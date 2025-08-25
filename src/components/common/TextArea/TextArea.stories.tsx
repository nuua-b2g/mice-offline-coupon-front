import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import TextArea from './TextArea';

const meta = {
  title: 'Components/Common/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: '크기 조절 방향',
    },
    rows: {
      control: 'number',
      description: '기본 행 수',
    },
    minRows: {
      control: 'number',
      description: '최소 행 수',
    },
    maxRows: {
      control: 'number',
      description: '최대 행 수',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
    },
    required: {
      control: 'boolean',
      description: '필수 입력',
    },
    showCharCount: {
      control: 'boolean',
      description: '글자 수 표시',
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 TextArea
export const Default: Story = {
  args: {
    label: '메모',
    placeholder: '내용을 입력하세요',
  },
};

// 제어되는 컴포넌트
export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState('초기값입니다.\n여러 줄의 텍스트를 입력할 수 있습니다.');

    return (
      <div>
        <TextArea {...args} value={value} onChange={setValue} />
        <div
          style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}
        >
          <strong>현재 값:</strong>
          <pre style={{ margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>{value}</pre>
        </div>
      </div>
    );
  },
  args: {
    label: '제어되는 TextArea',
    placeholder: '내용을 입력하세요',
  },
};

// 도움말 텍스트가 있는 TextArea
export const WithHelperText: Story = {
  args: {
    label: '상품 설명',
    placeholder: '상품에 대한 자세한 설명을 입력하세요',
    helperText: '고객이 상품을 잘 이해할 수 있도록 상세히 작성해주세요.',
  },
};

// 필수 입력 TextArea
export const Required: Story = {
  args: {
    label: '피드백',
    placeholder: '피드백을 입력해주세요',
    required: true,
    helperText: '귀하의 의견은 서비스 개선에 큰 도움이 됩니다.',
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    label: '리뷰 작성',
    placeholder: '리뷰를 작성해주세요',
    required: true,
    error: '리뷰는 최소 10글자 이상 입력해주세요.',
    defaultValue: '너무 짧음',
  },
};

// 글자 수 제한
export const WithCharLimit: Story = {
  args: {
    label: '짧은 소개',
    placeholder: '간단한 소개를 입력하세요',
    maxLength: 100,
    showCharCount: true,
    helperText: '100자 이내로 간단히 작성해주세요.',
  },
};

// 글자 수 표시
export const WithCharCount: Story = {
  args: {
    label: '댓글',
    placeholder: '댓글을 입력하세요',
    showCharCount: true,
    defaultValue: '이것은 샘플 댓글입니다.',
  },
};

// 자동 크기 조절
export const AutoResize: Story = {
  args: {
    label: '자동 크기 조절',
    placeholder: '텍스트를 입력하면 높이가 자동으로 조절됩니다',
    minRows: 2,
    maxRows: 6,
    resize: 'none',
  },
};

// 큰 텍스트 영역
export const Large: Story = {
  args: {
    label: '상세 내용',
    placeholder: '상세한 내용을 입력하세요',
    rows: 8,
    showCharCount: true,
  },
};

// 크기 조절 없음
export const NoResize: Story = {
  args: {
    label: '고정 크기',
    placeholder: '크기를 조절할 수 없습니다',
    resize: 'none',
    rows: 4,
  },
};

// 수평 크기 조절
export const HorizontalResize: Story = {
  args: {
    label: '수평 크기 조절',
    placeholder: '가로로만 크기를 조절할 수 있습니다',
    resize: 'horizontal',
    rows: 4,
  },
};

// 모든 방향 크기 조절
export const BothResize: Story = {
  args: {
    label: '자유 크기 조절',
    placeholder: '모든 방향으로 크기를 조절할 수 있습니다',
    resize: 'both',
    rows: 4,
  },
};

// 비활성화된 TextArea
export const Disabled: Story = {
  args: {
    label: '비활성화된 TextArea',
    placeholder: '입력할 수 없습니다',
    disabled: true,
    defaultValue: '이 내용은 수정할 수 없습니다.',
  },
};

// 쿠폰 설명 예제
export const CouponDescription: Story = {
  args: {
    label: '쿠폰 설명',
    placeholder: '쿠폰 사용 조건 및 상세 설명을 입력하세요',
    required: true,
    maxLength: 500,
    showCharCount: true,
    rows: 6,
    helperText: '고객이 쿠폰을 올바르게 사용할 수 있도록 명확하게 작성해주세요.',
    defaultValue:
      '신규 가입 고객을 위한 특별 할인 쿠폰입니다.\n\n사용 조건:\n- 최소 주문 금액 30,000원 이상\n- 1인 1회 사용 가능\n- 다른 할인과 중복 사용 불가',
  },
};

// 공지사항 작성 예제
export const NoticeEditor: Story = {
  args: {
    label: '공지사항 내용',
    placeholder: '공지사항 내용을 입력하세요',
    required: true,
    minRows: 5,
    maxRows: 15,
    showCharCount: true,
    helperText: '마크다운 문법을 사용할 수 있습니다.',
  },
};

// 피드백 폼 예제
export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`피드백이 제출되었습니다!\n이메일: ${email}\n내용: ${feedback}`);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            이메일 주소
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
        </div>

        <TextArea
          label="피드백"
          value={feedback}
          onChange={setFeedback}
          placeholder="서비스에 대한 의견이나 개선 사항을 알려주세요"
          required
          minRows={4}
          maxRows={8}
          maxLength={1000}
          showCharCount
          helperText="구체적인 피드백일수록 더 도움이 됩니다."
        />

        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
          disabled={!feedback.trim() || !email.trim()}
        >
          피드백 제출
        </button>
      </form>
    );
  },
};
