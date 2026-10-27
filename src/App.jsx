import React from 'react';
import { SocialProvider, useSocial } from './context/SocialContext';
import { Layout } from './components/layout/Layout';
import { Feed } from './components/feed/Feed';

const AppContent = () => {
  const { activeTab } = useSocial();

  return (
    <Layout>
      {activeTab === 'feed' && <Feed />}
      {activeTab !== 'feed' && (
        <div style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          backdropFilter: 'blur(12px)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            {activeTab.toUpperCase()} Section
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            This module will be connected in our next step. Click "News Feed" in the sidebar to view your live interactive feed!
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