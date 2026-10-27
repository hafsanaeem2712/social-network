import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Settings.module.css';
import { Shield, Lock, Eye, UserPlus, CheckCircle, RefreshCw } from 'lucide-react';

export const SettingsView = () => {
  const { currentUser, updatePrivacySettings } = useSocial();
  const [saveAlert, setSaveAlert] = useState(false);

  const [privacyState, setPrivacyState] = useState({
    profileVisibility: currentUser.privacy?.profileVisibility || 'public',
    allowFriendRequests: currentUser.privacy?.allowFriendRequests ?? true,
    showOnlineStatus: currentUser.privacy?.showOnlineStatus ?? true,
  });

  const handleToggle = (field) => {
    const updated = {
      ...privacyState,
      [field]: !privacyState[field],
    };
    setPrivacyState(updated);
    updatePrivacySettings(updated);
    triggerAlert();
  };

  const handleVisibilityChange = (value) => {
    const updated = {
      ...privacyState,
      profileVisibility: value,
    };
    setPrivacyState(updated);
    updatePrivacySettings(updated);
    triggerAlert();
  };

  const triggerAlert = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to initial seeds?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.headerBar}>
        <div className={styles.titleInfo}>
          <Shield size={24} className={styles.headerIcon} />
          <div>
            <h2>Privacy & Preferences</h2>
            <p className={styles.subTitle}>
              Manage who can discover your posts, connect with you, and view your activity.
            </p>
          </div>
        </div>

        {saveAlert && (
          <div className={styles.saveBadge}>
            <CheckCircle size={15} />
            <span>Saved live</span>
          </div>
        )}
      </div>

      {/* Visibility Section */}
      <div className={styles.settingsCard}>
        <div className={styles.sectionHeader}>
          <Eye size={18} />
          <h3>Profile Visibility</h3>
        </div>
        <p className={styles.sectionDesc}>
          Choose who can view your profile bio, friends list, and media posts.
        </p>

        <div className={styles.radioOptionsList}>
          <label
            className={`${styles.radioOption} ${
              privacyState.profileVisibility === 'public' ? styles.radioSelected : ''
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={privacyState.profileVisibility === 'public'}
              onChange={() => handleVisibilityChange('public')}
            />
            <div className={styles.optionDetails}>
              <strong>Public</strong>
              <span>Anyone on PulseNet can view your profile and public posts.</span>
            </div>
          </label>

          <label
            className={`${styles.radioOption} ${
              privacyState.profileVisibility === 'friends' ? styles.radioSelected : ''
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="friends"
              checked={privacyState.profileVisibility === 'friends'}
              onChange={() => handleVisibilityChange('friends')}
            />
            <div className={styles.optionDetails}>
              <strong>Friends Only</strong>
              <span>Only users you have accepted as friends can view your timeline.</span>
            </div>
          </label>

          <label
            className={`${styles.radioOption} ${
              privacyState.profileVisibility === 'private' ? styles.radioSelected : ''
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={privacyState.profileVisibility === 'private'}
              onChange={() => handleVisibilityChange('private')}
            />
            <div className={styles.optionDetails}>
              <strong>Private (Incognito)</strong>
              <span>Only you can see your activity details.</span>
            </div>
          </label>
        </div>
      </div>

      {/* Interaction Toggles Section */}
      <div className={styles.settingsCard}>
        <div className={styles.sectionHeader}>
          <Lock size={18} />
          <h3>Interaction & Social Controls</h3>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <div className={styles.rowLabel}>
              <UserPlus size={16} />
              <span>Allow Connection Requests</span>
            </div>
            <p>Allow other members to discover you and send friend requests.</p>
          </div>
          <button
            type="button"
            className={`${styles.switch} ${
              privacyState.allowFriendRequests ? styles.switchActive : ''
            }`}
            onClick={() => handleToggle('allowFriendRequests')}
            aria-label="Toggle Friend Requests"
          >
            <span className={styles.switchHandle} />
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <div className={styles.rowLabel}>
              <span className={styles.statusIndicatorDot} />
              <span>Show Real-Time Online Status</span>
            </div>
            <p>Show friends an active status indicator when you are online.</p>
          </div>
          <button
            type="button"
            className={`${styles.switch} ${
              privacyState.showOnlineStatus ? styles.switchActive : ''
            }`}
            onClick={() => handleToggle('showOnlineStatus')}
            aria-label="Toggle Online Status"
          >
            <span className={styles.switchHandle} />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={`${styles.settingsCard} ${styles.dangerCard}`}>
        <div className={styles.dangerRow}>
          <div>
            <h4>Reset Stored Cache</h4>
            <p>Clear all local browser storage and re-initialize default mock entities.</p>
          </div>
          <button className={styles.resetBtn} onClick={handleResetData}>
            <RefreshCw size={15} />
            <span>Reset Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
};