import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { Toast } from './Toast';
import Button from '../Button';

const meta = {
  title: 'Components/Common/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: '토스트 타입',
    },
    duration: {
      control: 'number',
      description: '표시 시간 (ms)',
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시',
    },
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-center',
        'bottom-center',
      ],
      description: '토스트 위치',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// 단일 토스트 래퍼
const SingleToastWrapper = ({ message, ...props }: React.ComponentProps<typeof Toast>) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsVisible(true)}>토스트 표시</Button>
      {isVisible && <Toast {...props} message={message} onClose={() => setIsVisible(false)} />}
    </div>
  );
};

// 성공 토스트
export const Success: Story = {
  args: {
    message: '작업이 성공적으로 완료되었습니다!',
    type: 'success',
    duration: 4000,
    closable: true,
  },
  render: args => <SingleToastWrapper {...args} />,
};

// 에러 토스트
export const Error: Story = {
  args: {
    message: '오류가 발생했습니다. 다시 시도해주세요.',
    type: 'error',
    duration: 5000,
    closable: true,
  },
  render: args => <SingleToastWrapper {...args} />,
};

// 경고 토스트
export const Warning: Story = {
  args: {
    message: '주의: 이 작업은 되돌릴 수 없습니다.',
    type: 'warning',
    duration: 4000,
    closable: true,
  },
  render: args => <SingleToastWrapper {...args} />,
};

// 정보 토스트
export const Info: Story = {
  args: {
    message: '새로운 업데이트가 있습니다.',
    type: 'info',
    duration: 4000,
    closable: true,
  },
  render: args => <SingleToastWrapper {...args} />,
};

// 액션이 있는 토스트
export const WithAction: Story = {
  args: {
    message: '파일이 삭제되었습니다.',
    type: 'info',
    duration: 8000,
    action: {
      label: '실행 취소',
      onClick: () => alert('실행 취소됨'),
    },
  },
  render: args => <SingleToastWrapper {...args} />,
};

// 다양한 위치 테스트
export const PositionTest: Story = {
  render: () => {
    const [visibleToasts, setVisibleToasts] = useState<{ [key: string]: boolean }>({});

    const positions = [
      { key: 'top-right', label: '우상단' },
      { key: 'top-left', label: '좌상단' },
      { key: 'bottom-right', label: '우하단' },
      { key: 'bottom-left', label: '좌하단' },
      { key: 'top-center', label: '상단 중앙' },
      { key: 'bottom-center', label: '하단 중앙' },
    ] as const;

    const showToast = (position: string) => {
      setVisibleToasts(prev => ({ ...prev, [position]: true }));
    };

    const hideToast = (position: string) => {
      setVisibleToasts(prev => ({ ...prev, [position]: false }));
    };

    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          {positions.map(({ key, label }) => (
            <Button key={key} size="small" onClick={() => showToast(key)}>
              {label}
            </Button>
          ))}
        </div>

        {positions.map(
          ({ key, label }) =>
            visibleToasts[key] && (
              <Toast
                key={key}
                message={`${label} 토스트`}
                type="info"
                position={
                  key as
                    | 'top-right'
                    | 'top-left'
                    | 'bottom-right'
                    | 'bottom-left'
                    | 'top-center'
                    | 'bottom-center'
                }
                duration={3000}
                onClose={() => hideToast(key)}
              />
            )
        )}
      </div>
    );
  },
  args: {
    message: '위치별 토스트 테스트',
    type: 'info',
    duration: 3000,
  },
};

// 쿠폰 관련 토스트 예제
export const CouponToasts: Story = {
  render: () => {
    const [visibleToasts, setVisibleToasts] = useState<{ [key: string]: boolean }>({});

    const showToast = (key: string, message: string) => {
      setVisibleToasts(prev => ({ ...prev, [key]: true }));
    };

    const hideToast = (key: string) => {
      setVisibleToasts(prev => ({ ...prev, [key]: false }));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button
            variant="primary"
            onClick={() => showToast('success', '쿠폰이 성공적으로 생성되었습니다!')}
          >
            쿠폰 생성 성공
          </Button>
          <Button variant="secondary" onClick={() => showToast('info', '쿠폰이 활성화되었습니다.')}>
            쿠폰 활성화
          </Button>
          <Button
            variant="warning"
            onClick={() => showToast('warning', '쿠폰이 곧 만료됩니다. (3일 남음)')}
          >
            쿠폰 만료 임박
          </Button>
          <Button
            variant="danger"
            onClick={() => showToast('error', '쿠폰 삭제에 실패했습니다. 다시 시도해주세요.')}
          >
            쿠폰 삭제 실패
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            variant="gray"
            onClick={() => showToast('copy', '쿠폰 코드가 클립보드에 복사되었습니다.')}
          >
            코드 복사
          </Button>
          <Button variant="gray" onClick={() => showToast('save', '쿠폰 설정이 저장되었습니다.')}>
            설정 저장
          </Button>
        </div>

        {/* 토스트들 */}
        {visibleToasts.success && (
          <Toast
            message="쿠폰이 성공적으로 생성되었습니다!"
            type="success"
            duration={4000}
            onClose={() => hideToast('success')}
          />
        )}
        {visibleToasts.info && (
          <Toast
            message="쿠폰이 활성화되었습니다."
            type="info"
            duration={4000}
            action={{
              label: '보기',
              onClick: () => alert('쿠폰 상세 보기'),
            }}
            onClose={() => hideToast('info')}
          />
        )}
        {visibleToasts.warning && (
          <Toast
            message="쿠폰이 곧 만료됩니다. (3일 남음)"
            type="warning"
            duration={5000}
            onClose={() => hideToast('warning')}
          />
        )}
        {visibleToasts.error && (
          <Toast
            message="쿠폰 삭제에 실패했습니다. 다시 시도해주세요."
            type="error"
            duration={6000}
            onClose={() => hideToast('error')}
          />
        )}
        {visibleToasts.copy && (
          <Toast
            message="쿠폰 코드가 클립보드에 복사되었습니다."
            type="info"
            duration={2000}
            onClose={() => hideToast('copy')}
          />
        )}
        {visibleToasts.save && (
          <Toast
            message="쿠폰 설정이 저장되었습니다."
            type="success"
            duration={4000}
            action={{
              label: '실행 취소',
              onClick: () => {
                hideToast('save');
                showToast('cancel', '변경사항이 취소되었습니다.');
              },
            }}
            onClose={() => hideToast('save')}
          />
        )}
        {visibleToasts.cancel && (
          <Toast
            message="변경사항이 취소되었습니다."
            type="info"
            duration={3000}
            onClose={() => hideToast('cancel')}
          />
        )}
      </div>
    );
  },
  args: {
    message: '쿠폰 관련 토스트 예제',
    type: 'info',
    duration: 4000,
  },
};
