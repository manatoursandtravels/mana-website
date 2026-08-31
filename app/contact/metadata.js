// app/contact/metadata.js — Separate server-side metadata for the contact page
// This is imported by app/contact/layout.js to provide metadata for the client component page

export const contactMetadata = {
  title: 'Contact Us — 24/7 Booking Desk & Fleet Concierge',
  description:
    'Contact MANA Tours & Travels in Kadapa, Andhra Pradesh. Call or WhatsApp Jyothi (Booking Desk) at +91 99083 20718 or Pavan (Fleet Partner) at +91 99083 00718. Available 24/7 for instant cab bookings & self-drive rentals.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact MANA Tours & Travels Kadapa | 24/7 Booking Desk',
    description: 'Get in touch with MANA Tours & Travels in Kadapa. Call or WhatsApp for instant bookings and quotes.',
    url: 'https://www.manatoursandtravels.com/contact',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Contact MANA Tours Kadapa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MANA Tours & Travels Kadapa',
    description: '24/7 booking desk and customer assistance for cabs and self-drive cars in Kadapa.',
    images: ['/images/hero-car.jpg'],
  },
};
