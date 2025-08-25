import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ImageUpload.module.css';

export interface ImageUploadProps {
  label?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number; // MB 단위
  disabled?: boolean;
  className?: string;
  onImageUpload?: (file: File) => Promise<string>; // 이미지 업로드 후 URL 반환
  onImageChange?: (imageUrl: string) => void; // 이미지 URL 변경 시 콜백
  defaultValue?: string; // 초기 이미지 URL
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  required = false,
  accept = 'image/*',
  maxSize,
  disabled = false,
  className,
  onImageUpload,
  onImageChange,
  defaultValue = '',
}) => {
  const [uploadedImage, setUploadedImage] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    setError('');

    try {
      // 파일 크기 검증
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        throw new Error(`파일이 너무 큽니다. 최대 ${maxSize}MB까지 업로드 가능합니다.`);
      }

      // 파일 타입 검증
      if (accept && !file.type.match(accept)) {
        throw new Error('지원되지 않는 파일 타입입니다.');
      }

      // 이미지 업로드 함수가 있으면 사용
      if (onImageUpload) {
        const imageUrl = await onImageUpload(file);
        setUploadedImage(imageUrl);
        onImageChange?.(imageUrl);
      } else {
        // 기본적으로 FileReader 사용 (로컬 미리보기)
        const reader = new FileReader();
        const imageUrl = await new Promise<string>(resolve => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        setUploadedImage(imageUrl);
        onImageChange?.(imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage('');
    onImageChange?.('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${styles.imageUpload} ${className || ''}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={styles.hiddenInput}
        disabled={disabled || isUploading}
      />

      <div className={styles.uploadArea}>
        <button
          type="button"
          onClick={openFileDialog}
          className={styles.uploadButton}
          disabled={disabled || isUploading}
        >
          {isUploading ? '업로드 중...' : '이미지 선택'}
        </button>

        {accept && <p className={styles.acceptInfo}>지원 형식: {accept}</p>}

        {maxSize && <p className={styles.sizeInfo}>최대 크기: {maxSize}MB</p>}
      </div>

      {/* 업로드된 이미지 미리보기 */}
      {uploadedImage && (
        <div className={styles.imagePreview}>
          <h4 className={styles.previewTitle}>업로드된 이미지</h4>
          <div className={styles.imageItem}>
            <Image
              src={uploadedImage}
              alt="업로드된 이미지"
              width={200}
              height={150}
              className={styles.previewImage}
            />
            <button
              type="button"
              onClick={removeImage}
              className={styles.removeButton}
              disabled={disabled}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default ImageUpload;
