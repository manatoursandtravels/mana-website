import { NextResponse } from 'next/server';
import { recordOfferClaim } from '@/lib/offerTracker';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      service,
      tripType,
      vehicleChoice,
      pickup,
      destination,
      date,
      timeSlot,
      returnDate,
      passengers,
      notes,
      addOns,
      promoOffer,
      tshirtSize,
      estimatedPrice,
      sourceUrl,
    } = body;

    // 1. If lead is claiming the New Customer 2-for-1 Deal, record and track in database
    let offerClaimInfo = null;
    const isNewCustomerDeal =
      (tripType && tripType.includes('Pay 1 Day, Drive 2 Days')) ||
      (promoOffer && promoOffer.includes('Pay 1 Day for 2 Days'));

    if (isNewCustomerDeal) {
      const claimResult = recordOfferClaim({
        name,
        phone,
        vehicleChoice,
        tripType,
        pickup,
        date,
      });
      if (claimResult.success) {
        offerClaimInfo = `🎁 Verified New Customer Claim #${claimResult.claimNumber || '1'} (Slots Remaining: ${claimResult.slotsRemaining ?? 'N/A'}/50)`;
      }
    }

    const leadPayload = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: name || 'Direct Customer',
      phone: phone || 'Not provided',
      service: service || 'General Booking',
      tripType: tripType || 'Standard',
      vehicleChoice: vehicleChoice || '',
      pickup: timeSlot ? `${pickup || 'Kadapa'} (${timeSlot})` : (pickup || 'Kadapa'),
      destination: destination || '',
      travelDate: date || 'Immediate / Flexible',
      returnDate: returnDate || 'N/A',
      passengers: passengers || '1',
      notes: [
        notes || '',
        offerClaimInfo || '',
        promoOffer ? `Promo: ${promoOffer}` : '',
        tshirtSize ? `T-Shirt Choice: ${tshirtSize}` : '',
        addOns && addOns !== 'None' ? `Preferences: ${addOns}` : '',
        estimatedPrice ? `Estimated Fare: ${estimatedPrice}` : '',
      ].filter(Boolean).join(' | '),
      estimatedPrice: estimatedPrice || '',
      sourceUrl: sourceUrl || 'Direct Website',
      status: '🟡 New Lead',
    };

    // 2. If Google Sheets Webhook is configured, forward lead to Google Sheet
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetWebhook && sheetWebhook.startsWith('http')) {
      try {
        await fetch(sheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
          signal: AbortSignal.timeout(5000),
        });
      } catch (err) {
        console.error('[API Lead] Failed to sync to Google Sheet webhook:', err.message);
      }
    }

    // 3. Return success
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      lead: leadPayload,
      offerClaimInfo,
    });
  } catch (error) {
    console.error('[API Lead Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
