import React, { useState } from 'react';
import styles from './tab.module.css';

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: 'line' | 'card' | 'pill';
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'left';
  className?: string;
}

export const Tab: React.FC<TabProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant = 'line',
  size = 'medium',
  position = 'top',
  className,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    activeKey ?? defaultActiveKey ?? items[0]?.key ?? ''
  );

  const currentActiveKey = activeKey ?? internalActiveKey;

  const handleTabClick = (key: string) => {
    const item = items.find(item => item.key === key);
    if (item?.disabled) return;

    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  const activeItem = items.find(item => item.key === currentActiveKey);

  return (
    <div
      className={`${styles.tab} ${styles[`tab--${variant}`]} ${styles[`tab--${size}`]} ${styles[`tab--${position}`]} ${className || ''}`}
    >
      <div className={styles.tabNav}>
        {items.map(item => (
          <button
            key={item.key}
            type="button"
            className={`${styles.tabButton} ${
              currentActiveKey === item.key ? styles.tabButtonActive : ''
            } ${item.disabled ? styles.tabButtonDisabled : ''}`}
            onClick={() => handleTabClick(item.key)}
            disabled={item.disabled}
            role="tab"
            aria-selected={currentActiveKey === item.key}
            aria-controls={`tabpanel-${item.key}`}
            id={`tab-${item.key}`}
          >
            {item.icon && <span className={styles.tabIcon}>{item.icon}</span>}
            <span className={styles.tabLabel}>{item.label}</span>
            {item.badge && <span className={styles.tabBadge}>{item.badge}</span>}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {activeItem && (
          <div
            className={styles.tabPanel}
            role="tabpanel"
            id={`tabpanel-${activeItem.key}`}
            aria-labelledby={`tab-${activeItem.key}`}
          >
            {activeItem.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
