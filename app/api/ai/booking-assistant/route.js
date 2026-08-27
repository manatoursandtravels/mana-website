// app/api/ai/booking-assistant/route.js
// 24/7 Multilingual AI Booking Assistant API for MANA Tours & Travels Kadapa
// Handles voice transcriptions, natural language queries, rate calculations, and CRM lead logging

import { NextResponse } from 'next/server';
import { parseBookingQuery, generateAiQuote } from '@/lib/aiBookingEngine';
import { recordOfferClaim } from '@/lib/offerTracker';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt = '', language = 'en', phone = '', name = '', autoLogLead = true } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // 1. Run NLP parsing and fare calculation engine
    const parsed = parseBookingQuery(prompt);
    // If client requested specific language, prioritize it
    if (language && ['te', 'en', 'hi'].includes(language)) {
      parsed.detectedLang = language;
    }

    const quote = generateAiQuote(parsed);

    // 2. If customer claimed promo and phone is provided, record in promo tracker
    let offerClaim = null;
    if (quote.promoApplicable && phone && phone.length >= 10) {
      try {
        const claimResult = recordOfferClaim({
          name: name || 'AI Assistant User',
          phone,
          vehicleChoice: quote.vehicle.name,
          tripType: quote.tripType,
          date: 'Immediate / Pending',
          pickup: 'Kadapa Hub',
        });
        if (claimResult && claimResult.success) {
          offerClaim = claimResult;
        }
      } catch (err) {
        console.warn('[AI Assistant] Promo claim record notice:', err.message);
      }
    }

    // 3. Log lead to CRM if customer provided contact information
    if (autoLogLead && (phone || name)) {
      try {
        const leadPayload = {
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          name: name || 'AI Voice/Text Inquirer',
          phone: phone || 'Inquiry via AI Chat',
          service: quote.isSelfDrive ? 'Self Drive' : 'Outstation / Pilgrimage',
          tripType: quote.tripType,
          vehicleChoice: quote.vehicle.name,
          pickup: 'Kadapa',
          destination: quote.destination,
          travelDate: quote.timeNote || 'Flexible',
          passengers: String(quote.passengers),
          notes: `🤖 AI Assistant Lead | Route: ${quote.routeLabel} | Est Fare: ₹${quote.estimatedFare} | Query: "${prompt}"`,
          estimatedPrice: `₹${quote.estimatedFare}`,
          sourceUrl: 'AI Assistant Concierge',
          status: '🟡 AI Lead',
        };

        const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
        if (sheetWebhook && sheetWebhook.startsWith('http')) {
          fetch(sheetWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadPayload),
            signal: AbortSignal.timeout(3000),
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('[AI Assistant] Lead logging notice:', err.message);
      }
    }

    return NextResponse.json({
      success: true,
      quote,
      offerClaim,
    });
  } catch (error) {
    console.error('[AI Assistant API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process AI booking query' },
      { status: 500 }
    );
  }
}
