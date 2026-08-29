import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import styles from './YouTubeChannel.module.css';

/* YouTube wordmark SVG */
function YouTubeLogo({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.705} viewBox="0 0 90 63" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M88.1 9.86C87.1 6.22 84.24 3.36 80.6 2.36 73.57.5 45 .5 45 .5S16.43.5 9.4 2.36C5.76 3.36 2.9 6.22 1.9 9.86.04 16.89.04 31.5.04 31.5s-.16 14.61 1.86 21.64c1 3.64 3.86 6.5 7.5 7.5C16.43 62.5 45 62.5 45 62.5s28.57 0 35.6-1.86c3.64-1 6.5-3.86 7.5-7.5 1.86-7.03 1.86-21.64 1.86-21.64s.16-14.61-1.86-21.64z" fill="#FF0000"/>
      <path d="M36 45L59.27 31.5 36 18v27z" fill="white"/>
    </svg>
  );
}

/* Upcoming content cards */
const UPCOMING_CONTENT = [
  {
    icon: '🚗',
    label: 'Self Drive',
    title: 'Kadapa to Gandikota — Self Drive Vlog',
    desc: 'Canyon sunset road trip in our Innova Crysta',
    tag: 'Road Trip',
    tagColor: '#10B981',
  },
  {
    icon: '🛕',
    label: 'Pilgrimage',
    title: 'Tirupati Darshan — Complete Travel Guide',
    desc: 'How to book cabs, slots & stay from Kadapa',
    tag: 'Guide',
    tagColor: '#F59E0B',
  },
  {
    icon: '🔑',
    label: 'How To',
    title: 'Self Drive KYC in 2 Minutes via WhatsApp',
    desc: 'Simplest car rental process in Rayalaseema',
    tag: 'Tutorial',
    tagColor: '#6366F1',
  },
  {
    icon: '🏞️',
    label: 'Tour',
    title: 'Belum Caves + Gandikota — 1 Day Trip',
    desc: 'Best budget itinerary from Kadapa with MANA',
    tag: 'Day Out',
    tagColor: '#EC4899',
  },
];

export default function YouTubeChannel() {
  return (
    <section className={styles.section} aria-label="MANA YouTube Channel">
      {/* Glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        {/* ── Header ── */}
        <div className={styles.header}>
          {/* Channel pill */}
          <div className={styles.channelPill}>
            <YouTubeLogo size={22} />
            <span className={styles.pillHandle}>@ManaToursTravels</span>
            <span className={styles.newBadge}>NEW CHANNEL</span>
          </div>

          <h2 className={styles.title}>
            Watch MANA on <span className={styles.red}>YouTube</span>
          </h2>
          <p className={styles.subtitle}>
            Road trip vlogs, self-drive guides, pilgrimage travel tips &amp; behind-the-scenes —
            all from Kadapa, for Rayalaseema.
          </p>

          {/* Subscribe CTA */}
          <a
            href={BUSINESS.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.subscribeBtn}
            id="cta-youtube-subscribe-hero"
            aria-label="Subscribe to MANA Tours & Travels on YouTube"
          >
            <YouTubeLogo size={18} />
            <span>Subscribe to Our Channel</span>
            <span className={styles.subscribeBtnArrow}>→</span>
          </a>
        </div>

        {/* ── Coming Soon content grid ── */}
        <div className={styles.comingSoonLabel}>
          <span className={styles.comingDot} />
          <span>Coming Soon — First Videos Dropping Shortly</span>
        </div>

        <div className={styles.contentGrid}>
          {UPCOMING_CONTENT.map((item, i) => (
            <a
              key={i}
              href={BUSINESS.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contentCard}
              aria-label={`Upcoming: ${item.title}`}
            >
              {/* Thumbnail placeholder */}
              <div className={styles.thumbnail}>
                <span className={styles.thumbEmoji}>{item.icon}</span>
                {/* Play button overlay */}
                <div className={styles.playOverlay}>
                  <div className={styles.playBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Coming soon chip */}
                <div className={styles.comingSoonChip}>Coming Soon</div>
              </div>

              {/* Card body */}
              <div className={styles.cardBody}>
                <span className={styles.contentTag} style={{ color: item.tagColor, borderColor: item.tagColor + '40', background: item.tagColor + '14' }}>
                  {item.tag}
                </span>
                <h3 className={styles.contentTitle}>{item.title}</h3>
                <p className={styles.contentDesc}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── Bottom channel CTA strip ── */}
        <div className={styles.channelStrip}>
          <div className={styles.stripLeft}>
            <div className={styles.channelAvatar}>M</div>
            <div className={styles.channelInfo}>
              <div className={styles.channelName}>MANA Tours &amp; Travels</div>
              <div className={styles.channelSub}>Kadapa · Rayalaseema · South India</div>
            </div>
          </div>
          <div className={styles.stripRight}>
            <p className={styles.stripText}>
              🔔 Subscribe &amp; hit the bell — never miss a road trip, deal, or self-drive vlog!
            </p>
            <a
              href={BUSINESS.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.stripBtn}
              id="cta-youtube-subscribe-strip"
            >
              <YouTubeLogo size={16} />
              <span>Subscribe Free</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
