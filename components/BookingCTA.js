'use client';

/**
 * BookingCTA — Smart scroll-to-form button
 * Scrolls to the booking section (always present on every page/viewport)
 */
export default function BookingCTA({ className = '', id = 'hero-book', label = '🚗 Book a Journey' }) {
  const handleClick = (e) => {
    e.preventDefault();

    // Priority 1: Booking section (homepage bottom, always visible on all devices)
    // Priority 2: Any local booking form on subpages
    const target =
      document.getElementById('booking-section') ||
      document.getElementById('book') ||
      document.getElementById('booking-form');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // After scroll settles, focus the first interactive field
      setTimeout(() => {
        const firstField = target.querySelector('select, input[type="text"], input[type="tel"]');
        if (firstField) firstField.focus({ preventScroll: true });
      }, 750);
    } else {
      // Fallback: Navigate to the homepage booking section
      window.location.href = '/#booking-section';
    }
  };

  return (
    <a
      href="#booking-section"
      className={className}
      id={id}
      onClick={handleClick}
    >
      {label}
    </a>
  );
}
