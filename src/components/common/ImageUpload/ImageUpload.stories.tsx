import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';

const meta = {
  title: 'Components/Common/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '이미지 업로드 필드 라벨',
    },
    required: {
      control: 'boolean',
      description: '필수 여부',
    },
    accept: {
      control: 'text',
      description: '허용되는 파일 타입',
    },
    maxSize: {
      control: 'number',
      description: '최대 파일 크기 (MB)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onImageUpload: {
      action: 'imageUploaded',
      description: '이미지 업로드 완료 시 호출되는 함수',
    },
    onImageChange: {
      action: 'imageChanged',
      description: '이미지 변경 시 호출되는 함수',
    },
  },
  args: {
    label: '이미지 업로드',
    required: false,
    accept: 'image/*',
    maxSize: 5,
    disabled: false,
  },
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 이미지 업로드
export const Default: Story = {
  args: {
    label: '프로필 이미지',
    onImageUpload: async file => {
      console.log('업로드된 파일:', file.name);
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `https://example.com/images/${file.name}`;
    },
  },
};

// 필수 이미지 업로드
export const Required: Story = {
  args: {
    label: '쿠폰 이미지',
    required: true,
    onImageUpload: async file => {
      console.log('필수 이미지 업로드:', file.name);
      await new Promise(resolve => setTimeout(resolve, 800));
      return `https://example.com/coupons/${file.name}`;
    },
  },
};

// 특정 파일 타입만 허용
export const SpecificFileTypes: Story = {
  args: {
    label: 'JPEG/PNG 이미지',
    accept: 'image/jpeg,image/png',
    maxSize: 3,
    onImageUpload: async file => {
      console.log('JPEG/PNG 업로드:', file.name);
      await new Promise(resolve => setTimeout(resolve, 600));
      return `https://example.com/images/${file.name}`;
    },
  },
};

// 큰 파일 크기 제한
export const LargeFileSize: Story = {
  args: {
    label: '고화질 이미지',
    accept: 'image/*',
    maxSize: 10,
    onImageUpload: async file => {
      console.log('고화질 이미지 업로드:', file.name);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return `https://example.com/high-quality/${file.name}`;
    },
  },
};

// 비활성화된 상태
export const Disabled: Story = {
  args: {
    label: '비활성화된 이미지 업로드',
    disabled: true,
    onImageUpload: async file => {
      console.log('업로드 시도 (비활성화됨):', file.name);
      return '';
    },
  },
};

// 초기값이 있는 이미지 업로드
export const WithDefaultValue: Story = {
  args: {
    label: '기존 이미지 수정',
    defaultValue: 'https://via.placeholder.com/200x150/3b82f6/ffffff?text=기존+이미지',
    onImageUpload: async file => {
      console.log('이미지 수정:', file.name);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `https://example.com/updated/${file.name}`;
    },
  },
};

// 로컬 미리보기 (onImageUpload 없음)
export const LocalPreview: Story = {
  args: {
    label: '로컬 미리보기',
    accept: 'image/*',
    maxSize: 2,
    // onImageUpload가 없으면 FileReader로 로컬 미리보기
  },
};

// 커스텀 스타일
export const CustomStyle: Story = {
  args: {
    label: '커스텀 스타일',
    className: 'custom-image-upload',
    onImageUpload: async file => {
      console.log('커스텀 스타일 업로드:', file.name);
      await new Promise(resolve => setTimeout(resolve, 700));
      return `https://example.com/custom/${file.name}`;
    },
  },
};

// 에러 상태 시뮬레이션
export const WithError: Story = {
  args: {
    label: '에러 테스트',
    maxSize: 1, // 1MB 제한으로 에러 발생 가능
    onImageUpload: async file => {
      console.log('에러 테스트 업로드:', file.name);
      // 의도적으로 에러 발생
      if (file.size > 1024 * 1024) {
        throw new Error('파일이 너무 큽니다.');
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      return `https://example.com/test/${file.name}`;
    },
  },
};

// 인터랙티브 예제
export const Interactive: Story = {
  render: args => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploadHistory, setUploadHistory] = useState<string[]>([]);

    const handleImageUpload = async (file: File) => {
      console.log('인터랙티브 업로드:', file.name);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const url = `https://example.com/interactive/${file.name}`;
      setImageUrl(url);
      setUploadHistory(prev => [...prev, `${file.name} (${new Date().toLocaleTimeString()})`]);
      return url;
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <ImageUpload
          {...args}
          label="인터랙티브 이미지 업로드"
          onImageUpload={handleImageUpload}
          onImageChange={setImageUrl}
        />

        {imageUrl && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#f3f4f6',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#374151' }}>현재 이미지 URL:</h4>
            <p
              style={{
                margin: '0 0 8px 0',
                fontFamily: 'monospace',
                fontSize: '12px',
                wordBreak: 'break-all',
              }}
            >
              {imageUrl}
            </p>
          </div>
        )}

        {uploadHistory.length > 0 && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              background: '#f0f9ff',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>업로드 히스토리:</h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0369a1' }}>
              {uploadHistory.map((item, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  args: {
    maxSize: 5,
    accept: 'image/*',
  },
};
