import React from 'react';
import styles from './radioGroup.module.css';

export interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  description,
  disabled = false,
  required = false,
  error,
  direction = 'vertical',
  size = 'medium',
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState<string | number | undefined>(
    value ?? defaultValue
  );

  const currentValue = value ?? internalValue;

  const handleChange = (optionValue: string | number) => {
    if (disabled) return;

    if (value === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  const groupId = React.useId();

  return (
    <div className={`${styles.radioGroup} ${styles[`radioGroup--${size}`]} ${className || ''}`}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor={groupId}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <div
        className={`${styles.options} ${styles[`options--${direction}`]}`}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-required={required}
        aria-invalid={!!error}
      >
        {options.map(option => {
          const optionId = `${groupId}-${option.value}`;
          const isSelected = currentValue === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <div
              key={option.value}
              className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${
                isDisabled ? styles.optionDisabled : ''
              }`}
            >
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => handleChange(option.value)}
                className={styles.input}
              />
              <label htmlFor={optionId} className={styles.optionLabel}>
                <span className={styles.radioIndicator}>
                  <span className={styles.radioInner} />
                </span>
                <div className={styles.optionContent}>
                  <span className={styles.optionText}>{option.label}</span>
                  {option.description && (
                    <span className={styles.optionDescription}>{option.description}</span>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;
