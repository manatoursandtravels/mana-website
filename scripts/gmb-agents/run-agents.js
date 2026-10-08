/**
 * MANA Tours & Travels | Kadapa - Master GMB Agent Orchestrator
 * 
 * Runs all operational GMB automation tasks:
 * 1. Local SEO & Schema audit
 * 2. Unanswered Review Responder generator
 * 3. Weekly Google Post / Update draft generator
 * 4. Google Maps Q&A Seeder
 */

const { runAudit } = require('./local_seo_monitor');
const { runReviewSentinel } = require('./review_responder');
const { runContentPublisher } = require('./content_publisher');
const { runQaSeeder } = require('./qa_seeder');

console.clear ? console.clear() : null;
console.log('================================================================');
console.log('🚀 MANA TOURS & TRAVELS | KADAPA - GMB GROWTH AGENT ENGINE');
console.log('   Target: Dominate Local 3-Pack & Maximize Direct Inbound Calls');
console.log('================================================================\n');

try {
  console.log('\n>>> STEP 1: AUDITING LOCAL SEO, SCHEMA & NAP HEALTH...');
  runAudit();

  console.log('\n>>> STEP 2: GENERATING KEYWORD-OPTIMIZED REVIEW RESPONSES...');
  runReviewSentinel();

  console.log('\n>>> STEP 3: GENERATING HIGH-CONVERTING GOOGLE POSTS...');
  runContentPublisher();

  console.log('\n>>> STEP 4: GENERATING HIGH-INTENT GOOGLE MAPS Q&A...');
  runQaSeeder();

  console.log('\n================================================================');
  console.log('✅ ALL GMB AGENT TASKS COMPLETED SUCCESSFULLY.');
  console.log('================================================================\n');
} catch (error) {
  console.error('❌ Error executing GMB agents:', error);
}
