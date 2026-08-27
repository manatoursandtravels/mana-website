// app/faq/layout.js — Server component that injects FAQPage structured data
// This allows page.js to remain 'use client' while still getting schema.org benefits

export const metadata = {
  title: 'FAQ — MANA Tours & Travels Kadapa | Cab, Self-Drive & Pilgrimage Questions',
  description:
    'Answers to your most common questions about MANA Tours & Travels Kadapa — cab booking, Tirupati pilgrimage tours, self-drive car rentals, fleet partner program, and payment methods. Call +91 99083 00718.',
  keywords: [
    'MANA tours kadapa FAQ',
    'cab booking questions kadapa',
    'kadapa to tirupati how much',
    'self drive car rental kadapa FAQ',
    'mana travels booking process',
    'is fuel included self drive kadapa',
    'tirupati darshan cab kadapa price',
  ],
  alternates: {
    canonical: 'https://www.manatoursandtravels.com/faq',
  },
};

const faqSchemaItems = [
  {
    q: 'How do I book a cab with MANA Tours & Travels in Kadapa?',
    a: 'You can book instantly by calling us at +91 99083 00718, chatting on WhatsApp, or using our interactive Booking & Fare Estimator on the website. We confirm all bookings within 15 to 30 minutes with driver details.',
  },
  {
    q: 'Are there any hidden fuel or night surcharges in MANA cab fares?',
    a: 'Never. MANA provides 100% transparent pricing. Your quoted rate includes the commercial vehicle, licensed chauffeur, fuel, and air conditioning. Tolls and state parking permits are charged at actual government receipts.',
  },
  {
    q: 'What payment methods does MANA Tours & Travels Kadapa accept?',
    a: 'We accept digital UPI (PhonePe, Google Pay, Paytm), direct bank transfers, and cash. Payments are made post-trip after reaching your destination comfortably.',
  },
  {
    q: 'How much advance notice is required for airport or early morning trips from Kadapa?',
    a: 'For outstation trips, airport transfers, and 2 AM–4 AM pilgrimage departures, we recommend booking at least 12–24 hours in advance so we can allocate and sanitize your preferred vehicle.',
  },
  {
    q: 'Do you offer same-day round trips from Kadapa to Tirumala Tirupati?',
    a: 'Yes! Our Kadapa to Tirupati package (starts at ₹3,499 RT in an AC Sedan) includes early morning pickup, temple darshan waiting time, Alipiri check assistance, and comfortable return drop in Kadapa by evening.',
  },
  {
    q: 'Can MANA Tours arrange custom multi-day temple tours from Kadapa to Srisailam, Mahanandi, and Ahobilam?',
    a: 'Absolutely. We specialize in custom Rayalaseema spiritual circuits. Our drivers know temple timings, ghat road navigation, and reputable vegetarian dining spots.',
  },
  {
    q: 'Do you provide Gandikota and Belum Caves day tour packages from Kadapa?',
    a: 'Yes! We offer a full-day sightseeing tour covering the Grand Canyon of India (Gandikota Fort & Gorge) and the historic Belum Caves with flexible photo stops.',
  },
  {
    q: 'What is the daily rate and security deposit for Self-Drive cars in Kadapa?',
    a: 'Our self-drive sedan rentals start at ₹1,499 per day, with a flat ₹800 discount on weekly bookings. We require a 100% refundable security deposit of ₹10,000 returned immediately upon vehicle handback after inspection.',
  },
  {
    q: 'Is fuel included in MANA Self-Drive car rentals in Kadapa?',
    a: 'No, fuel is 100% customer-managed for all self-drive rentals. You receive the car with fuel and return it at the same fuel level.',
  },
  {
    q: 'What documents are required for Self-Drive car rental in Kadapa?',
    a: 'Valid original Indian Driving License (minimum 2 years old), Aadhaar Card or Passport, and a refundable security deposit of ₹10,000.',
  },
  {
    q: 'What vehicles are available in the MANA Tours & Travels Kadapa fleet?',
    a: 'We operate Toyota Etios & Maruti Dzire (5-seater executive sedans), Maruti Ertiga & Kia Carens (7-seater MPVs), Toyota Innova Crysta (luxury MPV), and Force Urbania/Travellers (12–26 seaters) for large groups.',
  },
  {
    q: 'How does the 70% Partner Revenue Share work for vehicle owners in Kadapa?',
    a: 'Vehicle owners who attach their cars to MANA receive 70% of every trip fare, while 30% goes towards customer acquisition, technology, and dispatch operations. Settlements are made on-time digitally via UPI.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.manatoursandtravels.com/faq' },
  ],
};

export default function FaqLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
