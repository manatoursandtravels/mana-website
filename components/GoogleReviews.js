'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GOOGLE_REVIEWS_DATA, BUSINESS } from '@/lib/constants';
import styles from './GoogleReviews.module.css';

// Official Google "G" Icon SVG
export function GoogleGIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

const CATEGORIES = [
  { id: 'all', label: 'All Reviews' },
  { id: 'pilgrimage', label: '🛕 Pilgrimage & Tirupati' },
  { id: 'airport', label: '✈️ Airport & Intercity' },
  { id: 'self-drive', label: '🔑 Self Drive' },
  { id: 'tours', label: '🏞️ Gandikota & Holidays' },
  { id: 'corporate', label: '🏢 Corporate & City' },
];

export default function GoogleReviews({ title, subtitle, filterCategory = null }) {
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'all');
  const [likedReviews, setLikedReviews] = useState({});

  const filteredReviews = useMemo(() => {
    if (selectedCategory === 'all') {
      return GOOGLE_REVIEWS_DATA.reviews;
    }
    return GOOGLE_REVIEWS_DATA.reviews.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const handleToggleLike = (id) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={styles.reviewsSection} id="google-reviews">
      <div className={styles.ambientGlow} />

      <div className="container">
        {/* ══ 1. HEADER ══ */}
        <div className={styles.headerWrap}>
          <div className={styles.googlePill}>
            <span className={styles.googleGIcon}>
              <GoogleGIcon size={18} />
            </span>
            <span className={styles.pillText}>
              <span>Google Verified Business</span>
              <span className={styles.pillStars}>★★★★★</span>
              <span>5.0 / 5.0</span>
            </span>
          </div>

          <h2 className={styles.sectionTitle}>
            {title || (
              <>
                Real Experiences from <span className={styles.goldText}>Real Travelers</span>.
              </>
            )}
          </h2>

          <p className={styles.sectionSub}>
            {subtitle ||
              'Authentic, verified Google Business Profile reviews from devotees, corporate leaders, and tourists across Andhra Pradesh.'}
          </p>
        </div>

        {/* ══ 2. MAIN GRID: SUMMARY + REVIEWS ══ */}
        <div className={styles.mainGrid}>
          {/* Left Column: Rating Summary Box */}
          <aside className={styles.summaryCard}>
            <div className={styles.summaryTop}>
              <div className={styles.bigScore}>{GOOGLE_REVIEWS_DATA.overallRating.toFixed(1)}</div>
              <div className={styles.summaryMeta}>
                <div className={styles.starsBig}>★★★★★</div>
                <div className={styles.scoreLabel}>
                  Based on <strong>{GOOGLE_REVIEWS_DATA.totalReviewsCount}</strong> verified reviews
                </div>
                <div className={styles.verifiedLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>100% Google Verified Profile</span>
                </div>
              </div>
            </div>

            {/* Rating Breakdown Distribution Bars */}
            <div className={styles.breakdownList}>
              {[5, 4, 3, 2, 1].map((stars) => {
                const percent = GOOGLE_REVIEWS_DATA.ratingBreakdown[stars] || 0;
                return (
                  <div key={stars} className={styles.breakdownRow}>
                    <span className={styles.starCount}>{stars} ★</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: `${percent}%` }} />
                    </div>
                    <span className={styles.percentNum}>{percent}%</span>
                  </div>
                );
              })}
            </div>

            {/* Core Trust Checklist */}
            <div className={styles.trustChecklist}>
              <div className={styles.trustCheckItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Zero Hidden Toll / Extra Driver Fees</span>
              </div>
              <div className={styles.trustCheckItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Sanitized, AC Chilled Vehicle Guarantee</span>
              </div>
              <div className={styles.trustCheckItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>100% On-Time Pickup or Fare Discount</span>
              </div>
              <div className={styles.trustCheckItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Direct 24/7 WhatsApp Chauffeur Support</span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.summaryActions}>
              <a
                href={GOOGLE_REVIEWS_DATA.googleReviewWriteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.writeReviewBtn}
                id="cta-write-google-review"
              >
                <span>⭐ Write a Review on Google</span>
              </a>

              <a
                href={GOOGLE_REVIEWS_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewGoogleBtn}
                id="cta-view-google-profile"
              >
                <GoogleGIcon size={16} />
                <span>View Google Business Profile ↗</span>
              </a>
            </div>
          </aside>

          {/* Right Column: Category Filters & Review Cards */}
          <div className={styles.reviewsContent}>
            {/* Category Filter Pills */}
            <div className={styles.filterRow} role="tablist" aria-label="Review Categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`${styles.filterTab} ${selectedCategory === cat.id ? styles.filterTabActive : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Review Cards Grid */}
            <div className={styles.cardsGrid}>
              {filteredReviews.map((r) => {
                const isLiked = !!likedReviews[r.id];
                const likeCount = r.likes + (isLiked ? 1 : 0);

                return (
                  <article key={r.id} className={styles.reviewCard}>
                    {/* Header: Avatar, Name, Stamp */}
                    <div>
                      <div className={styles.cardHeader}>
                        <div className={styles.authorBox}>
                          <div className={styles.avatarWrap}>
                            <div className={styles.avatar} style={{ background: r.avatarColor }}>
                              {r.name[0]}
                            </div>
                            <span className={styles.googleMiniBadge} title="Verified on Google">
                              <GoogleGIcon size={10} />
                            </span>
                          </div>

                          <div className={styles.authorDetails}>
                            <div className={styles.authorName}>{r.name}</div>
                            <div className={styles.authorBadge}>{r.badge}</div>
                          </div>
                        </div>

                        <span className={styles.verifiedStamp}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          Verified
                        </span>
                      </div>

                      {/* Stars & Relative Date */}
                      <div className={styles.ratingRow} style={{ marginTop: '12px', marginBottom: '10px' }}>
                        <div className={styles.stars}>{'★'.repeat(r.rating)}</div>
                        <span className={styles.dateText}>Posted {r.date}</span>
                      </div>

                      {/* Service Tag */}
                      <div className={styles.serviceTag}>{r.service}</div>

                      {/* Review Quote Body */}
                      <p className={styles.reviewText} style={{ marginTop: '12px' }}>
                        &ldquo;{r.text}&rdquo;
                      </p>

                      {/* Owner Response */}
                      {r.ownerResponse && (
                        <div className={styles.ownerResponseBox}>
                          <div className={styles.ownerResponseHeader}>
                            <span className={styles.ownerDot} />
                            <span>Response from MANA Tours (Owner)</span>
                          </div>
                          <p className={styles.ownerResponseText}>&ldquo;{r.ownerResponse}&rdquo;</p>
                        </div>
                      )}
                    </div>

                    {/* Footer: Helpful interaction */}
                    <div className={styles.cardFooter}>
                      <button
                        type="button"
                        className={`${styles.helpfulBtn} ${isLiked ? styles.helpfulBtnActive : ''}`}
                        onClick={() => handleToggleLike(r.id)}
                        aria-label="Mark review as helpful"
                      >
                        <span>👍</span>
                        <span>Helpful ({likeCount})</span>
                      </button>

                      <a
                        href={GOOGLE_REVIEWS_DATA.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceGoogle}
                        title="View review on Google Maps"
                      >
                        <GoogleGIcon size={12} />
                        <span>View on Google ↗</span>
                      </a>
                    </div>
                  </article>
                );
              })}

              {/* 🌟 Next Reviewer Invitation Card */}
              <div className={styles.inviteCard}>
                <div className={styles.inviteIcon}>⭐</div>
                <h3 className={styles.inviteTitle}>Recently Traveled With Us?</h3>
                <p className={styles.inviteText}>
                  Help fellow devotees, families, and travelers in Kadapa by sharing your 5-star Google review!
                </p>
                <a
                  href={GOOGLE_REVIEWS_DATA.googleReviewWriteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inviteBtn}
                  id="cta-invite-write-review"
                >
                  <GoogleGIcon size={16} />
                  <span>Write a Google Review →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 3. BOTTOM CALLOUT BANNER ══ */}
        <div className={styles.bottomCallout}>
          <div className={styles.calloutLeft}>
            <span className={styles.calloutIcon}>💬</span>
            <div>
              <div className={styles.calloutTitle}>Traveled with MANA Tours & Travels Recently?</div>
              <div className={styles.calloutSub}>
                Your feedback helps fellow devotees & travelers make informed decisions. Share your 5-star experience!
              </div>
            </div>
          </div>

          <a
            href={GOOGLE_REVIEWS_DATA.googleReviewWriteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.calloutBtn}
          >
            <GoogleGIcon size={16} />
            <span>Leave a Google Review →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
