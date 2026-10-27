import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CURRENT_USER,
  INITIAL_POSTS,
  INITIAL_FRIEND_REQUESTS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

const SocialContext = createContext(null);

const DEFAULT_FRIENDS = [
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
  {
    id: 'usr_bilal',
    name: 'Bilal Khan',
    handle: '@bilal_k',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    status: 'Active 2h ago',
    online: false,
  },
  {
    id: 'usr_fatima',
    name: 'Fatima Noor',
    handle: '@fatima_n',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    status: 'Active now',
    online: true,
  }
];

export const SocialProvider = ({ children }) => {
  // 1. Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sn_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // 2. Dynamic Friends State
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('sn_friends_list');
    return saved ? JSON.parse(saved) : DEFAULT_FRIENDS;
  });

  // 3. Posts Feed State
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('sn_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // 4. Friend Requests State
  const [friendRequests, setFriendRequests] = useState(() => {
    const saved = localStorage.getItem('sn_friend_requests');
    return saved ? JSON.parse(saved) : INITIAL_FRIEND_REQUESTS;
  });

  // 5. Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sn_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // 6. Navigation
  const [activeTab, setActiveTab] = useState('feed');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sn_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sn_friends_list', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('sn_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('sn_friend_requests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  useEffect(() => {
    localStorage.setItem('sn_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actions: Posts
  const createPost = ({ content, media, privacy = 'public' }) => {
    if (!content.trim() && !media) return;

    const newPost = {
      id: `pst_${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
      },
      content: content.trim(),
      media: media || null,
      timestamp: 'Just now',
      likesCount: 0,
      hasLiked: false,
      privacy,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      stats: { ...prev.stats, postsCount: prev.stats.postsCount + 1 },
    }));
  };

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiking = !post.hasLiked;
          return {
            ...post,
            hasLiked: isLiking,
            likesCount: isLiking ? post.likesCount + 1 : Math.max(0, post.likesCount - 1),
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId, text) => {
    if (!text.trim()) return;

    const newComment = {
      id: `cmt_${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      text: text.trim(),
      timestamp: 'Just now',
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  // Actions: Friend Requests (With Real Friends Addition & Welcome Post)
  const acceptFriendRequest = (requestId) => {
    const targetRequest = friendRequests.find((r) => r.id === requestId);
    if (!targetRequest) return;

    // 1. Remove from pending requests
    setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));

    // 2. Add to active friends list
    const newFriendEntity = {
      id: targetRequest.user.id,
      name: targetRequest.user.name,
      handle: targetRequest.user.handle,
      avatar: targetRequest.user.avatar,
      status: 'Active just now',
      online: true,
    };
    setFriends((prev) => [newFriendEntity, ...prev]);

    // 3. Keep currentUser stats in sync
    setCurrentUser((prev) => ({
      ...prev,
      stats: { ...prev.stats, friendsCount: (friends.length + 1) },
    }));

    // 4. Inject sample post from this new friend into feed
    const newFriendPost = {
      id: `pst_auto_${Date.now()}`,
      author: {
        id: targetRequest.user.id,
        name: targetRequest.user.name,
        handle: targetRequest.user.handle,
        avatar: targetRequest.user.avatar,
      },
      content: `Hey everyone! Glad to officially connect with ${currentUser.name} on PulseNet! Excited to collaborate and share updates here. 🤝✨`,
      media: null,
      timestamp: 'Just now',
      likesCount: 1,
      hasLiked: false,
      privacy: 'friends',
      comments: [],
    };
    setPosts((prev) => [newFriendPost, ...prev]);

    // 5. Send notification
    const notif = {
      id: `notif_${Date.now()}`,
      type: 'friend_accept',
      actor: {
        name: targetRequest.user.name,
        avatar: targetRequest.user.avatar,
      },
      message: 'is now connected with you as a friend.',
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const rejectFriendRequest = (requestId) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const updatePrivacySettings = (newPrivacy) => {
    setCurrentUser((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...newPrivacy },
    }));
  };

  return (
    <SocialContext.Provider
      value={{
        currentUser,
        friends,
        posts,
        friendRequests,
        notifications,
        unreadNotificationsCount,
        activeTab,
        setActiveTab,
        createPost,
        toggleLike,
        addComment,
        acceptFriendRequest,
        rejectFriendRequest,
        markAllNotificationsRead,
        updateProfile,
        updatePrivacySettings,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) throw new Error('useSocial must be used within SocialProvider');
  return context;
};