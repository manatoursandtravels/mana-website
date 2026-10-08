/**
 * MANA Tours & Travels — GMB Q&A Seeder & Community Agent
 * 
 * Pre-populates high-intent customer FAQs directly onto the Google Business
 * Profile Q&A module to intercept search queries and drive inbound calls.
 */

const HIGH_INTENT_QAS = [
  {
    question: 'How do I book a cab from Kadapa to Tirupati with MANA Tours?',
    answer: 'You can book directly by calling or sending a WhatsApp message to our 24/7 dispatch desk at +91 99083 00718 or +91 99083 20718. We provide clean AC Sedans (Etios/Dzire) and 7-seater Innova Crystas with doorstep pickup across Kadapa city.',
    intent: 'Direct Booking / Tirupati Cab',
  },
  {
    question: 'What are the documents needed to rent a self-drive car in Kadapa?',
    answer: 'To rent a self-drive car at MANA Tours, you need: 1) Original valid Driving License, 2) Aadhaar Card / Govt ID, and 3) A 100% refundable security deposit via UPI or Cash. Handover is provided right at your doorstep in Kadapa.',
    intent: 'Self-Drive KYC / Requirements',
  },
  {
    question: 'Do you provide early morning pickups in Kadapa for airport drops to Bangalore or Hyderabad?',
    answer: 'Yes, absolutely! We operate 24 hours a day, 7 days a week. We specialize in early morning (2:00 AM – 4:00 AM) pickups with guaranteed on-time flight arrival at Kempegowda International Airport (BLR) and Rajiv Gandhi International Airport (HYD). Call 099083 00718.',
    intent: 'Airport Transfer / 24-7 Availability',
  },
  {
    question: 'Are toll and parking charges included in the cab fare?',
    answer: 'We provide upfront transparent fare quotes for the vehicle, chauffeur, and fuel. Tolls, state taxes, and parking fees are charged at actuals with genuine receipts, ensuring zero hidden costs or surprises.',
    intent: 'Pricing Transparency / Trust',
  },
  {
    question: 'Can we book a day tour to Gandikota Grand Canyon and Belum Caves from Kadapa?',
    answer: 'Yes! Our Gandikota & Belum Caves day tour package includes a private AC vehicle with an experienced chauffeur who knows all scenic viewpoints, fort history, and sunset spots. Call +91 99083 00718 for custom family or group itineraries.',
    intent: 'Day Tour / Gandikota Sightseeing',
  },
];

function runQaSeeder() {
  console.log('=====================================================');
  console.log('❓ GMB Q&A Seeder & Community Agent Active');
  console.log('Business: MANA Tours & Travels | Kadapa');
  console.log('=====================================================\n');

  console.log('Top 5 High-Intent Questions to Populate on Google Business Profile:\n');

  HIGH_INTENT_QAS.forEach((item, index) => {
    console.log(`[Q&A Pair #${index + 1}] — Target Intent: ${item.intent}`);
    console.log(`❓ Question: "${item.question}"`);
    console.log(`💡 Owner Answer: "${item.answer}"`);
    console.log('\n-----------------------------------------------------\n');
  });

  console.log('💡 How to Post:');
  console.log('1. Open your profile on Google Maps (https://share.google/K8vvkOsIMLLvvZBac).');
  console.log('2. Scroll to "Questions & Answers".');
  console.log('3. Tap "Ask a question", paste the question.');
  console.log('4. From your owner account (manatoursandtravels@gmail.com), tap "Answer" and paste the owner response.');
  console.log('This permanently displays helpful Q&As to all potential travelers searching in Kadapa!\n');
}

if (require.main === module) {
  runQaSeeder();
}

module.exports = { HIGH_INTENT_QAS, runQaSeeder };
