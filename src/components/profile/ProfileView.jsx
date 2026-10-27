import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { PostCard } from '../feed/PostCard';
import { EditProfileModal } from './EditProfileModal';
import styles from './Profile.module.css';
import { MapPin, Globe, Calendar, Edit3, Grid, ShieldCheck } from 'lucide-react';

export const ProfileView = () => {
  const { currentUser, posts } = useSocial();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter posts created by the current user
  const userPosts = posts.filter((p) => p.author.id === currentUser.id);

  return (
    <div className={styles.profileContainer}>
      {/* Banner & Avatar Showcase */}
      <div className={styles.bannerWrapper}>
        <img
          src={currentUser.banner}
          alt="Profile Banner"
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay} />
      </div>

      <div className={styles.profileCard}>
        <div className={styles.headerBar}>
          <div className={styles.avatarWrapper}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={styles.profileAvatar}
            />
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className={styles.editProfileBtn}
          >
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className={styles.identitySection}>
          <div className={styles.nameRow}>
            <h2 className={styles.userName}>{currentUser.name}</h2>
            <ShieldCheck size={18} className={styles.verifiedBadge} title="Verified Resident" />
          </div>
          <span className={styles.userHandle}>{currentUser.handle}</span>
          <p className={styles.userBio}>{currentUser.bio}</p>
        </div>

        <div className={styles.metaInfoRow}>
          {currentUser.location && (
            <div className={styles.metaBadge}>
              <MapPin size={15} />
              <span>{currentUser.location}</span>
            </div>
          )}
          {currentUser.website && (
            <a
              href={currentUser.website}
              target="_blank"
              rel="noreferrer"
              className={styles.metaLink}
            >
              <Globe size={15} />
              <span>{currentUser.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          <div className={styles.metaBadge}>
            <Calendar size={15} />
            <span>Joined {currentUser.joined}</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{currentUser.stats.postsCount}</span>
            <span className={styles.statLabel}>Posts</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <span className={styles.statValue}>{currentUser.stats.friendsCount}</span>
            <span className={styles.statLabel}>Friends</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <span className={styles.statValue}>{currentUser.stats.followingCount}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
        </div>
      </div>

      {/* User's Posts Feed */}
      <div className={styles.userPostsSection}>
        <div className={styles.postsHeader}>
          <Grid size={18} />
          <h3>My Publications ({userPosts.length})</h3>
        </div>

        <div className={styles.postsList}>
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className={styles.emptyPostsCard}>
              <p>You haven't published any posts yet. Switch to the Feed and post your first update!</p>
            </div>
          )}
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};