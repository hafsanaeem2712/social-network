import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CURRENT_USER,
  INITIAL_POSTS,
  INITIAL_FRIEND_REQUESTS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

const SocialContext = createContext(null);

export const SocialProvider = ({ children }) => {
  // 1. Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sn_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // 2. Posts Feed State
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('sn_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // 3. Friend Requests State
  const [friendRequests, setFriendRequests] = useState(() => {
    const saved = localStorage.getItem('sn_friend_requests');
    return saved ? JSON.parse(saved) : INITIAL_FRIEND_REQUESTS;
  });

  // 4. Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sn_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // 5. Active View Navigation
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'profile' | 'friends' | 'notifications' | 'settings'

  // Sync to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem('sn_user', JSON.stringify(currentUser));
  }, [currentUser]);

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

    // Update user stats
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        postsCount: prev.stats.postsCount + 1,
      },
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
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  // Actions: Friend Requests
  const acceptFriendRequest = (requestId) => {
    const targetRequest = friendRequests.find((r) => r.id === requestId);
    if (!targetRequest) return;

    // Remove from requests list
    setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));

    // Increment friends count
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        friendsCount: prev.stats.friendsCount + 1,
      },
    }));

    // Trigger Notification
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

  // Actions: Notifications
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Actions: Privacy & Profile Settings
  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const updatePrivacySettings = (newPrivacy) => {
    setCurrentUser((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        ...newPrivacy,
      },
    }));
  };

  return (
    <SocialContext.Provider
      value={{
        currentUser,
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
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};