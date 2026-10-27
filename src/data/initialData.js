export const CURRENT_USER = {
  id: 'usr_me',
  name: 'Hafsa Naeem',
  handle: '@hafsanaeem',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  bio: 'Software Engineer & UI/UX enthusiast. Building clean, resilient web experiences.',
  location: 'Islamabad, PK',
  website: 'https://github.com/Hafsa-naeem30',
  joined: 'October 2026',
  stats: {
    friendsCount: 142,
    postsCount: 18,
    followingCount: 89,
  },
  privacy: {
    profileVisibility: 'public', // 'public' | 'friends' | 'private'
    allowFriendRequests: true,
    showOnlineStatus: true,
  },
};

export const INITIAL_POSTS = [
  {
    id: 'pst_101',
    author: {
      id: 'usr_ayesha',
      name: 'Ayesha Rehman',
      handle: '@ayesha_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    content: 'Just deployed our real-time collaborative workspace with automated Git workflows! Sleek UI with modern dark mode makes coding late night a breeze. 🚀💻',
    media: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    timestamp: '2 hours ago',
    likesCount: 24,
    hasLiked: false,
    privacy: 'public',
    comments: [
      {
        id: 'cmt_201',
        author: {
          id: 'usr_me',
          name: 'Hafsa Naeem',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        },
        text: 'That dark obsidian aesthetic looks incredible! Well done.',
        timestamp: '1 hour ago',
      },
    ],
  },
  {
    id: 'pst_102',
    author: {
      id: 'usr_zain',
      name: 'Zain Malik',
      handle: '@zain_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    content: 'Exploring WebSocket protocols for bi-directional event emission. Latency dropped down to sub-15ms across live feeds. The web has come so far!',
    media: null,
    timestamp: '5 hours ago',
    likesCount: 42,
    hasLiked: true,
    privacy: 'public',
    comments: [],
  },
];

export const INITIAL_FRIEND_REQUESTS = [
  {
    id: 'freq_1',
    user: {
      id: 'usr_sarah',
      name: 'Sarah Connor',
      handle: '@sarah_c',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 5,
    },
    timestamp: '1 day ago',
  },
  {
    id: 'freq_2',
    user: {
      id: 'usr_hamza',
      name: 'Hamza Tariq',
      handle: '@hamza_t',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 12,
    },
    timestamp: '3 days ago',
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'like', // 'like' | 'comment' | 'friend_request' | 'system'
    actor: {
      name: 'Ayesha Rehman',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    message: 'liked your latest status update.',
    timestamp: '15 minutes ago',
    isRead: false,
  },
  {
    id: 'notif_2',
    type: 'friend_request',
    actor: {
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    },
    message: 'sent you a friend connection request.',
    timestamp: '1 day ago',
    isRead: true,
  },
];