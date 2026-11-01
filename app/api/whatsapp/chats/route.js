import { NextResponse } from 'next/server';
import { getWhatsAppChats, saveWhatsAppChats } from '@/lib/whatsappAutomation';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('category');
    const search = searchParams.get('search');

    let chats = getWhatsAppChats();

    if (filter && filter !== 'all') {
      chats = chats.filter((c) => c.category === filter || c.status.toLowerCase().includes(filter.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      chats = chats.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          (c.route && c.route.toLowerCase().includes(q)) ||
          (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: chats.length,
      chats,
    });
  } catch (error) {
    console.error('[API /api/whatsapp/chats GET Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { chatId, updates } = body;

    const chats = getWhatsAppChats();
    const idx = chats.findIndex((c) => c.id === chatId);
    if (idx !== -1) {
      chats[idx] = { ...chats[idx], ...updates };
      saveWhatsAppChats(chats);
      return NextResponse.json({ success: true, chat: chats[idx] });
    }

    return NextResponse.json({ success: false, error: 'Chat not found' }, { status: 404 });
  } catch (error) {
    console.error('[API /api/whatsapp/chats POST Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
