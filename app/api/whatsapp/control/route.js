import { NextResponse } from 'next/server';
import {
  getWhatsAppState,
  updateWhatsAppState,
  queueOutboxMessage,
  processCustomerInbound,
  generateUpiDetails,
  getWhatsAppChats,
  saveWhatsAppChats,
} from '@/lib/whatsappAutomation';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    const state = getWhatsAppState();

    switch (action) {
      case 'toggle-autopilot': {
        const newState = !state.autoPilot;
        const updated = updateWhatsAppState({ autoPilot: newState });
        return NextResponse.json({
          success: true,
          message: `Auto-Pilot is now ${newState ? 'ACTIVE' : 'PAUSED'}`,
          state: updated,
        });
      }

      case 'send-manual-message': {
        const { toPhone, text, customerName } = payload || {};
        if (!toPhone || !text) {
          return NextResponse.json({ success: false, error: 'Phone and text are required' }, { status: 400 });
        }

        // 1. Queue to WhatsApp Gateway outbox
        queueOutboxMessage({ toPhone, text, type: 'manual_chat' });

        // 2. Append to chat history
        const chats = getWhatsAppChats();
        const cleanPhone = toPhone.replace(/[^0-9]/g, '');
        const chat = chats.find((c) => c.phone.replace(/[^0-9]/g, '').endsWith(cleanPhone.slice(-10)));

        const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const newMsg = {
          id: `m-agent-${Date.now()}`,
          sender: 'agent',
          text,
          time: nowTime,
          timestamp: Date.now(),
        };

        if (chat) {
          chat.lastMessage = text;
          chat.lastMessageTime = 'Just now';
          chat.messages.push(newMsg);
        } else {
          chats.unshift({
            id: `chat-${cleanPhone}`,
            phone: toPhone,
            name: customerName || 'Customer',
            category: 'general',
            route: 'Custom Inquiry',
            vehicle: 'Chauffeur / Self-Drive',
            language: 'English',
            lastMessage: text,
            lastMessageTime: 'Just now',
            unread: false,
            status: 'Follow-up Sent',
            messages: [newMsg],
          });
        }
        saveWhatsAppChats(chats);

        return NextResponse.json({
          success: true,
          message: 'Message queued and dispatched',
          chats,
        });
      }

      case 'send-upi-request': {
        const { toPhone, amount = 500, customerName, serviceNote = 'Trip Advance' } = payload || {};
        if (!toPhone) {
          return NextResponse.json({ success: false, error: 'Customer Phone is required' }, { status: 400 });
        }

        const upi = generateUpiDetails({ amount, customerPhone: toPhone, tripNote: serviceNote });
        const upiMessage =
          `*MANA Tours & Travels — Booking Advance Request*\n` +
          `----------------------------------------\n` +
          `👤 Customer: ${customerName || 'Valued Guest'}\n` +
          `📍 Service: ${serviceNote}\n` +
          `💰 Advance Amount: ₹${upi.amount.toLocaleString('en-IN')}\n` +
          `💳 UPI ID: ${upi.upiId}\n` +
          `🏢 Payee: ${upi.payee}\n\n` +
          `Pay directly via Google Pay / PhonePe / Paytm:\n${upi.upiLink}\n\n` +
          `Reply with screenshot after payment for immediate instant booking voucher!`;

        queueOutboxMessage({ toPhone, text: upiMessage, type: 'upi_request', metadata: { amount, upiLink: upi.upiLink } });

        // Append to chat
        const chats = getWhatsAppChats();
        const cleanPhone = toPhone.replace(/[^0-9]/g, '');
        const chat = chats.find((c) => c.phone.replace(/[^0-9]/g, '').endsWith(cleanPhone.slice(-10)));
        const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const newMsg = {
          id: `m-upi-${Date.now()}`,
          sender: 'agent',
          text: upiMessage,
          time: nowTime,
          timestamp: Date.now(),
          isUpiRequest: true,
          amount: upi.amount,
        };

        if (chat) {
          chat.lastMessage = `[Payment Request: ₹${upi.amount}]`;
          chat.lastMessageTime = 'Just now';
          chat.status = 'Advance Requested';
          chat.messages.push(newMsg);
        }
        saveWhatsAppChats(chats);

        // Update state count
        updateWhatsAppState({
          stats: {
            paymentRequestsSent: (state.stats?.paymentRequestsSent || 0) + 1,
          },
        });

        return NextResponse.json({
          success: true,
          message: `UPI request for ₹${upi.amount} dispatched!`,
          upi,
          chats,
        });
      }

      case 'simulate-inbound': {
        const { phone = '+91 94943 01844', name = 'Guest', messageText } = payload || {};
        if (!messageText) {
          return NextResponse.json({ success: false, error: 'messageText is required' }, { status: 400 });
        }

        const result = processCustomerInbound({ phone, name, messageText });
        return NextResponse.json({
          success: true,
          message: 'Inbound message processed',
          result,
        });
      }

      case 'disconnect': {
        const updated = updateWhatsAppState({
          status: 'DISCONNECTED',
          qrDataUrl: null,
        });
        return NextResponse.json({
          success: true,
          message: 'WhatsApp session disconnected',
          state: updated,
        });
      }

      default:
        return NextResponse.json({ success: false, error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[API /api/whatsapp/control POST Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
