'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import styles from './WhatsAppCrmHub.module.css';

const CATALOGUE_PACKAGES = [
  {
    id: 'gandikota',
    title: 'Gandikota Grand Canyon & Belum Caves',
    rate: '₹3,299',
    unit: 'Combo Package (Sedan AC + Chauffeur)',
    category: 'tour-packages',
    desc: 'Pennar River Gorge, Gandikota Fort & underground Belum Caves exploration.',
    text: `*MANA Tours & Travels — Gandikota & Belum Caves 1-Day Tour*\n` +
      `----------------------------------------\n` +
      `📍 *Destinations:* Gandikota Fort, Pennar Canyon & Belum Caves\n` +
      `🚗 *Vehicle:* Dedicated AC Sedan (Dzire / Etios)\n` +
      `💰 *Package Fare:* ₹3,299 (Driver Bata + AC + Fuel included)\n` +
      `⏰ *Timing:* 06:00 AM Departure from Kadapa · Return by 07:30 PM\n` +
      `🛡️ *Includes:* Doorstep pickup, clean vehicle, experienced local driver.\n\n` +
      `Shall we confirm your booking for this weekend?`,
  },
  {
    id: 'tirupati',
    title: 'Tirupati Balaji Darshan Round Trip',
    rate: '₹3,499',
    unit: 'Round Trip (Innova Crysta Luxury Available)',
    category: 'pilgrimage',
    desc: 'Alipiri checkpost, Seven Hills road with flexible temple darshan wait time.',
    text: `*MANA Tours & Travels — Tirupati Balaji Darshan Cab*\n` +
      `----------------------------------------\n` +
      `📍 *Route:* Kadapa → Tirumala / Tirupati → Kadapa\n` +
      `🚗 *Vehicle Options:*\n` +
      `  • AC Sedan: ₹3,499 Round Trip\n` +
      `  • Innova Crysta (7+1 Luxury): ₹4,899 Round Trip\n` +
      `⏱️ *Wait Time:* Flexible darshan wait buffer included\n` +
      `✨ Driver handles ghat road pass & temple parking.\n\n` +
      `Would you like to reserve for today or tomorrow?`,
  },
  {
    id: 'srisailam',
    title: 'Srisailam Mallikarjuna Jyotirlinga',
    rate: '₹3,799',
    unit: 'Same-Day Round Trip',
    category: 'pilgrimage',
    desc: 'Nallamala forest ghat road, Mallikarjuna Swamy Temple & Dam viewpoint.',
    text: `*MANA Tours & Travels — Srisailam Jyotirlinga Pilgrimage*\n` +
      `----------------------------------------\n` +
      `📍 *Route:* Kadapa → Srisailam Temple & Dam → Kadapa\n` +
      `🚗 *Vehicle:* AC Sedan / 7-Seater Ertiga\n` +
      `💰 *Tariff:* Starts from ₹3,799 (Round Trip Base)\n` +
      `🌲 *Route:* Picturesque Nallamala Ghat Section\n\n` +
      `Please let us know your departure date to assign our expert hill driver.`,
  },
  {
    id: 'bangalore-air',
    title: 'Bangalore Kempegowda Airport (BLR)',
    rate: '₹5,999',
    unit: 'Fixed Door-to-Terminal Drop',
    category: 'airport-transfers',
    desc: 'Punctual door-to-terminal airport drop with flight tracking buffer.',
    text: `*MANA Tours & Travels — Bangalore Airport Drop (BLR)*\n` +
      `----------------------------------------\n` +
      `✈️ *Destination:* Kempegowda International Airport (BLR)\n` +
      `💰 *Fixed Tariff:* ₹5,999 (Including Toll & Parking buffer)\n` +
      `🚗 *Vehicle:* Sanitized Highway Sedan (Etios/Dzire)\n` +
      `⏱️ *On-Time Guarantee:* 100% on-time flight arrival assurance.\n\n` +
      `Please share your flight departure time to schedule pickup.`,
  },
  {
    id: 'self-drive-xuv',
    title: 'Mahindra XUV 3XO SUV (Stealth Black)',
    rate: '₹2,199/day',
    unit: '24-Hour Daily Rental (Customer Managed Fuel)',
    category: 'self-drive',
    desc: 'Sunroof, Twin HD Displays, Level 2 ADAS safety, free doorstep handover.',
    text: `*MANA Tours & Travels — Self-Drive XUV 3XO Reservation*\n` +
      `----------------------------------------\n` +
      `🔑 *Car:* Mahindra XUV 3XO (Stealth Black Sunroof SUV)\n` +
      `💰 *Rental Rate:* ₹2,199/day (24 Hours)\n` +
      `🛡️ *Deposit:* ₹10,000 (100% Refundable) or Zero-Deposit VIP Scheme\n` +
      `📍 *Handover:* Free Doorstep Delivery in Kadapa\n` +
      `📋 *Requirement:* Valid DL + Aadhaar card\n\n` +
      `Complete quick KYC pass online: https://www.manatoursandtravels.com/self-drive-kyc`,
  },
  {
    id: 'hyderabad-air',
    title: 'Hyderabad RGIA Airport (Shamshabad)',
    rate: '₹5,499',
    unit: 'Fixed Express Highway Drop',
    category: 'airport-transfers',
    desc: 'Smooth Kurnool highway corridor, express airport drop.',
    text: `*MANA Tours & Travels — Hyderabad RGIA Airport Drop*\n` +
      `----------------------------------------\n` +
      `✈️ *Destination:* Rajiv Gandhi International Airport (RGIA)\n` +
      `💰 *Fixed Tariff:* ₹5,499 (Sedan AC)\n` +
      `🚗 *Vehicle:* Premium Highway Cruiser\n` +
      `⏱️ Express non-stop transit via Kurnool NH44.\n\n` +
      `Shall we block this vehicle for your flight schedule?`,
  },
];

