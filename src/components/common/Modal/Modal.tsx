import { CloseOutlined } from '@ant-design/icons';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // 엑스 닫기 버튼
  onCancel?: () => void; // 취소 버튼
  title?: string;
  children: ReactNode;
  width?: string;
  height?: string;
  preserveLineBreaks?: boolean; // 줄바꿈 보존 여부
  footer?: ReactNode; // 푸터 영역 추가
  centered?: boolean; // 중앙 정렬 여부
}

const Modal = ({
  isOpen,
  onClose,
  onCancel,
  title,
  children,
  width = '500px',
  height = 'auto',
  preserveLineBreaks = false,
  footer,
  centered = true,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onCancel]);

  // 줄바꿈 처리 함수
  const renderContent = () => {
    if (!preserveLineBreaks) return children;

    // 문자열인 경우 줄바꿈 처리
    if (typeof children === 'string') {
      return children.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < children.split('\n').length - 1 && <br />}
        </span>
      ));
    }

    // ReactNode인 경우 그대로 반환
    return children;
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay}>
      <div
        ref={modalRef}
        className={styles.modalContent}
        style={{
          width,
          height,
          margin: centered ? 'auto' : '20px auto',
        }}
      >
        {title && (
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <button className={styles.closeButton} onClick={onCancel ? onCancel : onClose}>
              <CloseOutlined />
            </button>
          </div>
        )}
        <div className={styles.modalBody}>{renderContent()}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
