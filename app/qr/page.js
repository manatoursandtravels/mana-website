'use client';

import React from 'react';
import Link from 'next/link';

export default function ReviewQrPage() {
  const reviewUrl = 'https://manatoursandtravels.com/review';
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(reviewUrl)}&format=svg`;

  return (
    <div style={{ minHeight: '100vh', background: '#0a1128', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '32px 16px' }}>
      <style jsx global>{`
        @media print {
          body {
            background: #fff !important;
            color: #000 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-sheet {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            padding: 0 !important;
          }
          .sticker-card {
            border: 2px dashed #999 !important;
            box-shadow: none !important;
            page-break-inside: avoid;
            background: #fff !important;
            color: #111 !important;
          }
          .sticker-card * {
            color: #111 !important;
          }
          .gold-text {
            color: #b8860b !important;
          }
        }
      `}</style>

      {/* Header Controls (Hidden on Print) */}
      <div className="no-print" style={{ maxWidth: '800px', margin: '0 auto 32px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#e8c97a', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '12px' }}>
          ← Back to Website
        </Link>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>
          In-Car Google Review QR Stickers
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 20px' }}>
          Print these cards and place them on your car dashboards or behind passenger seats. Every scan opens your verified Google Business review page instantly!
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.print()}
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #a07830)',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(201,168,76,0.4)',
            }}
          >
            🖨️ Print Dashboard Stickers (A4 Sheet)
          </button>
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#e8c97a',
              border: '1px solid rgba(232,201,122,0.3)',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            ↗ Test Review Link
          </a>
        </div>
      </div>

      {/* Printable Cards Grid (4 stickers for 1 A4 page) */}
      <div
        className="print-sheet"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="sticker-card"
            style={{
              background: '#0e1a38',
              border: '2px solid rgba(201,168,76,0.4)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #c9a84c, #a07830)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: '999px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              MANA TOURS &amp; TRAVELS | KADAPA
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px', color: '#fff' }}>
              How was your journey today?
            </h2>

            <div className="gold-text" style={{ fontSize: '1.4rem', color: '#e8c97a', margin: '0 0 10px', letterSpacing: '4px' }}>
              ★★★★★
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0 0 16px' }}>
              Loved the AC comfort &amp; safe driving? Scan the QR code below to leave us a quick Google review!
            </p>

            {/* QR Code Container */}
            <div
              style={{
                background: '#fff',
                padding: '14px',
                borderRadius: '12px',
                display: 'inline-block',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                marginBottom: '14px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrImageSrc}
                alt="Scan to Review MANA Tours on Google Maps"
                style={{ width: '170px', height: '170px', display: 'block' }}
              />
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e8c97a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📷 Scan with Phone Camera
            </div>

            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem', color: '#94a3b8' }}>
              24/7 Cab &amp; Self-Drive Booking: <strong style={{ color: '#fff' }}>+91 99083 00718</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
