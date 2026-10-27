import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import styles from './Feed.module.css';
import { Heart, MessageCircle, Share2, Globe, Lock, Send } from 'lucide-react';

export const PostCard = ({ post }) => {
  const { toggleLike, addComment, currentUser } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className={styles.postCard}>
      {/* Header */}
      <div className={styles.postHeader}>
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className={styles.postAvatar}
        />
        <div className={styles.postAuthorInfo}>
          <div className={styles.nameRow}>
            <span className={styles.postAuthorName}>{post.author.name}</span>
            <span className={styles.postAuthorHandle}>{post.author.handle}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.postTimestamp}>{post.timestamp}</span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.privacyTag}>
              {post.privacy === 'friends' ? (
                <>
                  <Lock size={12} /> Friends
                </>
              ) : (
                <>
                  <Globe size={12} /> Public
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className={styles.postContent}>{post.content}</p>

      {/* Multimedia Image */}
      {post.media && (
        <div className={styles.postMediaWrapper}>
          <img
            src={post.media}
            alt="Post content"
            className={styles.postImage}
            loading="lazy"
          />
        </div>
      )}

      {/* Stats & Actions */}
      <div className={styles.postEngagement}>
        <button
          onClick={() => toggleLike(post.id)}
          className={`${styles.engagementBtn} ${post.hasLiked ? styles.likedBtn : ''}`}
        >
          <Heart
            size={18}
            className={post.hasLiked ? styles.heartFilled : styles.heartIcon}
          />
          <span>{post.likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className={styles.engagementBtn}
        >
          <MessageCircle size={18} />
          <span>{post.comments ? post.comments.length : 0}</span>
        </button>

        <button className={styles.engagementBtn}>
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Collapsible Comments Section */}
      {showComments && (
        <div className={styles.commentsSection}>
          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={styles.commentAvatarSmall}
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a thoughtful comment..."
              className={styles.commentInput}
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className={styles.commentSubmitBtn}
            >
              <Send size={15} />
            </button>
          </form>

          {/* Comments List */}
          <div className={styles.commentsList}>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className={styles.commentItem}>
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className={styles.commentAvatarSmall}
                  />
                  <div className={styles.commentBody}>
                    <div className={styles.commentMeta}>
                      <span className={styles.commentAuthor}>
                        {comment.author.name}
                      </span>
                      <span className={styles.commentTime}>
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noCommentsNotice}>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};