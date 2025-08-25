import React, { memo } from 'react';
import styles from './Tag.module.css';

export type TagVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
  onClick?: () => void;
  /** x 아이콘 표시 여부 */
  closable?: boolean;
  /** x 클릭 시 콜백 */
  onClose?: () => void;
}

const Tag = memo(
  ({
    children,
    variant = 'primary',
    className = '',
    onClick,
    closable = false,
    onClose,
  }: TagProps) => {
    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose?.();
    };

    return (
      <span
        className={`${styles.tag} ${styles[variant]} ${className}`}
        data-variant={variant}
        onClick={onClick}
        role="status"
      >
        {children}
        {closable && (
          <span className={styles.closeIcon} onClick={handleClose} aria-label="close">
            ×
          </span>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
