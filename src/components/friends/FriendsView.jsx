import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Friends.module.css';
import { UserCheck, UserX, Users, UserPlus, MessageSquare, Send, X } from 'lucide-react';

export const FriendsView = () => {
  const { friendRequests, acceptFriendRequest, rejectFriendRequest, friends, currentUser } = useSocial();
  const [activeSubTab, setActiveSubTab] = useState('friends');
  const [activeChatFriend, setActiveChatFriend] = useState(null);
  const [messages, setMessages] = useState([
    { sender: 'them', text: 'Hey Hafsa! How is your internship project going?' },
    { sender: 'me', text: 'Hey! Going great, building the real-time social platform right now!' }
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = { sender: 'me', text: messageInput.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setMessageInput('');

    // Simulate instant auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'them', text: 'Awesome! That dark obsidian UI looks super sleek!' }
      ]);
    }, 1200);
  };

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
          <span>My Friends ({friends.length})</span>
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
                      {req.user.mutualFriends || 3} mutual connections
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
              <p>When colleagues invite you to connect, they will show up here.</p>
            </div>
          )}
        </div>
      )}

      {/* Friends List View */}
      {activeSubTab === 'friends' && (
        <div className={styles.cardsGrid}>
          {friends.map((friend) => (
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
                <button
                  className={styles.messageBtn}
                  onClick={() => setActiveChatFriend(friend)}
                >
                  <MessageSquare size={16} />
                  <span>Message {friend.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Direct Message Modal */}
      {activeChatFriend && (
        <div className={styles.chatModalOverlay} onClick={() => setActiveChatFriend(null)}>
          <div className={styles.chatModalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderUser}>
                <img src={activeChatFriend.avatar} alt={activeChatFriend.name} className={styles.chatAvatar} />
                <div>
                  <h4>{activeChatFriend.name}</h4>
                  <span className={styles.chatStatus}>{activeChatFriend.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              <button className={styles.chatCloseBtn} onClick={() => setActiveChatFriend(null)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.chatBody}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`${styles.chatBubble} ${m.sender === 'me' ? styles.bubbleMe : styles.bubbleThem}`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className={styles.chatInputRow}>
              <input
                type="text"
                placeholder={`Message ${activeChatFriend.name.split(' ')[0]}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className={styles.chatInput}
                autoFocus
              />
              <button type="submit" className={styles.chatSendBtn} disabled={!messageInput.trim()}>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};