import { NextResponse } from 'next/server';
import { getNewCustomerOfferStatus, recordOfferClaim } from '@/lib/offerTracker';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeClaims = searchParams.get('admin') === 'true';
    const status = getNewCustomerOfferStatus();

    return NextResponse.json({
      success: true,
      offer: {
        id: status.offerId,
        name: status.offerName,
        isValid: status.isValid,
        isExpired: status.isExpired,
        isSoldOut: status.isSoldOut,
        expiryDateDisplay: status.expiryDateDisplay,
        maxClaims: status.maxClaims,
        totalClaimed: status.totalClaimed,
        slotsRemaining: status.slotsRemaining,
        claims: includeClaims ? status.claims : undefined,
      },
    });
  } catch (error) {
    console.error('[API New Customer Offer GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offer status' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = recordOfferClaim(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API New Customer Offer POST Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record offer claim' },
      { status: 500 }
    );
  }
}
