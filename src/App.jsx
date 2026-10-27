import React from 'react';
import { SocialProvider, useSocial } from './context/SocialContext';
import { Layout } from './components/layout/Layout';
import { Feed } from './components/feed/Feed';
import { ProfileView } from './components/profile/ProfileView';
import { FriendsView } from './components/friends/FriendsView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { useWebSocket } from './hooks/useWebSocket';

const AppContent = () => {
  const { activeTab } = useSocial();
  // Initialize real-time WebSocket listener
  useWebSocket();

  return (
    <Layout>
      {activeTab === 'feed' && <Feed />}
      {activeTab === 'profile' && <ProfileView />}
      {activeTab === 'friends' && <FriendsView />}
      {activeTab === 'notifications' && <NotificationsView />}
      {activeTab === 'settings' && (
        <div style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          backdropFilter: 'blur(12px)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Settings Section</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Privacy & Account settings module will be added in our next step.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default function App() {
  return (
    <SocialProvider>
      <AppContent />
    </SocialProvider>
  );
}