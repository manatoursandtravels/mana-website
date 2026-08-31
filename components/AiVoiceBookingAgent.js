'use client';

import { useState, useEffect, useRef, useId } from 'react';
import Link from 'next/link';
import styles from './AiVoiceBookingAgent.module.css';
import { BUSINESS } from '@/lib/constants';

/* ── Modern Vector SVGs ── */
function AiSparkleWaveIcon({ size = 20, active = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={active ? styles.sparkleActive : ''}
      aria-hidden="true"
    >
      <path
        d="M12 2L14.2 8.3L20.5 10.5L14.2 12.7L12 19L9.8 12.7L3.5 10.5L9.8 8.3L12 2Z"
        fill="url(#sparkleGrad)"
      />
      <path
        d="M19 16L20.1 19.1L23.2 20.2L20.1 21.3L19 24.4L17.9 21.3L14.8 20.2L17.9 19.1L19 16Z"
        fill="url(#goldGrad)"
        opacity="0.85"
      />
      <path
        d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z"
        fill="url(#cyanGrad)"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="sparkleGrad" x1="3.5" y1="2" x2="20.5" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#818CF8" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="14.8" y1="16" x2="23.2" y2="24.4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="cyanGrad" x1="2" y1="16" x2="8" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ModernMicIcon({ size = 22, isRecording = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="9"
        y="2"
        width="6"
        height="12"
        rx="3"
        fill={isRecording ? '#EF4444' : 'currentColor'}
      />
      <path
        d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
        stroke={isRecording ? '#EF4444' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 18V22M8 22H16"
        stroke={isRecording ? '#EF4444' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SendPlaneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.77 14.07c-.24.67-1.39 1.29-1.93 1.34-.5.05-1.12.08-3.62-.95-2.87-1.18-4.73-4.11-4.88-4.3-.14-.19-1.16-1.54-1.16-2.93 0-1.39.73-2.07 1-2.35.26-.29.58-.36.77-.36.2 0 .39.01.56.02.18.01.42-.07.66.5.24.58.83 2.02.9 2.16.07.14.12.31.02.5-.09.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.15-.29.31-.13.58.17.29.74 1.22 1.6 1.98 1.1 1 2.03 1.31 2.32 1.45.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.14.26.1 1.68.79 1.97.94.29.14.48.22.56.34.07.12.07.72-.17 1.39z" />
    </svg>
  );
}

const INITIAL_MESSAGES = {
  te: {
    text: 'నమస్కారం! నేను MANA AI అసిస్టెంట్‌ని. తిరుపతి దర్శనం, సెల్ఫ్ డ్రైవ్ కార్లు, ఎయిర్‌పోర్ట్ క్యాబ్‌లు, లేదా గండికోట టూర్స్ గురించి మైక్రోఫోన్ నొక్కి మాట్లాడండి లేదా కింద ఉన్న సేవలపై క్లిక్ చేయండి.',
    role: 'bot',
  },
  en: {
    text: 'Namaste! I am your MANA AI Concierge. Speak or type to explore Self-Drive cars, Tirupati Darshan, Airport transfers, or Gandikota tours. How can we assist your travel today?',
    role: 'bot',
  },
  hi: {
    text: 'नमस्ते! मैं आपका MANA AI बुकिंग असिस्टेंट हूँ। तिरुपति दर्शन, सेल्फ़-ड्राइव कार या एयरपोर्ट कैब के लिए बोलें या टाइप करें।',
    role: 'bot',
  },
};

const SERVICE_DISCOVERY_TABS = [
  { id: 'selfdrive', icon: '🔑', label: 'Self-Drive Cars', prompt: 'Tell me about self drive car rentals in Kadapa, pricing and KYC requirements' },
  { id: 'tirupati', icon: '🛕', label: 'Tirupati Pilgrimage', prompt: 'Kadapa to Tirupati round trip Balaji darshan cab packages' },
  { id: 'airport', icon: '✈️', label: 'Airport Drops', prompt: 'Fixed airport cabs to Bangalore BLR and Hyderabad RGIA airports' },
  { id: 'outstation', icon: '🛣️', label: 'Outstation Cabs', prompt: 'Outstation cabs from Kadapa to Hyderabad, Bangalore and Chennai' },
  { id: 'gandikota', icon: '🏞️', label: 'Gandikota Tour', prompt: 'Gandikota Grand Canyon and Belum Caves day trip packages' },
  { id: 'local', icon: '🚗', label: 'Local City Cabs', prompt: 'Local 4 hours 40 km and 8 hours 80 km hourly packages in Kadapa' },
  { id: 'usedcars', icon: '🚙', label: 'Used Cars Kadapa', prompt: 'Certified used cars for sale in Kadapa with warranty and inspection' },
  { id: 'partner', icon: '🤝', label: 'Attach Vehicle', prompt: 'How to attach my commercial car to MANA Travels and earn 70% revenue share' },
];

const GUIDED_REQUIREMENTS_CHIPS = [
  { label: '🌅 Early Morning 3 AM', append: 'for early morning 3 AM pickup' },
  { label: '👨‍👩‍👧‍👦 7-Seater Ertiga MPV', append: 'in Maruti Ertiga 7-seater' },
  { label: '👑 Innova Crysta Luxury', append: 'in Toyota Innova Crysta luxury MPV' },
  { label: '🔄 Round Trip + Wait', append: 'same day round trip with waiting time' },
  { label: '🎁 Check Active Offers', append: 'what are the current discounts and offers available?' },
];

export default function AiVoiceBookingAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'te' | 'en' | 'hi'
  const [messages, setMessages] = useState([INITIAL_MESSAGES.en]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  // Progressive Lock & Phone Capture State
  const [activeLockIndex, setActiveLockIndex] = useState(null);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPickup, setCustomerPickup] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [confirmedVouchers, setConfirmedVouchers] = useState({});

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Load Returning Customer Memory from localStorage
  useEffect(() => {
    try {
      const savedPhone = localStorage.getItem('mana_customer_phone');
      const savedName = localStorage.getItem('mana_customer_name');
      const savedPickup = localStorage.getItem('mana_customer_pickup');

      if (savedPhone) setCustomerPhone(savedPhone);
      if (savedName) setCustomerName(savedName);
      if (savedPickup) setCustomerPickup(savedPickup);

      if (savedPhone) {
        setMessages([
          {
            text: `Namaste${savedName ? ` ${savedName}` : ''}! Welcome back to MANA Tours & Travels. Your verified contact (+91 ${savedPhone.slice(-10)}) is linked. How can we assist your journey today?`,
            role: 'bot',
          },
        ]);
      }
    } catch {
      // Ignore localStorage in restricted environments
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, activeLockIndex]);

  // Global event listener to trigger AI assistant from anywhere on the site
  useEffect(() => {
    const handleOpenAi = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.prompt) {
        handleSendMessage(e.detail.prompt);
      }
    };
    window.addEventListener('open-mana-ai', handleOpenAi);
    return () => window.removeEventListener('open-mana-ai', handleOpenAi);
  }, []);

  // Lock body scroll on mobile when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Update initial message when language toggles if only 1 message exists
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (messages.length === 1 && messages[0].role === 'bot') {
      setMessages([INITIAL_MESSAGES[lang]]);
    }
  };

  // 2. Web Speech API Recognition
  const startRecording = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. You can type your query in the box below!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('[Speech Recognition Error]:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('[Speech Init Error]:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // 3. Send Message to AI Backend API
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setInputText('');

    // Add user message
    const newMessages = [...messages, { text: query, role: 'user' }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/booking-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          language,
          phone: customerPhone,
          name: customerName,
        }),
      });

      const data = await response.json();

      if (data.success && data.quote) {
        const botResponseText =
          language === 'te'
            ? data.quote.translations.te || data.quote.primaryResponse
            : language === 'hi'
            ? data.quote.translations.hi || data.quote.primaryResponse
            : data.quote.translations.en || data.quote.primaryResponse;

        setMessages((prev) => [
          ...prev,
          {
            text: botResponseText,
            role: 'bot',
            quote: data.quote,
          },
        ]);

        // Auto TTS if user spoke via voice
        if (isRecording) {
          playTts(botResponseText, language);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: 'I could not retrieve exact pricing for this route. Call Jyothi & Pavan directly at +91 99083 00718 for instant custom quotes.',
            role: 'bot',
          },
        ]);
      }
    } catch (err) {
      console.error('[AI Assistant Error]:', err);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Unable to connect right now. Please call our 24/7 desk at +91 99083 00718.',
          role: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Handle Progressive Lock & Dual CRM/WhatsApp Dispatch
  const handleConfirmLockAndDispatch = async (quote, messageIndex) => {
    const rawDigits = customerPhone.replace(/\D/g, '').slice(-10);
    if (!rawDigits || rawDigits.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp phone number to receive your quote slip.');
      return;
    }

    setIsSubmittingBooking(true);
    const voucherId = `MANA-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      localStorage.setItem('mana_customer_phone', rawDigits);
      if (customerName) localStorage.setItem('mana_customer_name', customerName);
      if (customerPickup) localStorage.setItem('mana_customer_pickup', customerPickup);

      // Log Lead to CRM
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName || 'AI Verified Customer',
          phone: `+91 ${rawDigits}`,
          service: quote.serviceCategory || (quote.isSelfDrive ? 'Self Drive' : 'Outstation / Pilgrimage'),
          tripType: quote.tripType,
          vehicleChoice: quote.vehicle.name,
          pickup: customerPickup || 'Kadapa Doorstep / Hub',
          destination: quote.destination,
          travelDate: quote.timeNote || 'Immediate / Flexible',
          passengers: String(quote.passengers),
          notes: `🎫 Enquiry #${voucherId} | Route: ${quote.routeLabel} | Est Fare: ₹${quote.estimatedFare}`,
          estimatedPrice: `₹${quote.estimatedFare}`,
          sourceUrl: 'AI Assistant Concierge',
        }),
      });

      // Construct enriched WhatsApp payload
      const waLines = [
        `*MANA Tours & Travels — AI Trip Booking Slip*`,
        `----------------------------------------`,
        `🎫 *Enquiry Ref:* #${voucherId}`,
        `👤 *Customer Name:* ${customerName || 'Verified Traveler'}`,
        `📞 *WhatsApp:* +91 ${rawDigits}`,
        `📍 *Route / Service:* ${quote.routeLabel}`,
        `🚗 *Vehicle Requested:* ${quote.vehicle.name} (${quote.vehicle.seats})`,
        `📋 *Trip Plan:* ${quote.tripType}`,
        `👥 *Party Size:* ${quote.passengers} Persons`,
        customerPickup ? `🏠 *Pickup Point:* ${customerPickup}` : null,
        quote.timeNote ? `⏰ *Requested Timing:* ${quote.timeNote}` : null,
        quote.estimatedFare > 0 ? `💰 *Estimated Fare:* ₹${quote.estimatedFare.toLocaleString('en-IN')}` : null,
        `----------------------------------------`,
        `*Inclusions:* ${quote.inclusions.slice(0, 2).join(', ')}`,
        `*Status:* Please confirm car availability with Pavan & Jyothi!`,
      ].filter(Boolean);

      const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(waLines.join('\n'))}`;

      setConfirmedVouchers((prev) => ({
        ...prev,
        [messageIndex]: {
          voucherId,
          phone: rawDigits,
          waUrl,
        },
      }));

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('[Lock Fare Error]:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // 5. Speech synthesis audio playback
  const playTts = (text, lang) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* ── Sleek Modern Floating AI Launcher ── */}
      {!isOpen && (
        <button
          className={styles.floatingLauncher}
          onClick={() => setIsOpen(true)}
          aria-label="Open MANA AI Enquiry & Voice Assistant"
          id="mana-ai-launcher"
        >
          <div className={styles.launcherPulseRing} aria-hidden="true" />
          <div className={styles.launcherIconOrb}>
            <AiSparkleWaveIcon size={22} active={true} />
          </div>
          <div className={styles.launcherInfo}>
            <div className={styles.launcherTopRow}>
              <span className={styles.launcherBrand}>MANA AI Agent</span>
              <span className={styles.launcherLiveTag}>
                <span className={styles.livePulseDot} /> 24/7
              </span>
            </div>
            <span className={styles.launcherSub}>Voice &amp; Instant Quotes</span>
          </div>
        </button>
      )}

      {/* ── Modern Mobile-First Modal / Bottom Sheet ── */}
      {isOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="MANA AI Enquiry Assistant"
        >
          <div className={styles.modalCard}>
            {/* Mobile Drag / Pull Handle */}
            <div className={styles.sheetHandle} onClick={() => setIsOpen(false)}>
              <span className={styles.sheetBar} />
            </div>

            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.botAvatarOrb}>
                  <AiSparkleWaveIcon size={24} active={true} />
                </div>
                <div className={styles.headerTitles}>
                  <div className={styles.brandTitleRow}>
                    <h3>MANA AI Concierge</h3>
                    <span className={styles.badgeVerified}>Rayalaseema 24/7</span>
                  </div>
                  <p className={styles.headerSub}>Instant quotes for self-drive, temple tours &amp; outstation</p>
                </div>
              </div>

              <div className={styles.headerActions}>
                {/* Language Switcher */}
                <div className={styles.langPills}>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${language === 'te' ? styles.langBtnActive : ''}`}
                    onClick={() => handleLanguageChange('te')}
                    title="తెలుగులో మాట్లాడండి"
                  >
                    తెలుగు
                  </button>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${language === 'en' ? styles.langBtnActive : ''}`}
                    onClick={() => handleLanguageChange('en')}
                    title="Speak in English"
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${language === 'hi' ? styles.langBtnActive : ''}`}
                    onClick={() => handleLanguageChange('hi')}
                    title="हिंदी में पूछें"
                  >
                    HI
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Service Discovery Carousel (Quick Service Tabs) */}
            <div className={styles.serviceDiscoveryBar}>
              <div className={styles.serviceDiscoveryScroll}>
                {SERVICE_DISCOVERY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={styles.serviceTab}
                    onClick={() => handleSendMessage(tab.prompt)}
                  >
                    <span className={styles.serviceTabIcon}>{tab.icon}</span>
                    <span className={styles.serviceTabLabel}>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Scroll Container */}
            <div className={styles.messagesArea}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.messageBubble} ${msg.role === 'user' ? styles.messageUser : styles.messageBot}`}
                >
                  <div className={styles.bubbleContent}>
                    {msg.role === 'bot' && (
                      <div className={styles.botMiniBadge}>
                        <AiSparkleWaveIcon size={13} />
                        <span>MANA AI</span>
                      </div>
                    )}
                    <div className={styles.bubbleText}>{msg.text}</div>

                    {/* Listen Button for Bot Messages */}
                    {msg.role === 'bot' && (
                      <div className={styles.bubbleFooterRow}>
                        <button
                          type="button"
                          className={`${styles.listenBtn} ${speakingIndex === index ? styles.listeningActive : ''}`}
                          onClick={() => {
                            setSpeakingIndex(index);
                            playTts(msg.text, language);
                          }}
                        >
                          <SpeakerIcon size={14} />
                          <span>{speakingIndex === index ? 'Speaking...' : 'Listen Audio'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Interactive Quote / Guidance Card */}
                  {msg.quote && (
                    <div className={styles.quoteCard}>
                      <div className={styles.quoteHead}>
                        <div className={styles.quoteHeadLeft}>
                          <span className={styles.quoteRouteBadge}>📍 {msg.quote.routeLabel}</span>
                          <h4 className={styles.quoteVehicleTitle}>
                            {msg.quote.vehicle.icon} {msg.quote.vehicle.name}
                          </h4>
                        </div>
                        {msg.quote.estimatedFare > 0 && (
                          <div className={styles.quoteFareBadge}>
                            <span className={styles.fareSmallLabel}>
                              {msg.quote.isFixedTariff ? 'Standard Tariff' : 'Est. Base Starting From'}
                            </span>
                            <span className={styles.fareAmount}>
                              ₹{msg.quote.estimatedFare.toLocaleString('en-IN')}
                              {msg.quote.isFixedTariff ? '/day' : '+'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Transparent Pricing Disclaimer for Non-Self-Drive Services */}
                      {!msg.quote.isFixedTariff && msg.quote.estimatedFare > 0 && (
                        <div className={styles.variablePricingNotice}>
                          <span className={styles.variableNoticeIcon}>ℹ️</span>
                          <span>
                            <strong>Custom Quotation:</strong> Final price depends on your exact intermediate stops, toll charges, waiting time, and passenger requirements.
                          </span>
                        </div>
                      )}

                      {/* Promo Highlight */}
                      {msg.quote.promoApplicable && (
                        <div className={styles.promoHighlight}>
                          <span className={styles.promoIcon}>🎁</span>
                          <span>{msg.quote.promoMessage}</span>
                        </div>
                      )}

                      {/* Inclusions List */}
                      <div className={styles.inclusionsGrid}>
                        {msg.quote.inclusions.map((inc, i) => (
                          <span key={i} className={styles.inclusionPill}>
                            <span className={styles.checkIcon}>✓</span> {inc}
                          </span>
                        ))}
                      </div>

                      {/* Special Guidance (e.g. for Used Cars or Fleet Partner) */}
                      {msg.quote.specialGuidance && (
                        <div className={styles.guidanceBox}>
                          <div className={styles.guidanceTitle}>{msg.quote.specialGuidance.title}</div>
                          <ul className={styles.guidanceList}>
                            {msg.quote.specialGuidance.points.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                          {msg.quote.specialGuidance.actionUrl && (
                            <Link
                              href={msg.quote.specialGuidance.actionUrl}
                              className={styles.guidanceActionLink}
                              onClick={() => setIsOpen(false)}
                            >
                              ➔ {msg.quote.specialGuidance.actionLabel}
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Stage 1: Initial Action CTA */}
                      {activeLockIndex !== index && !confirmedVouchers[index] && (
                        <button
                          type="button"
                          className={styles.lockCtaBtn}
                          onClick={() => setActiveLockIndex(index)}
                        >
                          <WhatsAppIcon size={18} />
                          <span>
                            {msg.quote.isFixedTariff
                              ? `Lock ₹${msg.quote.estimatedFare.toLocaleString('en-IN')} & Book on WhatsApp`
                              : msg.quote.estimatedFare > 0
                              ? `Request Custom Quote (From ₹${msg.quote.estimatedFare.toLocaleString('en-IN')}) on WhatsApp`
                              : 'Connect with Desk on WhatsApp'}
                          </span>
                        </button>
                      )}

                      {/* Stage 2: Progressive Phone / Details Form */}
                      {activeLockIndex === index && !confirmedVouchers[index] && (
                        <div className={styles.dispatchFormWrap}>
                          <div className={styles.dispatchFormTitle}>
                            <span>
                              {msg.quote.isFixedTariff
                                ? '🔒 Reserve Self-Drive & Get Handover Slip'
                                : '📋 Submit Details for Exact Custom Quotation'}
                            </span>
                          </div>

                          <div className={styles.inputGroupPhone}>
                            <span className={styles.phoneFlag}>🇮🇳 +91</span>
                            <input
                              type="tel"
                              className={styles.phoneInputField}
                              placeholder="Enter 10-digit WhatsApp Number"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              maxLength={10}
                              autoFocus
                            />
                          </div>

                          <div className={styles.formRowTwo}>
                            <input
                              type="text"
                              className={styles.formFieldSub}
                              placeholder="Your Name (Optional)"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <input
                              type="text"
                              className={styles.formFieldSub}
                              placeholder="Pickup Point (e.g. Bus Stand / Home)"
                              value={customerPickup}
                              onChange={(e) => setCustomerPickup(e.target.value)}
                            />
                          </div>

                          <div className={styles.trustNoteRow}>
                            <span>
                              {msg.quote.isFixedTariff
                                ? '✓ Upfront locked rate · Fast 2-min KYC on WhatsApp'
                                : '✓ Pavan & Jyothi will review your stops & tolls to share the exact final quote'}
                            </span>
                          </div>

                          <div className={styles.dispatchButtonRow}>
                            <button
                              type="button"
                              className={styles.submitDispatchBtn}
                              onClick={() => handleConfirmLockAndDispatch(msg.quote, index)}
                              disabled={isSubmittingBooking}
                            >
                              <WhatsAppIcon size={18} />
                              <span>
                                {isSubmittingBooking
                                  ? 'Submitting...'
                                  : msg.quote.isFixedTariff
                                  ? 'Confirm & Open WhatsApp'
                                  : 'Get Custom Quote on WhatsApp'}
                              </span>
                            </button>
                            <button
                              type="button"
                              className={styles.cancelDispatchBtn}
                              onClick={() => setActiveLockIndex(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Stage 3: Confirmed Voucher Slip */}
                      {confirmedVouchers[index] && (
                        <div className={styles.confirmedSlip}>
                          <div className={styles.slipHeader}>
                            <span className={styles.slipBadge}>
                              {msg.quote.isFixedTariff ? '✓ Trip Reserved' : '✓ Custom Quote Requested'}
                            </span>
                            <span className={styles.slipId}>#{confirmedVouchers[index].voucherId}</span>
                          </div>
                          <p className={styles.slipText}>
                            {msg.quote.isFixedTariff
                              ? `Enquiry dispatched! Jyothi & Pavan are connecting with you on WhatsApp (+91 ${confirmedVouchers[index].phone}).`
                              : `Trip details received! Pavan & Jyothi are reviewing your route, tolls, and duration to share your exact custom quotation on WhatsApp (+91 ${confirmedVouchers[index].phone}).`}
                          </p>
                          <a
                            href={confirmedVouchers[index].waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.reopenChatBtn}
                          >
                            <WhatsAppIcon size={16} /> Open WhatsApp Chat
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* AI Thinking Animation */}
              {isLoading && (
                <div className={`${styles.messageBubble} ${styles.messageBot}`}>
                  <div className={styles.bubbleContent}>
                    <div className={styles.botMiniBadge}>
                      <AiSparkleWaveIcon size={13} active={true} />
                      <span>MANA AI</span>
                    </div>
                    <div className={styles.thinkingContainer}>
                      <span>Analyzing fleet &amp; finding best rate</span>
                      <div className={styles.waveVisualizer}>
                        <span className={styles.waveBar} />
                        <span className={styles.waveBar} />
                        <span className={styles.waveBar} />
                        <span className={styles.waveBar} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Requirement Clarification Pills */}
            <div className={styles.requirementsPillBar}>
              <span className={styles.requirementsLabel}>Add details:</span>
              <div className={styles.requirementsScroll}>
                {GUIDED_REQUIREMENTS_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.reqChip}
                    onClick={() => {
                      const newPrompt = inputText ? `${inputText} ${chip.append}` : `I need a cab ${chip.append}`;
                      setInputText(newPrompt);
                      inputRef.current?.focus();
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Voice Listening Banner */}
            {isRecording && (
              <div className={styles.activeVoiceBanner}>
                <div className={styles.voiceBannerLeft}>
                  <div className={styles.pulsingMicOrb}>
                    <ModernMicIcon size={20} isRecording={true} />
                  </div>
                  <div className={styles.voiceStatusText}>
                    <span className={styles.voiceStatusTitle}>
                      Listening ({language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिंदी' : 'English'})...
                    </span>
                    <span className={styles.voiceStatusSub}>Speak your destination or vehicle requirements</span>
                  </div>
                </div>

                <div className={styles.voiceBannerRight}>
                  <div className={styles.recordingWaves}>
                    <span className={styles.liveBar} />
                    <span className={styles.liveBar} />
                    <span className={styles.liveBar} />
                    <span className={styles.liveBar} />
                    <span className={styles.liveBar} />
                  </div>
                  <button type="button" className={styles.stopRecordingBtn} onClick={stopRecording}>
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Sticky Input Bar */}
            <form
              className={styles.bottomInputBar}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className={styles.mainInput}
                placeholder={
                  language === 'te'
                    ? 'ఎక్కడికి వెళ్లాలి? (ఉదా: తిరుపతి, హైదరాబాద్, సెల్ఫ్ డ్రైవ్)...'
                    : 'Where to? (e.g. Tirupati darshan, Bangalore airport, Self-Drive)...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />

              {/* Redesigned Voice / Mic Button */}
              <button
                type="button"
                className={`${styles.voiceMicBtn} ${isRecording ? styles.voiceMicBtnActive : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? 'Stop Recording' : 'Speak to MANA AI Assistant'}
                aria-label={isRecording ? 'Stop Voice Recording' : 'Start Voice Recording'}
              >
                {isRecording && <span className={styles.micPulseWave} aria-hidden="true" />}
                <ModernMicIcon size={22} isRecording={isRecording} />
              </button>

              {/* Send Button */}
              <button
                type="submit"
                className={styles.sendQueryBtn}
                disabled={!inputText.trim() || isLoading}
                aria-label="Send message"
              >
                <SendPlaneIcon size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
