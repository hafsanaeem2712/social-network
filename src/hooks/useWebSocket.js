import { useEffect, useState } from 'react';
import { useSocial } from '../context/SocialContext';

export const useWebSocket = () => {
  const { receiveRealtimeEvent } = useSocial();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(true);

    const simulatedActors = [
      { name: 'Sara Ali', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { name: 'Hamza Tariq', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { name: 'Bilal Khan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
      { name: 'Noor Fatima', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80' }
    ];

    const eventPool = [
      { type: 'like', message: 'liked your latest status on the feed.' },
      { type: 'comment', message: 'replied: "Super excited about this release!"', rawCommentText: 'Super excited about this release! 🔥' },
      { type: 'friend_request', message: 'sent you a connection request.' }
    ];

    // Emit live events periodically (every 40 seconds)
    const interval = setInterval(() => {
      const randomActor = simulatedActors[Math.floor(Math.random() * simulatedActors.length)];
      const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)];

      const payload = {
        id: `live_notif_${Date.now()}`,
        type: randomEvent.type,
        actor: randomActor,
        message: randomEvent.message,
        rawCommentText: randomEvent.rawCommentText,
        timestamp: 'Just now',
        isRead: false,
      };

      // Dispatches to both notification center and feed state
      receiveRealtimeEvent(payload);
    }, 40000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, []);

  return { isConnected };
};