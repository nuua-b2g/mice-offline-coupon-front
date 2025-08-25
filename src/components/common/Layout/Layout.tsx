import React, { useState } from 'react';
import { ArrowLeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  pageTitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showActionBar?: boolean;
  actionBarContent?: React.ReactNode;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
  sidebarCollapsed: initialSidebarCollapsed = false,
  pageTitle = '대시보드',
  showBackButton = false,
  onBackClick,
  showActionBar = false,
  actionBarContent,
  onSidebarToggle,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialSidebarCollapsed);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  const handleSidebarToggle = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
    onSidebarToggle?.(newCollapsed);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.body}>
        {/* Sidebar */}
        {showSidebar && (
          <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
            <div className={styles.sidebarHeader}>
              <h1 className={styles.systemTitle}>
                {!sidebarCollapsed ? '쿠폰 관리 시스템' : 'CMS'}
              </h1>
              {showSidebar && (
                <button
                  className={styles.sidebarToggleButton}
                  onClick={handleSidebarToggle}
                  type="button"
                  aria-label={sidebarCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
                >
                  {sidebarCollapsed ? (
                    <MenuUnfoldOutlined className={styles.sidebarToggleIcon} />
                  ) : (
                    <MenuFoldOutlined className={styles.sidebarToggleIcon} />
                  )}
                </button>
              )}
            </div>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <a href="/coupons" className={styles.navLink}>
                    {!sidebarCollapsed && <span>쿠폰 관리</span>}
                  </a>
                </li>
                <li className={styles.navItem}>
                  <a href="/users" className={styles.navLink}>
                    {!sidebarCollapsed && <span>관리자 관리</span>}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.content}>
            {/* Page Header */}
            <div className={styles.pageHeader}>
              <div className={styles.pageTitleSection}>
                {showBackButton && (
                  <button className={styles.backButton} onClick={handleBackClick} type="button">
                    <ArrowLeftOutlined className={styles.backIcon} />
                    <span className={styles.backText}>뒤로</span>
                  </button>
                )}
                <h2 className={styles.pageTitle}>{pageTitle}</h2>
              </div>
            </div>

            {/* Page Content */}
            <div className={styles.pageContent}>{children}</div>

            {/* Action Bar */}
            {showActionBar && <div className={styles.actionBar}>{actionBarContent}</div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
