import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  closable = true,
  onClose,
  position = 'top-right',
  action,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  if (!isVisible) return null;

  const toastContent = (
    <div
      className={`${styles.toast} ${styles[`toast--${type}`]} ${styles[`toast--${position}`]} ${
        isLeaving ? styles.toastLeaving : styles.toastEntering
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>{getIcon()}</span>
        <span className={styles.toastMessage}>{message}</span>
        {action && (
          <button type="button" className={styles.toastAction} onClick={action.onClick}>
            {action.label}
          </button>
        )}
        {closable && (
          <button
            type="button"
            className={styles.toastClose}
            onClick={handleClose}
            aria-label="닫기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
};

// Toast Container for managing multiple toasts
export interface ToastContainerProps {
  toasts: (ToastProps & { id: string })[];
  onRemove: (id: string) => void;
  position?: ToastProps['position'];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = 'top-right',
}) => {
  if (toasts.length === 0) return null;

  const containerContent = (
    <div className={`${styles.toastContainer} ${styles[`toastContainer--${position}`]}`}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} position={position} onClose={() => onRemove(toast.id)} />
      ))}
    </div>
  );

  return createPortal(containerContent, document.body);
};

// Toast Hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  const toast = {
    success: (message: string, options?: Partial<ToastProps>) =>
      addToast({ message, type: 'success', ...options }),
    error: (message: string, options?: Partial<ToastProps>) =>
      addToast({ message, type: 'error', ...options }),
    warning: (message: string, options?: Partial<ToastProps>) =>
      addToast({ message, type: 'warning', ...options }),
    info: (message: string, options?: Partial<ToastProps>) =>
      addToast({ message, type: 'info', ...options }),
  };

  return {
    toasts,
    toast,
    removeToast,
    clearToasts,
  };
};

export default Toast;
