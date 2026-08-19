import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sheetId = searchParams.get('sheetId') || '1aW5a8lSGzkHli_ldxusS-R017-toWu7sCKAuLimFKF';

  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    const res = await fetch(gvizUrl, { next: { revalidate: 0 } });
    const text = await res.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      return NextResponse.json({
        success: false,
        error: 'Google Sheet sharing must be set to "Anyone with the link can view".',
        leads: [],
      });
    }

    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonString);

    if (!data.table || !data.table.rows) {
      return NextResponse.json({ success: true, leads: [] });
    }

    const parsedLeads = data.table.rows.map((r, rIdx) => {
      const cells = (r.c || []).map((cell) => (cell ? cell.v || cell.f || '' : ''));
      return {
        id: rIdx + 1,
        timestamp: cells[0] ? String(cells[0]) : '',
        name: cells[1] ? String(cells[1]) : '',
        phone: cells[2] ? String(cells[2]) : '',
        service: cells[3] ? String(cells[3]) : '',
        tripType: cells[4] ? String(cells[4]) : '',
        pickup: cells[5] ? String(cells[5]) : '',
        destination: cells[6] ? String(cells[6]) : '',
        travelDate: cells[7] ? String(cells[7]) : '',
        returnDate: cells[8] ? String(cells[8]) : '',
        passengers: cells[9] ? String(cells[9]) : '',
        notes: cells[10] ? String(cells[10]) : '',
        source: cells[11] ? String(cells[11]) : '',
        status: cells[12] ? String(cells[12]) : 'New Lead',
      };
    }).filter(lead => lead.name || lead.phone || lead.service);

    return NextResponse.json({
      success: true,
      total: parsedLeads.length,
      leads: parsedLeads,
    });
  } catch (error) {
    console.error('CRM Leads API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      leads: [],
    }, { status: 500 });
  }
}
