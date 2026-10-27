import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Friends.module.css';
import { UserCheck, UserX, Users, UserPlus, MessageSquare } from 'lucide-react';

export const FriendsView = () => {
  const { friendRequests, acceptFriendRequest, rejectFriendRequest, currentUser } = useSocial();
  const [activeSubTab, setActiveSubTab] = useState('requests'); // 'requests' | 'friends'

  // Sample active friends list
  const sampleFriends = [
    {
      id: 'usr_ayesha',
      name: 'Ayesha Rehman',
      handle: '@ayesha_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'Active now',
      online: true,
    },
    {
      id: 'usr_zain',
      name: 'Zain Malik',
      handle: '@zain_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      status: 'Offline',
      online: false,
    },
  ];

  return (
    <div className={styles.friendsContainer}>
      {/* Header Tabs */}
      <div className={styles.subTabHeader}>
        <button
          className={`${styles.tabBtn} ${activeSubTab === 'requests' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveSubTab('requests')}
        >
          <UserPlus size={18} />
          <span>Connection Requests</span>
          {friendRequests.length > 0 && (
            <span className={styles.countBadge}>{friendRequests.length}</span>
          )}
        </button>

        <button
          className={`${styles.tabBtn} ${activeSubTab === 'friends' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveSubTab('friends')}
        >
          <Users size={18} />
          <span>My Friends ({currentUser.stats.friendsCount})</span>
        </button>
      </div>

      {/* Connection Requests View */}
      {activeSubTab === 'requests' && (
        <div className={styles.cardsGrid}>
          {friendRequests.length > 0 ? (
            friendRequests.map((req) => (
              <div key={req.id} className={styles.requestCard}>
                <div className={styles.cardHeader}>
                  <img
                    src={req.user.avatar}
                    alt={req.user.name}
                    className={styles.userAvatar}
                  />
                  <div className={styles.metaInfo}>
                    <h4 className={styles.userName}>{req.user.name}</h4>
                    <span className={styles.userHandle}>{req.user.handle}</span>
                    <span className={styles.mutualCount}>
                      {req.user.mutualFriends} mutual connections
                    </span>
                  </div>
                </div>

                <div className={styles.actionButtonGroup}>
                  <button
                    className={styles.acceptBtn}
                    onClick={() => acceptFriendRequest(req.id)}
                  >
                    <UserCheck size={16} />
                    <span>Confirm</span>
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => rejectFriendRequest(req.id)}
                  >
                    <UserX size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyCard}>
              <UserCheck size={40} className={styles.emptyIcon} />
              <h4>No pending friend requests</h4>
              <p>When colleagues or friends invite you to connect, they'll show up here.</p>
            </div>
          )}
        </div>
      )}

      {/* Friends List View */}
      {activeSubTab === 'friends' && (
        <div className={styles.cardsGrid}>
          {sampleFriends.map((friend) => (
            <div key={friend.id} className={styles.requestCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatarHolder}>
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className={styles.userAvatar}
                  />
                  {friend.online && <span className={styles.onlineDot} />}
                </div>
                <div className={styles.metaInfo}>
                  <h4 className={styles.userName}>{friend.name}</h4>
                  <span className={styles.userHandle}>{friend.handle}</span>
                  <span className={styles.userStatus}>{friend.status}</span>
                </div>
              </div>

              <div className={styles.actionButtonGroup}>
                <button className={styles.messageBtn}>
                  <MessageSquare size={16} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};