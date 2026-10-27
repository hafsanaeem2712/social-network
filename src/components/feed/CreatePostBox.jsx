import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Feed.module.css';
import { Image, Globe, Lock, Send, X } from 'lucide-react';

export const CreatePostBox = () => {
  const { currentUser, createPost } = useSocial();
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [privacy, setPrivacy] = useState('public');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl.trim()) return;

    createPost({
      content,
      media: mediaUrl.trim() || null,
      privacy,
    });

    setContent('');
    setMediaUrl('');
    setShowMediaInput(false);
  };

  return (
    <div className={styles.composerCard}>
      <div className={styles.composerHeader}>
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className={styles.composerAvatar}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
          className={styles.composerInput}
          rows={3}
        />
      </div>

      {showMediaInput && (
        <div className={styles.mediaInputGroup}>
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Paste image URL (e.g. Unsplash, imgur)..."
            className={styles.mediaUrlField}
          />
          <button
            type="button"
            className={styles.closeMediaBtn}
            onClick={() => {
              setMediaUrl('');
              setShowMediaInput(false);
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {mediaUrl && (
        <div className={styles.mediaPreviewContainer}>
          <img src={mediaUrl} alt="Preview" className={styles.mediaPreview} />
        </div>
      )}

      <div className={styles.composerFooter}>
        <div className={styles.composerActions}>
          <button
            type="button"
            className={`${styles.actionBtn} ${showMediaInput ? styles.actionActive : ''}`}
            onClick={() => setShowMediaInput((prev) => !prev)}
            title="Attach Image"
          >
            <Image size={18} />
            <span>Photo</span>
          </button>

          <div className={styles.privacySelectorWrapper}>
            {privacy === 'public' ? <Globe size={16} /> : <Lock size={16} />}
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className={styles.privacySelect}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!content.trim() && !mediaUrl.trim()}
          className={styles.publishBtn}
        >
          <span>Post</span>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};