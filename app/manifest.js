export default function manifest() {
  return {
    name: 'MANA Tours & Travels Kadapa',
    short_name: 'MANA Travels',
    description: "Kadapa's #1 Cab, Pilgrimage Tours & Self-Drive Car Rental | Rayalaseema | 5★ Rated | Call +91 99083 00718",
    start_url: '/?source=pwa',
    id: '/',
    scope: '/',

    // Enhanced display modes — window-controls-overlay for desktop PWA title bar
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui', 'browser'],

    background_color: '#0E1A2B',
    theme_color: '#0B4EA2',
    lang: 'en-IN',
    dir: 'ltr',
    orientation: 'portrait-primary',
    categories: ['travel', 'transportation', 'lifestyle', 'business'],

    // App Store-style screenshots for install prompt
    screenshots: [
      {
        src: '/images/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'MANA Tours & Travels — Desktop Home',
      },
      {
        src: '/images/screenshot-narrow.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'MANA Tours & Travels — Mobile Home',
      },
    ],

    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],

    shortcuts: [
      {
        name: 'Book Tirupati Pilgrimage Cab',
        short_name: 'Tirupati',
        description: 'Book Balaji Temple darshan cab from Kadapa from ₹2,099',
        url: '/routes/kadapa-tirupati-cab?source=pwa-shortcut',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Self-Drive Car Rental',
        short_name: 'Self Drive',
        description: 'Drive yourself in a sanitized car from ₹1,499/day',
        url: '/services/self-drive?source=pwa-shortcut',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Airport Transfer',
        short_name: 'Airport',
        description: 'Fixed-fare airport cab to Tirupati, Hyderabad RGIA & Bangalore BLR',
        url: '/services/airport-transfers?source=pwa-shortcut',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'WhatsApp Booking',
        short_name: 'WhatsApp',
        description: 'Instant cab booking via WhatsApp — response in 5 minutes',
        url: 'https://wa.me/919908300718?text=Hi+MANA+Tours%2C+I+want+to+book+a+cab',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }],
      },
    ],

    // Sharing target — let users share trip details TO the MANA PWA
    share_target: {
      action: '/?share-target',
      method: 'GET',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
      },
    },

    prefer_related_applications: false,

    related_applications: [
      {
        platform: 'webapp',
        url: 'https://www.manatoursandtravels.com/manifest.webmanifest',
      },
    ],
  };
}
