'use client';

import { useRef, useState, useEffect } from 'react';
import { GOOGLE_REVIEWS_DATA, BUSINESS } from '@/lib/constants';
import { GoogleGIcon } from './GoogleReviews';
import styles from './ReviewsMarquee.module.css';

/* ─── Split reviews into two rows for alternating scroll ─── */
function splitRows(reviews) {
  const mid = Math.ceil(reviews.length / 2);
  return [reviews.slice(0, mid), reviews.slice(mid)];
}

/* ─── Single review card ─── */
function ReviewCard({ review, isDuplicate = false }) {
  return (
    <article
      className={styles.card}
      aria-label={isDuplicate ? undefined : `Review by ${review.name}`}
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      {/* Header */}
      <div className={styles.cardHead}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar} style={{ background: review.avatarColor }}>
            {review.name[0]}
          </div>
          <span className={styles.gBadge} title="Verified on Google">
            <GoogleGIcon size={9} />
          </span>
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{review.name}</div>
          <div className={styles.service}>{review.service}</div>
        </div>
        <div className={styles.stars}>{'★'.repeat(review.rating)}</div>
      </div>

      {/* Body */}
      <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>

      {/* Footer */}
      <div className={styles.cardFoot}>
        <span className={styles.date}>{review.date}</span>
        <span className={styles.verifiedPill}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Verified
        </span>
      </div>
    </article>
  );
}

/* ─── One scrolling row (direction: 'left' | 'right') ─── */
function MarqueeRow({ reviews, direction = 'left', speed = 35 }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  // Triple the set so seamless looping works regardless of screen width
  const items = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait one frame so DOM measures are accurate
    const raf = requestAnimationFrame(() => {
      const singleSetW = track.scrollWidth / 3;

      const step = () => {
        if (!pausedRef.current) {
          const delta = direction === 'left' ? speed / 60 : -(speed / 60);
          posRef.current += delta;

          // Reset seamlessly
          if (direction === 'left' && posRef.current >= singleSetW) {
            posRef.current -= singleSetW;
          } else if (direction === 'right' && posRef.current <= -singleSetW) {
            posRef.current += singleSetW;
          }

          track.style.transform = `translateX(${-posRef.current}px)`;
        }
        animRef.current = requestAnimationFrame(step);
      };

      animRef.current = requestAnimationFrame(step);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [direction, speed]);

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    pausedRef.current = true;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    const dx = touchStartX.current - e.touches[0].clientX;
    posRef.current += dx * 0.6;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    setTimeout(() => { pausedRef.current = false; }, 1200);
  };

  return (
    <div
      className={styles.rowViewport}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label={`Scrolling reviews row`}
    >
      {/* Edge fade masks */}
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />

      <div ref={trackRef} className={styles.track}>
        {items.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} isDuplicate={i >= reviews.length} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main exported component ─── */
export default function ReviewsMarquee() {
  const [row1, row2] = splitRows(GOOGLE_REVIEWS_DATA.reviews);

  return (
    <section className={styles.section} id="google-reviews" aria-label="Customer Reviews">
      {/* Ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* ── Header ── */}
      <div className={styles.header}>
        {/* Google verified pill */}
        <div className={styles.verifiedPill}>
          <GoogleGIcon size={16} />
          <span className={styles.pillRating}>5.0</span>
          <span className={styles.pillStars}>★★★★★</span>
          <span className={styles.pillDivider} />
          <span className={styles.pillLabel}>Google Verified Business</span>
        </div>

        <h2 className={styles.title}>
          Real Experiences from{' '}
          <span className={styles.gold}>Real Travelers</span>.
        </h2>
        <p className={styles.subtitle}>
          Authentic reviews from devotees, families &amp; corporate leaders across Rayalaseema.
        </p>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>5.0</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>50+</span>
            <span className={styles.statLabel}>Reviews</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>5-Star</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>3+</span>
            <span className={styles.statLabel}>Years Serving</span>
          </div>
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div className={styles.marqueeWrap}>
        <MarqueeRow reviews={row1} direction="left" speed={32} />
        <MarqueeRow reviews={row2} direction="right" speed={28} />
      </div>

      {/* ── CTA footer ── */}
      <div className={styles.footer}>
        <a
          href={GOOGLE_REVIEWS_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewBtn}
          id="cta-view-google-reviews-marquee"
        >
          <GoogleGIcon size={15} />
          <span>View All Reviews on Google ↗</span>
        </a>
        <a
          href={GOOGLE_REVIEWS_DATA.googleReviewWriteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.writeBtn}
          id="cta-write-review-marquee"
        >
          <span>⭐ Write a Review</span>
        </a>
      </div>
    </section>
  );
}
