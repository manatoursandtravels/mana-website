import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      service,
      tripType,
      pickup,
      destination,
      date,
      returnDate,
      passengers,
      notes,
      sourceUrl,
    } = body;

    const leadPayload = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: name || 'Not specified',
      phone: phone || 'Not specified',
      service: service || 'General',
      tripType: tripType || 'Standard',
      pickup: pickup || '',
      destination: destination || '',
      travelDate: date || 'Immediate / Flexible',
      returnDate: returnDate || 'N/A',
      passengers: passengers || '1',
      notes: notes || '',
      sourceUrl: sourceUrl || 'Direct Website',
      status: 'New Lead',
    };

    // 1. If Google Sheets Webhook is configured, forward lead to Google Sheet
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

    // 2. Return success
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      lead: leadPayload,
    });
  } catch (error) {
    console.error('[API Lead Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
