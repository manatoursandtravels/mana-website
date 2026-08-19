// lib/analytics.js — Google Analytics 4 (GA4) & Conversion Tracking Helper
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Log page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log generic custom events
export const trackEvent = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Log Phone Call Clicks (High-value Lead)
export const trackCallLead = (phoneNumber, sourceLocation = 'General') => {
  trackEvent({
    action: 'contact_call_click',
    category: 'Lead Generation',
    label: `${phoneNumber} via ${sourceLocation}`,
  });
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      method: 'Phone Call',
      contact_target: phoneNumber,
      source_section: sourceLocation,
    });
  }
};

// Log WhatsApp Booking Clicks (High-value Lead)
export const trackWhatsAppLead = (serviceName = 'General Booking', sourceLocation = 'General') => {
  trackEvent({
    action: 'contact_whatsapp_click',
    category: 'Lead Generation',
    label: `${serviceName} via ${sourceLocation}`,
  });
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      method: 'WhatsApp',
      service_type: serviceName,
      source_section: sourceLocation,
    });
  }
};

// Log Form Submissions
export const trackFormSubmission = (formType = 'Quick Booking', routeDetails = '') => {
  trackEvent({
    action: 'form_submission',
    category: 'Lead Generation',
    label: `${formType} - ${routeDetails}`,
  });
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      method: 'Booking Form',
      form_name: formType,
      route: routeDetails,
    });
  }
};
