import { NextResponse } from 'next/server';
import { getWhatsAppState, updateWhatsAppState } from '@/lib/whatsappAutomation';

export async function GET() {
  try {
    const state = getWhatsAppState();
    return NextResponse.json({
      success: true,
      state,
    });
  } catch (error) {
    console.error('[API /api/whatsapp/status GET Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = updateWhatsAppState(body);
    return NextResponse.json({
      success: true,
      state: updated,
    });
  } catch (error) {
    console.error('[API /api/whatsapp/status POST Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
