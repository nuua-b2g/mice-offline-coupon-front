import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Input';

const meta = {
  title: 'Components/Common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: '모달 너비',
    },
    height: {
      control: 'text',
      description: '모달 높이',
    },
    preserveLineBreaks: {
      control: 'boolean',
      description: '줄바꿈 보존',
    },
    centered: {
      control: 'boolean',
      description: '중앙 정렬',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Story = StoryObj<any>;

// 기본 모달을 위한 래퍼 컴포넌트
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

// 기본 모달
export const Default: Story = {
  render: () => (
    <ModalWrapper
      title="기본 모달"
      width="500px"
      height="auto"
      preserveLineBreaks={false}
      centered={true}
    >
      <p>이것은 기본 모달입니다. 여기에 원하는 내용을 넣을 수 있습니다.</p>
    </ModalWrapper>
  ),
};

// 제목이 있는 모달
export const WithTitle: Story = {
  render: () => (
    <ModalWrapper title="사용자 정보" width="600px">
      <div>
        <p style={{ marginBottom: '16px' }}>
          제목이 있는 모달입니다. 사용자에게 명확한 정보를 제공할 수 있습니다.
        </p>
        <p style={{ margin: 0, color: '#666' }}>
          추가적인 설명이나 안내 문구를 여기에 작성할 수 있습니다.
        </p>
      </div>
    </ModalWrapper>
  ),
};

// 푸터가 있는 모달
export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="작업 확인"
      width="600px"
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="gray">취소</Button>
          <Button variant="primary">확인</Button>
        </div>
      }
    >
      <div>
        <p style={{ marginBottom: '16px' }}>푸터 영역에 액션 버튼들을 배치할 수 있습니다.</p>
        <p style={{ margin: 0, color: '#666' }}>
          확인, 취소 등의 버튼을 통해 사용자의 액션을 처리할 수 있습니다.
        </p>
      </div>
    </ModalWrapper>
  ),
};

// 폼이 있는 모달
export const FormModal: Story = {
  render: () => (
    <ModalWrapper
      title="새 사용자 추가"
      width="600px"
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="gray">취소</Button>
          <Button variant="primary">저장</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="이름" placeholder="이름을 입력하세요" />
        <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />
        <Input label="전화번호" placeholder="전화번호를 입력하세요" />
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>메모</label>
          <textarea
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical',
              minHeight: '80px',
            }}
            placeholder="추가 메모를 입력하세요"
          />
        </div>
      </div>
    </ModalWrapper>
  ),
};

// 작은 모달
export const SmallModal: Story = {
  render: () => (
    <ModalWrapper
      title="알림"
      width="400px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary">확인</Button>
        </div>
      }
    >
      <p style={{ margin: 0, textAlign: 'center' }}>
        작은 크기의 모달입니다. 간단한 메시지나 확인 창에 적합합니다.
      </p>
    </ModalWrapper>
  ),
};

// 큰 모달
export const LargeModal: Story = {
  render: () => (
    <ModalWrapper
      title="사용자 상세 정보"
      width="900px"
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
          <Button variant="danger">삭제</Button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="gray">취소</Button>
            <Button variant="primary">저장</Button>
          </div>
        </div>
      }
    >
      <div>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>상세 정보</h3>
        <p style={{ marginBottom: '16px' }}>
          큰 모달은 더 많은 내용을 표시할 때 사용합니다. 복잡한 폼이나 상세한 정보를 보여줄 때
          적합합니다.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <Input label="성" placeholder="성을 입력하세요" />
          <Input label="이름" placeholder="이름을 입력하세요" />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />
          <Input label="전화번호" placeholder="전화번호를 입력하세요" />
        </div>
        <Input label="주소" placeholder="주소를 입력하세요" />
      </div>
    </ModalWrapper>
  ),
};

// 넓은 모달
export const WideModal: Story = {
  render: () => (
    <ModalWrapper
      title="고급 설정"
      width="1200px"
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="gray">초기화</Button>
          <Button variant="secondary">미리보기</Button>
          <Button variant="primary">적용</Button>
        </div>
      }
    >
      <div>
        <h2 style={{ marginTop: 0, marginBottom: '24px' }}>넓은 모달</h2>
        <p style={{ marginBottom: '24px' }}>
          넓은 모달은 복잡한 인터페이스나 많은 데이터를 표시할 때 사용합니다.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <div>
            <h3>섹션 1</h3>
            <Input label="필드 1" placeholder="값을 입력하세요" />
            <Input label="필드 2" placeholder="값을 입력하세요" />
          </div>
          <div>
            <h3>섹션 2</h3>
            <Input label="필드 3" placeholder="값을 입력하세요" />
            <Input label="필드 4" placeholder="값을 입력하세요" />
          </div>
          <div>
            <h3>섹션 3</h3>
            <Input label="필드 5" placeholder="값을 입력하세요" />
            <Input label="필드 6" placeholder="값을 입력하세요" />
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
};

// 줄바꿈 보존 모달
export const PreserveLineBreaks: Story = {
  render: () => (
    <ModalWrapper title="줄바꿈 보존" width="500px" preserveLineBreaks={true}>
      <div>
        <p>줄바꿈이 보존되는 모달입니다.</p>
        <p>이 텍스트는 여러 줄로</p>
        <p>표시됩니다.</p>
        <p>각 줄이 별도의 문단으로 처리됩니다.</p>
      </div>
    </ModalWrapper>
  ),
};

// 취소 버튼이 있는 모달
export const WithCancelButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCancel = () => {
      alert('취소되었습니다!');
      setIsOpen(false);
    };

    return (
      <div>
        <Button onClick={() => setIsOpen(true)} variant="primary">
          모달 열기
        </Button>
        <Modal
          title="취소 버튼 테스트"
          width="500px"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCancel={handleCancel}
        >
          <div>
            <p>취소 버튼이 있는 모달입니다.</p>
            <p>닫기 버튼과 취소 버튼이 다르게 동작합니다.</p>
          </div>
        </Modal>
      </div>
    );
  },
};

// 중앙 정렬이 아닌 모달
export const NotCentered: Story = {
  render: () => (
    <ModalWrapper title="상단 정렬 모달" width="500px" centered={false}>
      <p>중앙 정렬이 아닌 모달입니다. 상단에 위치합니다.</p>
    </ModalWrapper>
  ),
};

// 커스텀 크기 모달
export const CustomSize: Story = {
  render: () => (
    <ModalWrapper title="커스텀 크기" width="800px" height="400px">
      <div>
        <p>커스텀 크기의 모달입니다.</p>
        <p>너비와 높이를 자유롭게 설정할 수 있습니다.</p>
      </div>
    </ModalWrapper>
  ),
};
