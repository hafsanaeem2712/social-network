import { useEffect, useRef, useState } from 'react';
import { useSocial } from '../context/SocialContext';

export const useWebSocket = () => {
  const { notifications } = useSocial();
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Production WebSocket connection attempt
    // In production backend, point this to: ws://localhost:8080 or wss://yourdomain.com
    let mockInterval = null;

    try {
      // Establish simulated socket bridge
      setIsConnected(true);

      // Simulation of live server push notifications (every 45s for demo testing)
      const simulatedActors = [
        { name: 'Bilal Khan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
        { name: 'Sara Ali', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
        { name: 'Hamza Tariq', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
      ];

      const simulatedMessages = [
        { type: 'like', text: 'liked your latest status on the feed.' },
        { type: 'comment', text: 'replied: "Super excited about this release!"' },
        { type: 'friend_request', text: 'sent you a connection request.' }
      ];

      mockInterval = setInterval(() => {
        const randomActor = simulatedActors[Math.floor(Math.random() * simulatedActors.length)];
        const randomMsg = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];

        const incomingSocketPayload = {
          id: `live_notif_${Date.now()}`,
          type: randomMsg.type,
          actor: randomActor,
          message: randomMsg.text,
          timestamp: 'Just now',
          isRead: false,
        };

        setLastEvent(incomingSocketPayload);

        // Store into local storage dynamically
        const currentSaved = JSON.parse(localStorage.getItem('sn_notifications') || '[]');
        localStorage.setItem('sn_notifications', JSON.stringify([incomingSocketPayload, ...currentSaved]));
      }, 50000);

    } catch (err) {
      console.warn('WebSocket connection fallback:', err);
      setIsConnected(false);
    }

    return () => {
      if (mockInterval) clearInterval(mockInterval);
      if (socketRef.current) socketRef.current.close();
      setIsConnected(false);
    };
  }, []);

  return {
    isConnected,
    lastEvent,
  };
};