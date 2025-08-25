import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './listLayout.module.css';

export interface SearchField {
  key: string;
  placeholder: string;
  value: string;
  onSearch: (value: string) => void;
}

export interface ListLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  headerActions?: React.ReactNode;
  showSearch?: boolean | SearchField[];
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export const ListLayout: React.FC<ListLayoutProps> = ({
  title,
  description,
  children,
  actions,
  headerActions,
  showSearch = false,
  searchPlaceholder = '검색어를 입력하세요',
  onSearch,
  className,
}) => {
  const [searchValues, setSearchValues] = React.useState<{ [key: string]: string }>({});

  // 단일 검색창인 경우 (기존 호환성 유지)
  const isSingleSearch = typeof showSearch === 'boolean';

  // 다중 검색창인 경우
  const isMultipleSearch = Array.isArray(showSearch);

  const handleSearchChange = (key: string, value: string) => {
    if (isSingleSearch) {
      // 단일 검색창인 경우 기존 로직
      onSearch?.(value);
    } else if (isMultipleSearch) {
      // 다중 검색창인 경우
      setSearchValues(prev => ({ ...prev, [key]: value }));
      const searchField = showSearch.find(field => field.key === key);
      searchField?.onSearch(value);
    }
  };

  const renderSearchFields = () => {
    // 단일 검색창 (기존 호환)
    if (isSingleSearch && showSearch) {
      return (
        <div className={styles.searchSection}>
          <div className={styles.searchField}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValues['default'] || ''}
              onChange={e => handleSearchChange('default', e.target.value)}
              className={styles.searchInput}
            />
            <SearchOutlined className={styles.searchIcon} />
          </div>
        </div>
      );
    }
    // 다중 검색창
    if (isMultipleSearch) {
      return (
        <div className={styles.searchSection}>
          {showSearch.map(field => (
            <div key={field.key} className={styles.searchField}>
              <input
                type="text"
                placeholder={field.placeholder}
                value={searchValues[field.key] || field.value || ''}
                onChange={e => handleSearchChange(field.key, e.target.value)}
                className={styles.searchInput}
              />
              <SearchOutlined className={styles.searchIcon} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`${styles.listLayout} ${className || ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {headerActions && <div className={styles.headerActions}>{headerActions}</div>}
        </div>
      </div>

      {/* Toolbar */}
      {((isSingleSearch && showSearch) || isMultipleSearch || actions) && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarContent}>
            {renderSearchFields()}
            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ListLayout;
