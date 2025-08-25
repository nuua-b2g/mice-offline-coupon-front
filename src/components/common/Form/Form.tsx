import React from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  FieldValues,
  SubmitHandler,
  FieldError,
  DefaultValues,
} from 'react-hook-form';
import styles from './Form.module.css';

export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
  options?: { value: string; label: string }[];
  defaultValue?: unknown;
  disabled?: boolean;
  className?: string;
}

export interface FormProps<T extends FieldValues = FieldValues> {
  fields: FormField[];
  onSubmit: SubmitHandler<T>;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  loading?: boolean;
  layout?: 'vertical' | 'horizontal' | 'inline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  defaultValues?: Partial<T>;
}

export const Form = <T extends FieldValues = FieldValues>({
  fields,
  onSubmit,
  submitText = '제출',
  cancelText = '취소',
  onCancel,
  loading = false,
  layout = 'vertical',
  size = 'medium',
  className,
  defaultValues,
}: FormProps<T>) => {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit = methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${styles[`form--${layout}`]} ${styles[`form--${size}`]} ${
          className || ''
        }`}
        noValidate
      >
        <div className={styles.formFields}>
          {fields.map(field => (
            <FormFieldItem key={field.name} field={field} />
          ))}
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
          >
            {loading ? '처리 중...' : submitText}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              disabled={loading}
            >
              {cancelText}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

/* --------------------------- */
/* 개별 필드 렌더 컴포넌트     */
/* --------------------------- */

const FormFieldItem: React.FC<{ field: FormField }> = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // errors[field.name]은 unknown → FieldError | undefined로 안전하게 캐스팅
  const error = errors[field.name] as FieldError | undefined;
  const fieldId = `field-${field.name}`;

  const registerRules = {
    required: field.required ? `${field.label}은(는) 필수입니다.` : false,
    ...(field.validation?.minLength && {
      minLength: {
        value: field.validation.minLength,
        message: `${field.label}은(는) 최소 ${field.validation.minLength}자 이상이어야 합니다.`,
      },
    }),
    ...(field.validation?.maxLength && {
      maxLength: {
        value: field.validation.maxLength,
        message: `${field.label}은(는) 최대 ${field.validation.maxLength}자까지 입력 가능합니다.`,
      },
    }),
    ...(field.validation?.pattern && {
      pattern: {
        value: field.validation.pattern,
        message: `${field.label}의 형식이 올바르지 않습니다.`,
      },
    }),
    ...(typeof field.validation?.min === 'number' && {
      min: {
        value: field.validation.min,
        message: `${field.label}은(는) 최소 ${field.validation.min} 이상이어야 합니다.`,
      },
    }),
    ...(typeof field.validation?.max === 'number' && {
      max: {
        value: field.validation.max,
        message: `${field.label}은(는) 최대 ${field.validation.max}까지 입력 가능합니다.`,
      },
    }),
  };

  const commonClass = `${styles.formInput} ${field.className || ''}`;
  const ariaInvalid = !!error || undefined;

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            aria-invalid={ariaInvalid}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            placeholder={field.placeholder}
            disabled={field.disabled}
            rows={field.rows || 4}
            className={`${styles.formInput} ${styles.textarea} ${field.className || ''}`}
            {...register(field.name, registerRules)}
          />
        );

      case 'select':
        return (
          <select
            id={fieldId}
            aria-invalid={ariaInvalid}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            disabled={field.disabled}
            className={`${styles.formInput} ${styles.select} ${field.className || ''}`}
            {...register(field.name, registerRules)}
          >
            <option value="">선택하세요</option>
            {field.options?.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className={styles.checkboxGroup} role="group" aria-labelledby={`${fieldId}-label`}>
            {field.options?.map((o, idx) => {
              const id = `${fieldId}-${idx}`;
              return (
                <label key={o.value} htmlFor={id} className={styles.checkboxLabel}>
                  <input
                    id={id}
                    type="checkbox"
                    value={o.value}
                    aria-invalid={ariaInvalid}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    disabled={field.disabled}
                    className={styles.checkbox}
                    {...register(field.name, registerRules)}
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'radio':
        return (
          <div className={styles.radioGroup} role="radiogroup" aria-labelledby={`${fieldId}-label`}>
            {field.options?.map((o, idx) => {
              const id = `${fieldId}-${idx}`;
              return (
                <label key={o.value} htmlFor={id} className={styles.radioLabel}>
                  <input
                    id={id}
                    type="radio"
                    value={o.value}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    disabled={field.disabled}
                    className={styles.radio}
                    {...register(field.name, registerRules)}
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'date':
        return (
          <input
            id={fieldId}
            type="date"
            aria-invalid={ariaInvalid}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`${styles.formInput} ${styles.dateInput} ${field.className || ''}`}
            {...register(field.name, registerRules)}
          />
        );

      case 'number':
        return (
          <input
            id={fieldId}
            type="number"
            aria-invalid={ariaInvalid}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            placeholder={field.placeholder}
            disabled={field.disabled}
            min={field.validation?.min}
            max={field.validation?.max}
            className={commonClass}
            {...register(field.name, registerRules)}
          />
        );

      default:
        return (
          <input
            id={fieldId}
            type={field.type}
            aria-invalid={ariaInvalid}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={commonClass}
            {...register(field.name, registerRules)}
          />
        );
    }
  };

  return (
    <div className={`${styles.formField} ${error ? styles.hasError : ''}`}>
      <label
        id={`${fieldId}-label`}
        htmlFor={field.type === 'checkbox' || field.type === 'radio' ? undefined : fieldId}
        className={styles.formLabel}
      >
        {field.label}
        {field.required && <span className={styles.required}>*</span>}
      </label>

      {renderField()}

      {error && (
        <span id={`${fieldId}-error`} className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Form;
