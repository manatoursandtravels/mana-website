// scripts/whatsapp-gateway/gateway.mjs
// MANA Tours & Travels — Self-Hosted Baileys Multi-Device WhatsApp Gateway (GoWhats Engine)
// Phone: +91 99083 00718

import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers,
} from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import pino from 'pino';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const AUTH_DIR = path.join(ROOT_DIR, 'data', 'whatsapp_auth');

// Dynamic import of lib/whatsappAutomation
let waAutomation = null;
async function getAutomation() {
  if (!waAutomation) {
    waAutomation = await import('../../lib/whatsappAutomation.js');
  }
  return waAutomation;
}

const logger = pino({ level: 'silent' });

async function startWhatsAppGateway() {
  console.log('🚀 [MANA WA Gateway] Starting WhatsApp automation engine for +91 99083 00718...');
  const { updateWhatsAppState, getWhatsAppState, popPendingOutboxMessages, processCustomerInbound } = await getAutomation();

  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`📱 [MANA WA Gateway] Using WA Web v${version.join('.')}, isLatest: ${isLatest}`);

  updateWhatsAppState({
    status: 'CONNECTING',
  });

  // Using Browsers.ubuntu('Chrome') for maximum pairing code compatibility
  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger,
    browser: Browsers.ubuntu('Chrome'),
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    keepAliveIntervalMs: 25000,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 60000,
  });

  sock.ev.on('creds.update', saveCreds);

  let pairingCodeRequested = false;

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    // 1. PRIMARY PAIRING METHOD: 8-DIGIT PAIRING CODE (NO CAMERA NEEDED)
    if (qr && !sock.authState.creds.registered && !pairingCodeRequested) {
      pairingCodeRequested = true;
      const targetPhone = '919908300718';
      
      console.log(`\n⏳ [MANA WA Gateway] Requesting fresh 8-digit Pairing Code from WhatsApp for +${targetPhone}...`);
      
      try {
        const code = await sock.requestPairingCode(targetPhone);
        const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;
        const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        console.log(`\n============================================================`);
        console.log(`  🔑 FRESH PAIRING CODE GENERATED AT ${now}:               `);
        console.log(`             👉   ${formattedCode}   👈                     `);
        console.log(`  ⚠️ Valid for ~90 seconds. Enter on phone immediately!      `);
        console.log(`============================================================\n`);

        let qrDataUrl = null;
        try {
          qrDataUrl = await QRCode.toDataURL(qr, { margin: 2, scale: 6 });
        } catch (e) {}

        updateWhatsAppState({
          status: 'WAITING_FOR_PAIRING_CODE',
          pairingCode: formattedCode,
          pairedPhone: '+91 99083 00718',
          qrDataUrl,
          codeGeneratedAt: Date.now(),
        });
      } catch (pairErr) {
        console.warn('Pairing code request note:', pairErr.message);
        pairingCodeRequested = false;
        try {
          const qrDataUrl = await QRCode.toDataURL(qr, { margin: 2, scale: 7 });
          updateWhatsAppState({
            status: 'WAITING_FOR_QR',
            qrDataUrl,
          });
        } catch (qrErr) {}
      }
    }

    if (connection === 'open') {
      const userJid = sock.user?.id || '';
      const userPhone = userJid.split(':')[0] || '9908300718';
      console.log(`\n🎉 [MANA WA Gateway] WhatsApp Successfully Linked & Online! User: +${userPhone}`);

      updateWhatsAppState({
        status: 'CONNECTED',
        pairedPhone: `+${userPhone}`,
        pairingCode: null,
        qrDataUrl: null,
      });
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.warn(`⚠️ [MANA WA Gateway] Connection closed (code: ${statusCode}). Reconnecting: ${shouldReconnect}`);

      updateWhatsAppState({
        status: 'DISCONNECTED',
      });

      if (shouldReconnect) {
        pairingCodeRequested = false;
        setTimeout(startWhatsAppGateway, 3000);
      } else {
        console.log('🔒 [MANA WA Gateway] Session logged out. Cleaning old session to generate fresh code...');
        try {
          fs.rmSync(AUTH_DIR, { recursive: true, force: true });
        } catch (e) {}
        pairingCodeRequested = false;
        setTimeout(startWhatsAppGateway, 1000);
      }
    }
  });

  // Incoming Messages Event
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (msg.key.fromMe) continue;
      const remoteJid = msg.key.remoteJid || '';
      if (remoteJid.endsWith('@g.us') || remoteJid === 'status@broadcast') continue;

      const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        '';

      if (!text.trim()) continue;

      const senderPhone = remoteJid.replace('@s.whatsapp.net', '');
      const senderName = msg.pushName || 'Customer';

      console.log(`📩 [MANA WA Gateway] Inbound from +${senderPhone} (${senderName}): "${text}"`);

      try {
        const result = processCustomerInbound({
          phone: `+${senderPhone}`,
          name: senderName,
          messageText: text,
        });

        const currentState = getWhatsAppState();

        if (currentState.autoPilot && result.replyText) {
          console.log(`🤖 [MANA WA Gateway] AI Auto-Pilot replying to +${senderPhone}...`);

          await sock.sendPresenceUpdate('composing', remoteJid);
          const delay = Math.max(1200, currentState.autoReplyDelayMs || 1800);
          await new Promise((r) => setTimeout(r, delay));
          await sock.sendPresenceUpdate('paused', remoteJid);

          await sock.sendMessage(remoteJid, { text: result.replyText });
          console.log(`✨ [MANA WA Gateway] Auto-reply dispatched successfully!`);
        }
      } catch (err) {
        console.error('Error processing inbound message:', err);
      }
    }
  });

  // Outbox Poller
  const pollInterval = setInterval(async () => {
    try {
      const pending = popPendingOutboxMessages();
      for (const item of pending) {
        const cleanNumber = item.toPhone.replace(/[^0-9]/g, '');
        const targetJid = `${cleanNumber}@s.whatsapp.net`;
        console.log(`📤 [MANA WA Gateway] Dispatching outbox ${item.type} to ${targetJid}...`);
        await sock.sendMessage(targetJid, { text: item.text });
      }
    } catch (pollErr) {}
  }, 1500);

  // Clean shutdown
  process.on('SIGINT', () => {
    clearInterval(pollInterval);
    process.exit(0);
  });
}

startWhatsAppGateway().catch((err) => {
  console.error('Fatal WhatsApp Gateway Error:', err);
});
