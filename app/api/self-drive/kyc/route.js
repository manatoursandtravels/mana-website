import { NextResponse } from 'next/server';
import { recordKycSubmission, getAllKycRecords, getKycByPassId } from '@/lib/kycTracker';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const passId = searchParams.get('passId');

    if (passId) {
      const record = getKycByPassId(passId);
      if (!record) {
        return NextResponse.json({ success: false, error: 'Pass not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, record });
    }

    const records = getAllKycRecords();
    return NextResponse.json({ success: true, count: records.length, records });
  } catch (error) {
    console.error('[API /api/self-drive/kyc GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch KYC records' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, carModel, dlNumber } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Customer Name and Mobile Number are required.' },
        { status: 400 }
      );
    }

    const newRecord = recordKycSubmission(body);

    return NextResponse.json({
      success: true,
      message: 'Self-Drive Digital KYC verified successfully.',
      record: newRecord,
    });
  } catch (error) {
    console.error('[API /api/self-drive/kyc POST Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process Digital KYC submission.' },
      { status: 500 }
    );
  }
}
