export const CURRENT_USER = {
  id: 'usr_me',
  name: 'Hafsa Naeem',
  handle: '@hafsanaeem',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  bio: 'Software Engineer & UI/UX enthusiast. Building clean, resilient web experiences.',
  location: 'Islamabad, PK',
  website: 'https://github.com/hafsanaeem2712',
  joined: 'October 2026',
  stats: {
    friendsCount: 12,
    postsCount: 18,
    followingCount: 89,
  },
  privacy: {
    profileVisibility: 'public',
    allowFriendRequests: true,
    showOnlineStatus: true,
  },
};

export const INITIAL_POSTS = [
  {
    id: 'pst_101',
    author: {
      id: 'usr_me',
      name: 'Hafsa Naeem',
      handle: '@hafsanaeem',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
    content: 'Just deployed our real-time collaborative workspace with automated Git workflows! Sleek UI with modern dark mode makes coding late night a breeze. 🚀💻',
    media: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    timestamp: '2 hours ago',
    likesCount: 18,
    hasLiked: false,
    privacy: 'public',
    comments: [
      {
        id: 'cmt_201',
        author: {
          id: 'usr_ayesha',
          name: 'Ayesha Rehman',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
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
    timestamp: '10 mins ago',
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
    timestamp: '25 mins ago',
  },
  {
    id: 'freq_3',
    user: {
      id: 'usr_alina',
      name: 'Alina Farooq',
      handle: '@alina_ui',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 8,
    },
    timestamp: '1 hour ago',
  },
  {
    id: 'freq_4',
    user: {
      id: 'usr_daniyal',
      name: 'Daniyal Ahmed',
      handle: '@dani_coder',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 3,
    },
    timestamp: '2 hours ago',
  },
  {
    id: 'freq_5',
    user: {
      id: 'usr_maryam',
      name: 'Maryam Siddiqui',
      handle: '@maryam_s',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 15,
    },
    timestamp: '3 hours ago',
  },
  {
    id: 'freq_6',
    user: {
      id: 'usr_usman',
      name: 'Usman Ghani',
      handle: '@usman_cloud',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 7,
    },
    timestamp: '5 hours ago',
  },
  {
    id: 'freq_7',
    user: {
      id: 'usr_noor',
      name: 'Noor Fatima',
      handle: '@noor_design',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 9,
    },
    timestamp: '7 hours ago',
  },
  {
    id: 'freq_8',
    user: {
      id: 'usr_shahzaib',
      name: 'Shahzaib Hassan',
      handle: '@shahzaib_h',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 4,
    },
    timestamp: '12 hours ago',
  },
  {
    id: 'freq_9',
    user: {
      id: 'usr_mehak',
      name: 'Mehak Javed',
      handle: '@mehak_j',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 11,
    },
    timestamp: '1 day ago',
  },
  {
    id: 'freq_10',
    user: {
      id: 'usr_raza',
      name: 'Ali Raza',
      handle: '@ali_raza_ml',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 6,
    },
    timestamp: '1 day ago',
  },
  {
    id: 'freq_11',
    user: {
      id: 'usr_kinza',
      name: 'Kinza Tariq',
      handle: '@kinza_t',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 14,
    },
    timestamp: '2 days ago',
  },
  {
    id: 'freq_12',
    user: {
      id: 'usr_waleed',
      name: 'Waleed Sheikh',
      handle: '@waleed_s',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 2,
    },
    timestamp: '3 days ago',
  },
  {
    id: 'freq_13',
    user: {
      id: 'usr_tayyaba',
      name: 'Tayyaba Bukhari',
      handle: '@tayyaba_b',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 10,
    },
    timestamp: '3 days ago',
  },
  {
    id: 'freq_14',
    user: {
      id: 'usr_hassan',
      name: 'Hassan Niaz',
      handle: '@hassan_dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 8,
    },
    timestamp: '4 days ago',
  },
  {
    id: 'freq_15',
    user: {
      id: 'usr_zainab',
      name: 'Zainab Qazi',
      handle: '@zainab_q',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 16,
    },
    timestamp: '4 days ago',
  },
  {
    id: 'freq_16',
    user: {
      id: 'usr_kamran',
      name: 'Kamran Akmal',
      handle: '@kamran_a',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      mutualFriends: 4,
    },
    timestamp: '5 days ago',
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'like',
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