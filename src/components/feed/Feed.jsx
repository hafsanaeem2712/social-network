import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { CreatePostBox } from './CreatePostBox';
import { PostCard } from './PostCard';
import styles from './Feed.module.css';

export const Feed = () => {
  const { posts } = useSocial();

  return (
    <div className={styles.feedContainer}>
      <CreatePostBox />

      <div className={styles.postsList}>
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className={styles.emptyFeed}>
            <h3>No posts in your feed yet</h3>
            <p>Share what's happening or add friends to see their updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};