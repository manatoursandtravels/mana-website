import { NextResponse } from 'next/server';
import { getWhatsAppLeads, updateWhatsAppLead } from '@/lib/whatsappAutomation';

export async function GET() {
  try {
    const leads = getWhatsAppLeads();
    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error('[API /api/whatsapp/leads GET Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { leadId, updates } = body;

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 });
    }

    const updated = updateWhatsAppLead(leadId, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      lead: updated,
    });
  } catch (error) {
    console.error('[API /api/whatsapp/leads POST Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
