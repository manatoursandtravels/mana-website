'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';

export default function ReviewRedirectPage() {
  const gmbUrl = BUSINESS.googleReviewWriteUrl || 'https://share.google/K8vvkOsIMLLvvZBac';

  useEffect(() => {
    // Attempt instant redirection to Google Business Profile review dialog
    const timer = setTimeout(() => {
      window.location.href = gmbUrl;
    }, 800);

    return () => clearTimeout(timer);
  }, [gmbUrl]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0B1B3D 0%, #071228 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '36px 24px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37 0%, #B88E3E 100%)',
              margin: '0 auto 16px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
            }}
          >
            <span style={{ fontSize: '36px' }}>⭐</span>
          </div>
          <h1
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              margin: '0 0 6px 0',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            MANA Tours &amp; Travels
          </h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>
            Kadapa&apos;s Premier 5.0 ★ Travel Service
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            padding: '16px',
            margin: '24px 0',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#38BDF8', marginBottom: '4px' }}>
            Redirecting to Google Reviews...
          </div>
          <p style={{ fontSize: '0.85rem', color: '#CBD5E1', margin: 0, lineHeight: 1.5 }}>
            Thank you for traveling with us! Your feedback takes just 10 seconds and helps our local team immensely.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          <a
            href={gmbUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '15px 20px',
              borderRadius: '14px',
              fontSize: '1rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #0B4EA2 0%, #073574 100%)',
              color: '#FFFFFF',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(11, 78, 162, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <span>⭐ Tap Here to Review on Google</span>
          </a>

          <Link
            href="/"
            style={{
              fontSize: '0.88rem',
              color: '#94A3B8',
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            ← Return to MANA Tours Homepage
          </Link>
        </div>

        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.8rem',
            color: '#64748B',
          }}
        >
          24/7 Dispatch Desk: Call Pavan at{' '}
          <a href={`tel:${BUSINESS.phone.pavan}`} style={{ color: '#38BDF8', textDecoration: 'none' }}>
            {BUSINESS.phone.pavanDisplay}
          </a>
        </div>
      </div>
    </main>
  );
}
