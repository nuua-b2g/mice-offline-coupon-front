import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'gray' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  width?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  width = 'auto',
  icon,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`button ${variant} ${size} ${isLoading ? 'loading' : ''} ${className}`}
      style={{ width }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
