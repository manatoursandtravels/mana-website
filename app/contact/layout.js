// app/contact/layout.js — Server layout that injects metadata + LocalBusiness schema for contact page
import { contactMetadata } from './metadata';

export const metadata = contactMetadata;

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact MANA Tours & Travels Kadapa',
  url: 'https://www.manatoursandtravels.com/contact',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.manatoursandtravels.com/contact' },
    ],
  },
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'MANA Tours & Travels',
    telephone: ['+919908300718', '+919908320718'],
    email: 'manatoursandtravels@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Road, Near Seven Roads Junction',
      addressLocality: 'Kadapa',
      addressRegion: 'Andhra Pradesh',
      postalCode: '516001',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    url: 'https://www.manatoursandtravels.com',
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