export default function WhatsAppCrmHub() {
  const [waState, setWaState] = useState({
    status: 'DISCONNECTED',
    pairedPhone: '+91 99083 00718',
    autoPilot: true,
    qrDataUrl: null,
    stats: {
      totalChats: 28,
      autoQuotesSent: 46,
      leadsCaptured: 19,
      paymentRequestsSent: 12,
    },
  });

  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [messageText, setMessageText] = useState('');
  const [customAdvance, setCustomAdvance] = useState('500');
  const [showAdvanceDropdown, setShowAdvanceDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace' | 'catalogue' | 'simulator'
  const [simulatedText, setSimulatedText] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [pairingMode, setPairingMode] = useState('code'); // 'code' | 'qr'
  const [copiedCode, setCopiedCode] = useState(false);

  // 1. Fetch State & Chats
  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/whatsapp/status');
      const data = await res.json();
      if (data.success && data.state) {
        setWaState(data.state);
      }
    } catch (e) {
      console.error('Failed to fetch WA status:', e);
    }
  };

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/whatsapp/chats');
      const data = await res.json();
      if (data.success && Array.isArray(data.chats)) {
        setChats(data.chats);
        if (!selectedChatId && data.chats.length > 0) {
          setSelectedChatId(data.chats[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to fetch WA chats:', e);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchChats();

    // Live background polling every 5 seconds
    const interval = setInterval(() => {
      fetchStatus();
      fetchChats();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 2. Filtered Chats
  const filteredChats = useMemo(() => {
    return chats.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        (c.route && c.route.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        filterCategory === 'all' ||
        c.category === filterCategory ||
        (filterCategory === 'pending' && c.status.toLowerCase().includes('pending'));

      return matchesSearch && matchesCategory;
    });
  }, [chats, searchQuery, filterCategory]);

  const activeChat = useMemo(() => {
    return chats.find((c) => c.id === selectedChatId) || chats[0] || null;
  }, [chats, selectedChatId]);

  // 3. Actions
  const handleToggleAutoPilot = async () => {
    try {
      const res = await fetch('/api/whatsapp/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-autopilot' }),
      });
      const data = await res.json();
      if (data.success) {
        setWaState(data.state);
        showFeedback(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (customPayload = null) => {
    if (!activeChat) return;
    const textToSend = customPayload || messageText.trim();
    if (!textToSend) return;

    try {
      const res = await fetch('/api/whatsapp/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-manual-message',
          payload: {
            toPhone: activeChat.phone,
            customerName: activeChat.name,
            text: textToSend,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (!customPayload) setMessageText('');
        fetchChats();
        showFeedback('Message dispatched to customer!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequestUpi = async (amount) => {
    if (!activeChat) return;
    try {
      const res = await fetch('/api/whatsapp/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-upi-request',
          payload: {
            toPhone: activeChat.phone,
            customerName: activeChat.name,
            amount: Number(amount) || 500,
            serviceNote: activeChat.route || 'Booking Advance',
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAdvanceDropdown(false);
        fetchChats();
        showFeedback(`UPI Request for ₹${amount} sent to ${activeChat.phone}!`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSimulateInbound = async () => {
    if (!simulatedText.trim()) return;
    setIsSimulating(true);
    setSimulatedResult(null);

    try {
      const res = await fetch('/api/whatsapp/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'simulate-inbound',
          payload: {
            phone: '+91 94943 01844',
            name: 'Srikanth Naidu',
            messageText: simulatedText,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSimulatedResult(data.result);
        fetchChats();
        fetchStatus();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  return (
    <div className={styles.hubContainer}>
      {/* 1. TOP BAR & CONNECTION TELEMETRY */}
      <div className={styles.topBar}>
        <div className={styles.deviceInfo}>
          <div className={styles.deviceIcon}>💬</div>
          <div className={styles.deviceMeta}>
            <div className={styles.deviceTitle}>
              GoWhats Automation Hub
              <span className={styles.phonePill}>+91 99083 00718</span>
            </div>
            <div className={styles.connectionStatus}>
              {waState.status === 'CONNECTED' ? (
                <>
                  <span className={styles.dotOnline}></span>
                  <span style={{ color: '#10B981' }}>Companion Device Online & Listening</span>
                </>
              ) : (waState.status === 'WAITING_FOR_PAIRING_CODE' || waState.status === 'WAITING_FOR_QR') ? (
                <>
                  <span className={styles.dotWaiting}></span>
                  <span style={{ color: '#F59E0B' }}>Action Required: Link Phone with 8-Digit Code</span>
                </>
              ) : (
                <>
                  <span className={styles.dotOnline}></span>
                  <span style={{ color: '#94A3B8' }}>Gateway Standby (Run: npm run wa:gateway)</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.topActions}>
          {/* AutoPilot Switch */}
          <div
            className={styles.autoPilotToggle}
            onClick={handleToggleAutoPilot}
            title="When active, AI automatically responds to customer inquiries in Telugu & English with instant quotes."
          >
            <span className={styles.toggleLabel}>
              {waState.autoPilot ? '🤖 AI Auto-Pilot: ON' : '👤 Staff Manual: ON'}
            </span>
            <div className={`${styles.switch} ${waState.autoPilot ? styles.switchOn : ''}`}>
              <div className={`${styles.knob} ${waState.autoPilot ? styles.knobOn : ''}`}></div>
            </div>
          </div>

          <button
            className={styles.btnSecondary}
            onClick={() => setActiveTab(activeTab === 'simulator' ? 'workspace' : 'simulator')}
          >
            🧪 Test AI Inbound
          </button>

          <button
            className={styles.btnSecondary}
            onClick={() => setActiveTab(activeTab === 'catalogue' ? 'workspace' : 'catalogue')}
          >
            📦 Package Brochure
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10B981',
          color: '#10B981',
          padding: '10px 16px',
          borderRadius: 'var(--r-lg)',
          fontSize: '0.85rem',
          fontWeight: 700,
          textAlign: 'center'
        }}>
          {feedbackMsg}
        </div>
      )}

      {/* 2. KPI TELEMETRY STRIP */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Inbound Chats</div>
          <div className={styles.metricValRow}>
            <div className={styles.metricVal}>{waState.stats?.totalChats || 28}</div>
            <div className={styles.metricTrend}>↑ Active</div>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>AI Quotes Dispatched</div>
          <div className={styles.metricValRow}>
            <div className={styles.metricVal}>{waState.stats?.autoQuotesSent || 46}</div>
            <div className={styles.metricTrend}>100% Instant</div>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>CRM Leads Captured</div>
          <div className={styles.metricValRow}>
            <div className={styles.metricVal}>{waState.stats?.leadsCaptured || 19}</div>
            <div className={styles.metricTrend}>Kadapa & Rayalaseema</div>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>UPI Advance Requests</div>
          <div className={styles.metricValRow}>
            <div className={styles.metricVal}>{waState.stats?.paymentRequestsSent || 12}</div>
            <div className={styles.metricTrend}>9908300718@upi</div>
          </div>
        </div>
      </div>

      {/* 3. PAIRING CARD (Supports 8-Digit Code for Camera Issues + QR Code) */}
      {(waState.status === 'WAITING_FOR_PAIRING_CODE' || waState.status === 'WAITING_FOR_QR' || (!waState.status || waState.status === 'DISCONNECTED')) && (
        <>
          {pairingMode === 'code' ? (
            <div className={styles.pairingCard}>
              <div className={styles.pairingHeader}>
                <div>
                  <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                    🔑 Link WhatsApp with Phone Number (No Camera Needed)
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.84rem', margin: '4px 0 0 0' }}>
                    Due to mobile camera blur or hardware issues, link your phone directly using an official 8-digit OTP pairing code.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className={styles.pairingBadge}>✨ Camera-Free Pairing</span>
                  {waState.qrDataUrl && (
                    <button
                      className={styles.btnSecondary}
                      onClick={() => setPairingMode('qr')}
                      style={{ fontSize: '0.74rem' }}
                    >
                      📷 Use QR Scan Instead
                    </button>
                  )}
                </div>
              </div>

              {/* Code Display Row */}
              <div className={styles.codeDisplayRow}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em' }}>
                    Your 8-Digit Pairing Code for +91 99083 00718
                  </div>
                  <div className={styles.codeDigits}>
                    {waState.pairingCode || 'WAIT-PAIR'}
                  </div>
                </div>

                <button
                  className={styles.copyCodeBtn}
                  onClick={() => {
                    const codeOnly = (waState.pairingCode || 'WAITPAIR').replace('-', '');
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(codeOnly);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 3000);
                    }
                  }}
                >
                  {copiedCode ? 'Copied Code! ✅' : '📋 Copy 8-Digit Code'}
                </button>
              </div>

              {/* 4 Steps Instructions */}
              <div className={styles.qrInstructions}>
                <div style={{ fontWeight: 800, color: 'var(--brass)', fontSize: '0.86rem' }}>
                  📱 How to enter this code on your mobile (+91 99083 00718):
                </div>
                <div className={styles.qrSteps}>
                  <div className={styles.qrStepItem}>
                    <span className={styles.stepNum}>1</span>
                    <span>Open <strong>WhatsApp</strong> on your mobile phone (+91 99083 00718)</span>
                  </div>
                  <div className={styles.qrStepItem}>
                    <span className={styles.stepNum}>2</span>
                    <span>Tap <strong>Settings</strong> (iPhone) or <strong>Three Dots ⋮</strong> (Android) &gt; <strong>Linked Devices</strong></span>
                  </div>
                  <div className={styles.qrStepItem}>
                    <span className={styles.stepNum}>3</span>
                    <span>
                      Tap <strong>Link a Device</strong>, then at the bottom of the camera screen tap:{' '}
                      <strong style={{ color: 'var(--brass-light)' }}>"Link with phone number instead"</strong>
                    </span>
                  </div>
                  <div className={styles.qrStepItem}>
                    <span className={styles.stepNum}>4</span>
                    <span>Type the code <strong style={{ color: '#10B981', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{waState.pairingCode || 'WAIT-PAIR'}</strong> on your phone. Done!</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.qrCard}>
              <div className={styles.qrImageWrap}>
                {waState.qrDataUrl ? (
                  <img src={waState.qrDataUrl} alt="WhatsApp QR Code" className={styles.qrImage} />
                ) : (
                  <div style={{ padding: '40px', color: '#000', fontWeight: 700 }}>Loading QR...</div>
                )}
              </div>
              <div className={styles.qrInstructions}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={styles.qrTitle}>Scan QR Code with Camera</div>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => setPairingMode('code')}
                    style={{ fontSize: '0.74rem' }}
                  >
                    🔑 Link with Phone Number (No Camera)
                  </button>
                </div>
                <div className={styles.qrDesc}>
                  Point your camera at this QR code from WhatsApp &gt; Linked Devices.
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 4. TAB VIEWS */}
      {activeTab === 'simulator' && (
        <div className={styles.simBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '0.98rem' }}>
              🧪 Live AI Booking Engine Simulator (Telugu & English)
            </h4>
            <button className={styles.btnSecondary} onClick={() => setActiveTab('workspace')}>
              ✕ Back to Chats
            </button>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: 0 }}>
            Type any sample customer query below to test language detection, route parsing, vehicle pricing, and Telugu/English auto-replies:
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="e.g. కడప నుండి తిరుపతి క్రిస్టా రేట్ ఎంతండి? OR Need self-drive car for 2 days in Kadapa"
              value={simulatedText}
              onChange={(e) => setSimulatedText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSimulateInbound()}
            />
            <button
              className={styles.sendBtn}
              onClick={handleSimulateInbound}
              disabled={isSimulating}
            >
              {isSimulating ? 'Processing...' : 'Test Inbound'}
            </button>
          </div>

          {/* Preset test buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              className={styles.chip}
              onClick={() => setSimulatedText('కడప నుండి తిరుపతి క్రిస్టా రేట్ ఎంతండి?')}
            >
              🇮🇳 Telugu: Kadapa to Tirupati Crysta
            </button>
            <button
              className={styles.chip}
              onClick={() => setSimulatedText('Need self-drive Mahindra XUV 3XO for weekend in Kadapa')}
            >
              🔑 English: Self-Drive XUV 3XO
            </button>
            <button
              className={styles.chip}
              onClick={() => setSimulatedText('Gandikota and Belum caves full day package fare with sedan')}
            >
              🏔️ English: Gandikota Package
            </button>
            <button
              className={styles.chip}
              onClick={() => setSimulatedText('Send UPI QR code for ₹500 booking advance')}
            >
              💳 Payment: UPI Request
            </button>
          </div>

          {simulatedResult && (
            <div style={{
              background: 'rgba(7, 9, 14, 0.9)',
              border: '1px solid rgba(229, 192, 123, 0.4)',
              borderRadius: 'var(--r-lg)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--brass)' }}>
                <span><strong>Category:</strong> {simulatedResult.quote?.serviceCategory}</span>
                <span><strong>Est. Base Fare:</strong> ₹{simulatedResult.quote?.estimatedFare?.toLocaleString('en-IN')}</span>
                <span><strong>Route:</strong> {simulatedResult.quote?.routeLabel}</span>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '10px 14px',
                borderRadius: 'var(--r-md)',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                whiteSpace: 'pre-line',
                lineHeight: 1.5
              }}>
                {simulatedResult.replyText}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'catalogue' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.05rem' }}>
              📦 Tour Packages & Quick Dispatch Brochure
            </h4>
            <button className={styles.btnSecondary} onClick={() => setActiveTab('workspace')}>
              ✕ Back to Chats
            </button>
          </div>
          <div className={styles.catalogueGrid}>
            {CATALOGUE_PACKAGES.map((pkg) => (
              <div key={pkg.id} className={styles.catalogueCard}>
                <div className={styles.catTitle}>{pkg.title}</div>
                <div className={styles.catRate}>{pkg.rate} <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>({pkg.unit})</span></div>
                <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>{pkg.desc}</div>
                <button
                  className={styles.catBtn}
                  onClick={() => {
                    handleSendMessage(pkg.text);
                    setActiveTab('workspace');
                  }}
                >
                  ⚡ Send to Active Customer ({activeChat?.name || 'Guest'})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TWO-COLUMN CRM WORKSPACE */}
      {activeTab === 'workspace' && (
        <div className={styles.workspace}>
          {/* Left Column: Chats & Inquiries */}
          <div className={styles.leftCol}>
            <div className={styles.searchHeader}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search customers, phones, or routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className={styles.filterChips}>
                <button
                  className={`${styles.chip} ${filterCategory === 'all' ? styles.chipActive : ''}`}
                  onClick={() => setFilterCategory('all')}
                >
                  All ({chats.length})
                </button>
                <button
                  className={`${styles.chip} ${filterCategory === 'self-drive' ? styles.chipActive : ''}`}
                  onClick={() => setFilterCategory('self-drive')}
                >
                  Self-Drive
                </button>
                <button
                  className={`${styles.chip} ${filterCategory === 'pilgrimage' ? styles.chipActive : ''}`}
                  onClick={() => setFilterCategory('pilgrimage')}
                >
                  Tirupati / Srisailam
                </button>
                <button
                  className={`${styles.chip} ${filterCategory === 'tour-packages' ? styles.chipActive : ''}`}
                  onClick={() => setFilterCategory('tour-packages')}
                >
                  Gandikota
                </button>
                <button
                  className={`${styles.chip} ${filterCategory === 'pending' ? styles.chipActive : ''}`}
                  onClick={() => setFilterCategory('pending')}
                >
                  Advance Pending
                </button>
              </div>
            </div>

            <div className={styles.chatList}>
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${chat.id === activeChat?.id ? styles.chatItemActive : ''}`}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <div className={styles.chatItemTop}>
                    <span className={styles.chatName}>{chat.name}</span>
                    <span className={styles.chatTime}>{chat.lastMessageTime}</span>
                  </div>
                  <div className={styles.chatRoute}>{chat.route}</div>
                  <div className={styles.chatPreview}>{chat.lastMessage}</div>
                  <div className={styles.chatBottom}>
                    <span className={`${styles.badgeStatus} ${
                      chat.status === 'Advance Paid' || chat.status === 'Confirmed'
                        ? styles.badgePaid
                        : chat.status.includes('Due') || chat.status.includes('Pending')
                        ? styles.badgeFollowup
                        : ''
                    }`}>
                      {chat.status}
                    </span>
                    {chat.estimatedFare && (
                      <span style={{ fontSize: '0.74rem', color: 'var(--brass)', fontWeight: 800 }}>
                        ₹{chat.estimatedFare.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Chat Inspector & Controls */}
          {activeChat ? (
            <div className={styles.rightCol}>
              {/* Customer Header */}
              <div className={styles.chatHeader}>
                <div className={styles.headerLeft}>
                  <div className={styles.avatar}>{activeChat.name.charAt(0)}</div>
                  <div className={styles.headerMeta}>
                    <div className={styles.customerName}>
                      {activeChat.name} · <span style={{ color: 'var(--brass)', fontSize: '0.84rem' }}>{activeChat.route}</span>
                    </div>
                    <div className={styles.customerPhone}>
                      {activeChat.phone} · Preferred: {activeChat.vehicle}
                    </div>
                  </div>
                </div>

                <div className={styles.headerActions}>
                  <a
                    href={`https://wa.me/${activeChat.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.btnAction}
                    title="Open directly in phone WhatsApp"
                  >
                    ↗ WhatsApp
                  </a>

                  <div style={{ position: 'relative' }}>
                    <button
                      className={`${styles.btnAction} ${styles.btnActionPrimary}`}
                      onClick={() => setShowAdvanceDropdown(!showAdvanceDropdown)}
                    >
                      💳 Request Advance UPI ▾
                    </button>
                    {showAdvanceDropdown && (
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '110%',
                        background: '#0B0F17',
                        border: '1px solid var(--brass)',
                        borderRadius: 'var(--r-lg)',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        zIndex: 20,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.8)',
                        width: '180px'
                      }}>
                        <button className={styles.btnAction} onClick={() => handleRequestUpi(500)}>
                          ₹500 (Cab / Local)
                        </button>
                        <button className={styles.btnAction} onClick={() => handleRequestUpi(1000)}>
                          ₹1,000 (Outstation)
                        </button>
                        <button className={styles.btnAction} onClick={() => handleRequestUpi(2000)}>
                          ₹2,000 (Tour / Self-Drive)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Messages Transcript */}
              <div className={styles.chatMessages}>
                {activeChat.messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.msgRow} ${
                      msg.sender === 'customer' ? styles.msgRowCustomer : styles.msgRowAgent
                    }`}
                  >
                    <div
                      className={`${styles.bubble} ${
                        msg.sender === 'customer' ? styles.bubbleCustomer : styles.bubbleAgent
                      }`}
                    >
                      <div style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: msg.sender === 'customer' ? '#94A3B8' : 'var(--brass-light)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {msg.sender === 'customer' ? activeChat.name : 'MANA AI Concierge'}
                      </div>
                      <div>{msg.text}</div>
                      <span className={styles.bubbleTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Pill Bar */}
              <div className={styles.quickActionsRow}>
                <button
                  className={styles.quickPill}
                  onClick={() => handleSendMessage(
                    `Namaste ${activeChat.name}! Are you still planning your trip for ${activeChat.route}? Our clean AC vehicle is reserved for your dates.`
                  )}
                >
                  ⏰ 2-Hour Follow-Up Check-in
                </button>
                <button
                  className={styles.quickPill}
                  onClick={() => handleSendMessage(
                    `*MANA Tours & Travels — Booking Confirmation*\nYour trip for ${activeChat.route} is confirmed! Chauffeur name and car number will be shared 2 hours before pickup.`
                  )}
                >
                  ✅ Send Trip Confirmation
                </button>
                <button
                  className={styles.quickPill}
                  onClick={() => handleSendMessage(
                    `*Self-Drive Instant KYC Pass:* Please upload your driving license & Aadhaar card in 2 minutes: https://www.manatoursandtravels.com/self-drive-kyc`
                  )}
                >
                  🔑 Send Digital KYC Link
                </button>
              </div>

              {/* Manual Reply Input */}
              <div className={styles.inputBar}>
                <textarea
                  className={styles.chatTextarea}
                  placeholder={`Reply directly to ${activeChat.name} via WhatsApp...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button className={styles.sendBtn} onClick={() => handleSendMessage()}>
                  Send ➔
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              fontSize: '0.9rem'
            }}>
              Select a conversation to view chat and manage booking
            </div>
          )}
        </div>
      )}
    </div>
  );
}
