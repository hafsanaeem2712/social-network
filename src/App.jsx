import React from 'react';
import { SocialProvider, useSocial } from './context/SocialContext';
import { Layout } from './components/layout/Layout';

const AppContent = () => {
  const { activeTab } = useSocial();

  return (
    <Layout>
      <div style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        backdropFilter: 'blur(12px)'
      }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Active View: {activeTab.toUpperCase()}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Navigation shell connected successfully! In the next step, we will inject the rich interactive News Feed and Post Composer here.
        </p>
      </div>
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