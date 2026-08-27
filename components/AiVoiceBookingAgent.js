'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AiVoiceBookingAgent.module.css';
import { BUSINESS } from '@/lib/constants';

const INITIAL_MESSAGES = {
  te: {
    text: 'నమస్కారం! నేను MANA AI అసిస్టెంట్‌ని. తిరుపతి దర్శనం, సెల్ఫ్ డ్రైవ్ కార్లు, లేదా ఎయిర్‌పోర్ట్ క్యాబ్ బుకింగ్ కోసం మైక్రోఫోన్ నొక్కి మాట్లాడండి లేదా టైప్ చేయండి.',
    role: 'bot',
  },
  en: {
    text: 'Namaste! I am your MANA AI Booking Assistant. Speak or type your trip details (Tirupati darshan, Self-Drive, or Airport drops) for an instant guaranteed quote.',
    role: 'bot',
  },
  hi: {
    text: 'नमस्ते! मैं आपका MANA AI बुकिंग असिस्टेंट हूँ। तिरुपति दर्शन, सेल्फ़-ड्राइव कार या एयरपोर्ट कैब के लिए बोलें या टाइप करें।',
    role: 'bot',
  },
};

const QUICK_PROMPTS = [
  { label: '🛕 Tirupati Darshan Cab', prompt: 'Kadapa to Tirupati round trip cab for Balaji darshan in sedan' },
  { label: '✈️ Bangalore Airport Drop', prompt: 'Kadapa to Kempegowda Bangalore airport fixed drop' },
  { label: '🔑 Self-Drive 2-for-1 Offer', prompt: 'Self drive car for 2 days new customer offer' },
  { label: '🏞️ Gandikota Day Tour', prompt: 'Full day Gandikota and Belum Caves tour package' },
  { label: '🚐 7-Seater MPV Srisailam', prompt: 'Kadapa to Srisailam temple in Ertiga 7 seater' },
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
            text: `Namaste${savedName ? ` ${savedName}` : ''}! Welcome back to MANA Tours & Travels. Your WhatsApp (+91 ${savedPhone.slice(-10)}) is ready for 1-click booking. Where would you like to travel today?`,
            role: 'bot',
          },
        ]);
      }
    } catch {
      // Ignore localStorage errors in private browsing
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

  // Update initial message when language toggles if only 1 message exists
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (messages.length === 1 && messages[0].role === 'bot') {
      setMessages([INITIAL_MESSAGES[lang]]);
    }
  };

  // 2. Initialize Web Speech Recognition
  const startRecording = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please type your query.');
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

  // 3. Send Message to AI Backend API (Value-First, zero phone required)
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

        // Optional auto text-to-speech for voice inquiries
        if (isRecording) {
          playTts(botResponseText, language);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: 'I could not retrieve an exact quote for this route. You can contact Pavan directly at +91 99083 00718 for custom itineraries.',
            role: 'bot',
          },
        ]);
      }
    } catch (err) {
      console.error('[AI Assistant API fetch error]:', err);
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
      alert('Please enter a valid 10-digit WhatsApp phone number to lock your rate.');
      return;
    }

    setIsSubmittingBooking(true);

    // Generate unique Voucher ID (e.g. MANA-8492)
    const voucherId = `MANA-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Save memory in localStorage
      localStorage.setItem('mana_customer_phone', rawDigits);
      if (customerName) localStorage.setItem('mana_customer_name', customerName);
      if (customerPickup) localStorage.setItem('mana_customer_pickup', customerPickup);

      // 1. Dual Redundancy: Log Lead to CRM FIRST
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName || 'AI Verified Customer',
          phone: `+91 ${rawDigits}`,
          service: quote.isSelfDrive ? 'Self Drive' : 'Outstation / Pilgrimage',
          tripType: quote.tripType,
          vehicleChoice: quote.vehicle.name,
          pickup: customerPickup || 'Kadapa Hub / Doorstep',
          destination: quote.destination,
          travelDate: quote.timeNote || 'Immediate / Flexible',
          passengers: String(quote.passengers),
          notes: `🎫 Voucher #${voucherId} | Route: ${quote.routeLabel} | Locked Fare: ₹${quote.estimatedFare} | ${quote.promoMessage || 'Standard Fare'}`,
          estimatedPrice: `₹${quote.estimatedFare}`,
          sourceUrl: 'AI Assistant Concierge (Locked Fare)',
          promoOffer: quote.promoApplicable ? quote.promoMessage : null,
        }),
      });

      // 2. Build verified WhatsApp dispatch payload
      const waLines = [
        `*MANA Tours & Travels — Confirmed Trip Voucher*`,
        `🎫 *Voucher ID:* #${voucherId}`,
        `----------------------------------------`,
        `📍 *Route:* ${quote.routeLabel}`,
        `🚗 *Vehicle:* ${quote.vehicle.name} (${quote.vehicle.seats})`,
        `📋 *Trip Type:* ${quote.tripType}`,
        `💰 *Locked Fare:* ₹${quote.estimatedFare.toLocaleString('en-IN')} (All-Inclusive)`,
        customerName ? `👤 *Name:* ${customerName}` : null,
        `📞 *WhatsApp:* +91 ${rawDigits}`,
        customerPickup ? `📍 *Pickup Point:* ${customerPickup}` : null,
        quote.promoApplicable ? `🎁 *Special Deal:* ${quote.promoMessage}` : null,
        `----------------------------------------`,
        `*Status:* 🟡 Customer Confirmed via AI Concierge — Ready for Vehicle Dispatch!`,
      ].filter(Boolean);

      const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(waLines.join('\n'))}`;

      // 3. Mark voucher as confirmed in state
      setConfirmedVouchers((prev) => ({
        ...prev,
        [messageIndex]: {
          voucherId,
          waUrl,
          phone: rawDigits,
        },
      }));
      setActiveLockIndex(null);

      // 4. Open WhatsApp
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('[Booking Lock Error]:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // 5. Text-to-Speech Audio Playback
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
      {/* ── Floating Launcher Badge ── */}
      {!isOpen && (
        <button
          className={styles.floatingLauncher}
          onClick={() => setIsOpen(true)}
          aria-label="Open MANA AI Voice & Text Booking Assistant"
        >
          <div className={styles.launcherIconWrap}>
            <span className={styles.launcherPulse} />
            🎙️
          </div>
          <div className={styles.launcherText}>
            <span className={styles.launcherTitle}>
              MANA AI Booking
              <span style={{ fontSize: '0.65rem', background: '#10B981', color: '#FFF', padding: '1px 5px', borderRadius: '4px' }}>
                24/7
              </span>
            </span>
            <span className={styles.launcherSubtitle}>Voice & Instant Quote</span>
          </div>
        </button>
      )}

      {/* ── Assistant Modal Drawer ── */}
      {isOpen && (
        <div className={styles.modalBackdrop} onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div className={styles.modalCard} role="dialog" aria-modal="true">
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.botAvatar}>🤖</div>
                <div className={styles.headerInfo}>
                  <h3>MANA AI Booking Assistant</h3>
                  <div className={styles.liveIndicator}>
                    <span className={styles.liveDot} />
                    Instant Rayalaseema Quotes
                  </div>
                </div>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
              >
                ✕
              </button>
            </div>

            {/* Language Switcher */}
            <div className={styles.langBar}>
              <span className={styles.langLabel}>Select Voice / Language:</span>
              <div className={styles.langPills}>
                <button
                  className={`${styles.langPill} ${language === 'te' ? styles.langPillActive : ''}`}
                  onClick={() => handleLanguageChange('te')}
                >
                  తెలుగు
                </button>
                <button
                  className={`${styles.langPill} ${language === 'en' ? styles.langPillActive : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </button>
                <button
                  className={`${styles.langPill} ${language === 'hi' ? styles.langPillActive : ''}`}
                  onClick={() => handleLanguageChange('hi')}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className={styles.messagesArea}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.messageBubble} ${msg.role === 'user' ? styles.messageUser : styles.messageBot}`}
                >
                  <div className={styles.bubbleBody}>{msg.text}</div>

                  {/* Audio Listen Button for Bot Messages */}
                  {msg.role === 'bot' && (
                    <div className={styles.bubbleActions}>
                      <button
                        className={styles.ttsBtn}
                        onClick={() => {
                          setSpeakingIndex(index);
                          playTts(msg.text, language);
                        }}
                      >
                        🔊 Listen ({language === 'te' ? 'తెలుగు' : 'Audio'})
                      </button>
                    </div>
                  )}

                  {/* Interactive Quote Card with Progressive Intent Flow */}
                  {msg.quote && (
                    <div className={styles.quoteCard}>
                      <div className={styles.quoteHeader}>
                        <div className={styles.quoteRoute}>
                          📍 {msg.quote.routeLabel}
                        </div>
                        <div className={styles.quoteVehicle}>
                          {msg.quote.vehicle.icon} {msg.quote.vehicle.name}
                        </div>
                      </div>

                      <div className={styles.quoteFareRow}>
                        <span className={styles.fareLabel}>{msg.quote.tripType}</span>
                        <span className={styles.fareValue}>₹{msg.quote.estimatedFare.toLocaleString('en-IN')}</span>
                      </div>

                      {msg.quote.promoApplicable && (
                        <div className={styles.quotePromoBadge}>
                          {msg.quote.promoMessage}
                        </div>
                      )}

                      <div className={styles.quoteInclusions}>
                        {msg.quote.inclusions.slice(0, 3).map((inc, i) => (
                          <span key={i} className={styles.inclusionChip}>
                            ✓ {inc}
                          </span>
                        ))}
                      </div>

                      {/* Stage 1: Initial "Lock This Fare" CTA */}
                      {activeLockIndex !== index && !confirmedVouchers[index] && (
                        <button
                          type="button"
                          className={styles.lockFareBtn}
                          onClick={() => setActiveLockIndex(index)}
                        >
                          🔒 Lock ₹{msg.quote.estimatedFare.toLocaleString('en-IN')} & Book on WhatsApp
                        </button>
                      )}

                      {/* Stage 2: Progressive Inline Phone Capture Form */}
                      {activeLockIndex === index && !confirmedVouchers[index] && (
                        <div className={styles.inlinePhoneSection}>
                          <div className={styles.phoneFormHeader}>
                            🔒 Lock Fare & Get Dispatch Slip
                          </div>

                          <div className={styles.phoneInputGroup}>
                            <span className={styles.phonePrefix}>🇮🇳 +91</span>
                            <input
                              type="tel"
                              className={styles.phoneInputField}
                              placeholder="Enter 10-digit WhatsApp No."
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              maxLength={10}
                              autoFocus
                            />
                          </div>

                          <input
                            type="text"
                            className={styles.optionalInput}
                            placeholder="Your Name (Optional)"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />

                          <input
                            type="text"
                            className={styles.optionalInput}
                            placeholder="Pickup Point (e.g., Kadapa RTC Bus Stand, Home)"
                            value={customerPickup}
                            onChange={(e) => setCustomerPickup(e.target.value)}
                          />

                          <div className={styles.priceLockTrustPill}>
                            ✓ Guaranteed price lock · Driver details sent on WhatsApp
                          </div>

                          <button
                            type="button"
                            className={styles.confirmDispatchBtn}
                            onClick={() => handleConfirmLockAndDispatch(msg.quote, index)}
                            disabled={isSubmittingBooking}
                          >
                            {isSubmittingBooking ? 'Locking Fare...' : '🚀 Lock Fare & Open WhatsApp'}
                          </button>

                          <button
                            type="button"
                            className={styles.cancelPhoneBtn}
                            onClick={() => setActiveLockIndex(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {/* Stage 3: Confirmed Voucher Badge */}
                      {confirmedVouchers[index] && (
                        <div className={styles.voucherCard}>
                          <div className={styles.voucherHeader}>
                            <span className={styles.voucherTitle}>✓ Trip Reserved</span>
                            <span className={styles.voucherId}>
                              #{confirmedVouchers[index].voucherId}
                            </span>
                          </div>
                          <p className={styles.voucherSubtext}>
                            Locked fare dispatched! Pavan & Jyothi are connecting with you on WhatsApp (+91 {confirmedVouchers[index].phone}).
                          </p>
                          <a
                            href={confirmedVouchers[index].waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.reopenWaBtn}
                          >
                            💬 Open WhatsApp Chat
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className={`${styles.messageBubble} ${styles.messageBot}`}>
                  <div className={styles.bubbleBody} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span>Calculating transparent fare</span>
                    <span className={styles.waveBar} style={{ height: '12px' }} />
                    <span className={styles.waveBar} style={{ height: '18px' }} />
                    <span className={styles.waveBar} style={{ height: '10px' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className={styles.quickPillsArea}>
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  className={styles.quickPill}
                  onClick={() => handleSendMessage(p.prompt)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Live Audio Waveform while recording */}
            {isRecording && (
              <div className={styles.waveformContainer}>
                <div className={styles.waveLeft}>
                  <span className={styles.recordingStatus}>
                    🎙️ Listening ({language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिंदी' : 'English'})...
                  </span>
                  <div className={styles.waveBars}>
                    <span className={styles.waveBar} />
                    <span className={styles.waveBar} />
                    <span className={styles.waveBar} />
                    <span className={styles.waveBar} />
                    <span className={styles.waveBar} />
                  </div>
                </div>
                <button className={styles.stopRecBtn} onClick={stopRecording}>
                  Done
                </button>
              </div>
            )}

            {/* Bottom Input Form */}
            <form
              className={styles.inputArea}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className={styles.textInput}
                placeholder={
                  language === 'te'
                    ? 'ఎక్కడికి వెళ్లాలి? (ఉదా: తిరుపతి, హైదరాబాద్...)'
                    : 'Where to? (e.g., Tirupati, Bangalore airport, Self-Drive)'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
              />

              <button
                type="button"
                className={`${styles.micBtn} ${isRecording ? styles.micBtnRecording : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title="Speak to Assistant"
                aria-label="Toggle voice recording"
              >
                {isRecording ? '⏹' : '🎙️'}
              </button>

              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!inputText.trim() || isLoading}
                aria-label="Send query"
              >
                ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
