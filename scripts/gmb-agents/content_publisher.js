/**
 * MANA Tours & Travels — GMB Weekly Offers & Updates Publisher Agent
 * 
 * Generates ready-to-post Google Business Profile updates with "Call Now" CTAs
 * to drive maximum inbound phone calls from local search and Google Maps.
 */

const POST_CAMPAIGNS = [
  {
    week: 'Week 1',
    topic: 'Sacred Tirupati Balaji Darshan Pilgrimage Cab',
    category: 'What\'s New / Offer',
    ctaButton: 'CALL_NOW (+91 99083 00718)',
    headline: 'Planning Tirupati Balaji Darshan from Kadapa? 🛕 Travel Stress-Free in Spotless AC Fleet!',
    body: `Heading for sacred Tirumala darshan? MANA Tours & Travels Kadapa offers 24/7 doorstep pickup with experienced chauffeurs who know temple timings and ghat road routes perfectly.

• Clean, chilled AC Sedans (Etios/Dzire) & 7-Seater Innova Crysta
• Early morning departures available (2:00 AM – 4:00 AM)
• Zero hidden costs — transparent upfront fare quotes
• Doorstep pickup & drop anywhere in Kadapa city

Call Pavan or Jyothi directly for today's discounted fare quote!`,
    suggestedImage: 'public/images/tirupati.jpg',
    keywords: ['Kadapa to Tirupati cab', 'Tirupati darshan taxi', 'Kadapa travels', 'MANA tours Kadapa'],
  },
  {
    week: 'Week 2',
    topic: 'Weekend Getaway: Gandikota Grand Canyon & Belum Caves',
    category: 'Offer / Event',
    ctaButton: 'CALL_NOW (+91 99083 00718)',
    headline: 'Weekend Road Trip! 🏜️ Gandikota Canyon & Belum Caves Day Tour from Kadapa',
    body: `Witness the breathtaking sunset over the Penna River gorge at the Grand Canyon of India, and explore the ancient limestone formations of Belum Caves!

• Private AC cab with chauffeur-cum-guide
• Full-day sightseeing with relaxed photography stops
• Comfortable seating for couples, families, and friend groups
• Flexible pickup times from Kadapa, Proddatur, and Pulivendula

Book your weekend slot today! Call our dispatch desk for best custom tour quotes.`,
    suggestedImage: 'public/images/gandikota.jpg',
    keywords: ['Gandikota tour from Kadapa', 'Belum caves cab', 'Kadapa day trips', 'Rayalaseema tourism'],
  },
  {
    week: 'Week 3',
    topic: 'Guaranteed On-Time Bangalore & Hyderabad Airport Drops',
    category: 'What\'s New',
    ctaButton: 'CALL_NOW (+91 99083 00718)',
    headline: 'Catching an Early Morning Flight? ✈️ Fixed-Fare Kadapa to Bangalore & Hyderabad Airport Drops',
    body: `Never miss a flight again. MANA Tours guarantees 100% on-time departures to Kempegowda International Airport (BLR) and RGIA Hyderabad (HYD).

• Chauffeur arrives 15 minutes before scheduled pickup
• Smooth highway driving with well-maintained commercial vehicles
• Fixed upfront fares with zero late-night surcharges
• Luggage assistance and comfortable AC travel

Call our 24/7 booking desk at 099083 00718 to schedule your airport transfer.`,
    suggestedImage: 'public/images/hero-car.jpg',
    keywords: ['Kadapa to Bangalore airport taxi', 'Kadapa to Hyderabad airport cab', 'airport taxi Kadapa'],
  },
  {
    week: 'Week 4',
    topic: 'Premium Self-Drive Cars in Kadapa from ₹1,499/Day',
    category: 'Offer',
    ctaButton: 'CALL_NOW (+91 99083 00718)',
    headline: 'Drive Yourself with Freedom! 🔑 Premium Self-Drive Car Rentals in Kadapa from ₹1,499/Day',
    body: `Looking for freedom on your next road trip? Rent a self-drive car in Kadapa with MANA Tours!

• Fully sanitized Swift Dzire, Toyota Etios & Ertiga MPV
• 100% transparent: Customer-managed fuel (zero fuel markup)
• Quick KYC with Driving License & Aadhaar
• Fast, hassle-free doorstep handover in Kadapa city

Limited vehicles available for weekend road trips — Call now to reserve your car!`,
    suggestedImage: 'public/images/silver-fleet-hero.jpg',
    keywords: ['Self drive cars in Kadapa', 'car rental Kadapa', 'rent car Kadapa', 'MANA self drive'],
  },
  {
    week: 'Week 5',
    topic: 'New Arrival: Stealth Black Mahindra XUV 3XO Self-Drive SUV',
    category: 'What\'s New / Offer',
    ctaButton: 'CALL_NOW (+91 99083 00718)',
    headline: 'Experience the Thrill! 🔑 New Stealth Black Mahindra XUV 3XO Self-Drive SUV in Kadapa',
    body: `Upgrade your road trip with our brand-new Stealth Black Mahindra XUV 3XO!

• Panoramic Skyroof & Dual-Zone Climate Control
• Turbocharged performance for Gandikota, Tirupati & highway road trips
• 100% transparent: Customer-managed fuel (zero fuel markup)
• Instant 2-minute digital KYC with DL & Aadhaar
• Free doorstep handover anywhere in Kadapa city

Turn heads wherever you drive. Call Pavan or Jyothi directly at 099083 00718 to book your dates!`,
    suggestedImage: 'public/images/fleet-xuv-3xo.png',
    keywords: ['Mahindra XUV 3XO Kadapa', 'Self drive SUV Kadapa', 'Self drive cars in Kadapa', 'MANA tours Kadapa'],
  },
];

function generateWeeklyPost(weekIndex = 0) {
  const post = POST_CAMPAIGNS[weekIndex % POST_CAMPAIGNS.length];
  return post;
}

function runContentPublisher() {
  console.log('=====================================================');
  console.log('📢 GMB Weekly Offers & Updates Publisher Agent Active');
  console.log('Business: MANA Tours & Travels | Kadapa');
  console.log('=====================================================\n');

  POST_CAMPAIGNS.forEach((campaign, idx) => {
    console.log(`[Campaign ${idx + 1}] — ${campaign.topic}`);
    console.log(`📌 Post Type: ${campaign.category}`);
    console.log(`🔘 CTA Button on GMB: ${campaign.ctaButton}`);
    console.log(`🖼️ Recommended Image: ${campaign.suggestedImage}`);
    console.log(`\n📰 Headline:`);
    console.log(campaign.headline);
    console.log(`\n📄 Post Body:`);
    console.log(campaign.body);
    console.log(`\n🏷️ Local SEO Tags: ${campaign.keywords.map(k => '#' + k.replace(/\s+/g, '')).join(' ')}`);
    console.log('\n-----------------------------------------------------\n');
  });

  console.log('💡 How to Publish: Open Google Business Profile Manager -> Tap "Add update" -> Choose "Add update" or "Add offer" -> Paste text and set button to "Call now".');
}

if (require.main === module) {
  runContentPublisher();
}

module.exports = { POST_CAMPAIGNS, generateWeeklyPost, runContentPublisher };
