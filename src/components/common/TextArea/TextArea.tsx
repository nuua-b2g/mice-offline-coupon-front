import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import styles from './textArea.module.css';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  showCharCount?: boolean;
  minRows?: number;
  maxRows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  onChange?: (value: string) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required = false,
      showCharCount = false,
      minRows,
      maxRows,
      rows = 3,
      maxLength,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      placeholder,
      autoFocus = false,
      resize = 'vertical',
      id,
      name,
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');

    const currentValue = value ?? internalValue;
    const textareaId = React.useId();

    useImperativeHandle(ref, () => textareaRef.current!, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (maxLength && newValue.length > maxLength) {
        return;
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const autoResize = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || (!minRows && !maxRows)) return;

      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;

      if (minRows || maxRows) {
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = minRows ? minRows * lineHeight : 0;
        const maxHeight = maxRows ? maxRows * lineHeight : Infinity;

        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;
      }
    }, [minRows, maxRows]);

    useEffect(() => {
      if (minRows || maxRows) {
        autoResize();
      }
    }, [currentValue, minRows, maxRows, autoResize]);

    const charCount = String(currentValue).length;
    const isOverLimit = maxLength ? charCount > maxLength : false;

    return (
      <div className={`${styles.textAreaContainer} ${className || ''}`}>
        {label && (
          <label htmlFor={id || textareaId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.textAreaWrapper}>
          <textarea
            ref={textareaRef}
            id={id || textareaId}
            name={name}
            className={`${styles.textArea} ${error ? styles.textAreaError : ''} ${disabled ? styles.textAreaDisabled : ''}`}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onInput={autoResize}
            disabled={disabled}
            required={required}
            rows={minRows || maxRows ? undefined : rows}
            maxLength={maxLength}
            autoFocus={autoFocus}
            style={{
              resize: resize,
            }}
          />

          {(showCharCount || maxLength) && (
            <div className={`${styles.charCount} ${isOverLimit ? styles.charCountError : ''}`}>
              {charCount}
              {maxLength && ` / ${maxLength}`}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className={`${styles.helperText} ${error ? styles.helperTextError : ''}`}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
