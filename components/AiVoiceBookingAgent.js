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
  const [activeQuote, setActiveQuote] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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

  // 1. Initialize Web Speech Recognition
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

  // 2. Send Message to AI Backend API
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
        setActiveQuote(data.quote);

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

  // 3. Text-to-Speech Audio Playback
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

                  {/* Interactive Quote Card */}
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

                      <a
                        href={msg.quote.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.waBookBtn}
                      >
                        <span>💬 Confirm on WhatsApp</span>
                      </a>
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
