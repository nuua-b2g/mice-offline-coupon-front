import { InputHTMLAttributes, ReactNode, forwardRef, memo, useCallback } from 'react';
import styles from './Input.module.css';
import Link from 'next/link';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  link?: string;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ label, value, error, className, onChange, icon, link = '', ...props }, ref) => {
      // 이벤트 핸들러를 메모이제이션하여 불필요한 함수 재생성 방지
      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e);
        },
        [onChange]
      );

      return (
        <div className={styles.inputWrapper}>
          {/* {label && (
            <label htmlFor={props.id} className={styles.label}>
              {label}
            </label>
          )} */}
          {label && (
            <div className={styles.labelBox}>
              <label htmlFor={props.id} className={styles.label}>
                {label}
              </label>
              {link && (
                <Link href={link} target="blank">
                  {link}
                </Link>
              )}
            </div>
          )}
          <div className={styles.inputContainer}>
            {icon && <div className={styles.iconWrapper}>{icon}</div>}
            <input
              value={value}
              ref={ref}
              className={`${styles.input} ${error ? styles.error : ''} ${icon ? styles.inputWithIcon : ''} ${className || ''}`}
              onChange={handleChange}
              {...props}
            />
          </div>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export default Input;
