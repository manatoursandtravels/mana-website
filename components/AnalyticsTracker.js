'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackCallLead, trackWhatsAppLead } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Track route changes
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  // 2. Global listener for Call and WhatsApp conversions
  useEffect(() => {
    const handleGlobalClicks = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href') || '';

      // Phone call clicks
      if (href.startsWith('tel:')) {
        const phone = href.replace('tel:', '');
        const idOrClass = target.id || target.className || 'call-button';
        trackCallLead(phone, `${pathname} (${idOrClass})`);
      }

      // WhatsApp booking clicks
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        const idOrClass = target.id || target.className || 'whatsapp-button';
        trackWhatsAppLead('WhatsApp Booking Click', `${pathname} (${idOrClass})`);
      }
    };

    document.addEventListener('click', handleGlobalClicks, { passive: true });
    return () => document.removeEventListener('click', handleGlobalClicks);
  }, [pathname]);

  return null;
}
