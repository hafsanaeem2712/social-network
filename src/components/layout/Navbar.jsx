import React from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Layout.module.css';
import { Search, Bell, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, unreadNotificationsCount, setActiveTab } = useSocial();

  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.brand} onClick={() => setActiveTab('feed')}>
          <div className={styles.logoBadge}>
            <Sparkles size={20} className={styles.sparkleIcon} />
          </div>
          <span className={styles.brandTitle}>Pulse<span className={styles.brandAccent}>Net</span></span>
        </div>

        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search pulse, tags, friends..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.navRight}>
        <button
          className={styles.iconButton}
          onClick={() => setActiveTab('notifications')}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadNotificationsCount > 0 && (
            <span className={styles.badge}>{unreadNotificationsCount}</span>
          )}
        </button>

        <div
          className={styles.userProfileTrigger}
          onClick={() => setActiveTab('profile')}
          title="View Profile"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={styles.avatarSmall}
          />
          <div className={styles.userNameBlock}>
            <span className={styles.navName}>{currentUser.name}</span>
            <span className={styles.navHandle}>{currentUser.handle}</span>
          </div>
        </div>
      </div>
    </header>
  );
};