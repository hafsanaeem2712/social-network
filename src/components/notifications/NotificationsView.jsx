import React from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Notifications.module.css';
import { Heart, MessageCircle, UserPlus, CheckCheck, Wifi } from 'lucide-react';

export const NotificationsView = () => {
  const { notifications, markAllNotificationsRead } = useSocial();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={16} className={styles.likeIcon} />;
      case 'comment':
        return <MessageCircle size={16} className={styles.commentIcon} />;
      case 'friend_request':
      case 'friend_accept':
        return <UserPlus size={16} className={styles.friendIcon} />;
      default:
        return <Heart size={16} className={styles.likeIcon} />;
    }
  };

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.headerBar}>
        <div className={styles.titleGroup}>
          <h2>Notifications</h2>
          <div className={styles.liveIndicator}>
            <Wifi size={14} className={styles.wifiPulse} />
            <span>WebSocket Live</span>
          </div>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            className={styles.markReadBtn}
            onClick={markAllNotificationsRead}
          >
            <CheckCheck size={16} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      <div className={styles.notificationsList}>
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`${styles.notificationCard} ${
                !item.isRead ? styles.unreadCard : ''
              }`}
            >
              <div className={styles.actorAvatarHolder}>
                <img
                  src={item.actor.avatar}
                  alt={item.actor.name}
                  className={styles.actorAvatar}
                />
                <span className={styles.badgeWrapper}>
                  {getNotificationIcon(item.type)}
                </span>
              </div>

              <div className={styles.notificationContent}>
                <p className={styles.notificationMessage}>
                  <strong className={styles.actorName}>{item.actor.name}</strong>{' '}
                  {item.message}
                </p>
                <span className={styles.timeLabel}>{item.timestamp}</span>
              </div>

              {!item.isRead && <span className={styles.unreadDot} />}
            </div>
          ))
        ) : (
          <div className={styles.emptyCard}>
            <p>You're all caught up! No notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};