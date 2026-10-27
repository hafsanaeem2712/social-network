import React from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Layout.module.css';
import { Home, User, Users, Bell, Settings } from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, unreadNotificationsCount, friendRequests } = useSocial();

  const navItems = [
    { id: 'feed', label: 'News Feed', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    {
      id: 'friends',
      label: 'Friends & Requests',
      icon: Users,
      badge: friendRequests.length > 0 ? friendRequests.length : null,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
    { id: 'settings', label: 'Privacy & Settings', icon: Settings },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <Icon size={20} className={styles.itemIcon} />
                <span className={styles.navLabel}>{item.label}</span>
              </div>
              {item.badge && <span className={styles.tabBadge}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};