import os

base = r'c:\MANA\website\app\routes'

routes = [
    ('kadapa-bangalore-cab', 'Bangalore', 'emoji_city', '~330 km', '~5-6 hrs', '5,499', '9,499'),
    ('kadapa-chennai-cab', 'Chennai', 'emoji_wave', '~380 km', '~6-7 hrs', '5,299', '9,299'),
    ('kadapa-gandikota-tour', 'Gandikota', 'emoji_mountain', '~120 km', '~2-3 hrs', '2,799', '2,799'),
    ('kadapa-srisailam-cab', 'Srisailam', 'emoji_temple', '~240 km', '~4-5 hrs', '2,299', '3,799'),
    ('kadapa-belum-caves', 'Belum Caves', 'emoji_caves', '~100 km', '~2 hrs', '2,499', '2,499'),
]

ICONS = {
    'emoji_city': '&#127961;',
    'emoji_wave': '&#127754;',
    'emoji_mountain': '&#9968;',
    'emoji_temple': '&#128509;',
    'emoji_caves': '&#127757;',
}

ICON_JSX = {
    'emoji_city': '🏙',
    'emoji_wave': '🌊',
    'emoji_mountain': '🏔',
    'emoji_temple': '🛕',
    'emoji_caves': '⛰',
}

for args in routes:
    slug, dest, icon_key, km, dur, ow, rt = args
    icon = ICON_JSX[icon_key]
    folder = os.path.join(base, slug)
    os.makedirs(folder, exist_ok=True)

    page = (
        "import Header from '@/components/Header';\n"
        "import Footer from '@/components/Footer';\n"
        "import WhatsAppButton from '@/components/WhatsAppButton';\n"
        "import BookingForm from '@/components/BookingForm';\n"
        "import Link from 'next/link';\n"
        "import styles from '../../services/service.module.css';\n"
        "import { BUSINESS } from '@/lib/constants';\n"
        "\n"
        "export const metadata = {\n"
        "  title: 'Kadapa to " + dest + " Cab | MANA Tours & Travels',\n"
        "  description: 'Book a cab from Kadapa to " + dest + ". AC sedan with experienced driver. MANA Tours & Travels. Call +91 99083 00718.',\n"
        "};\n"
        "\n"
        "export default function Page() {\n"
        "  return (\n"
        "    <>\n"
        "      <Header />\n"
        "      <div className={styles.serviceHero}>\n"
        "        <div className=\"container\">\n"
        "          <div className={styles.heroBreadcrumb}>\n"
        "            <Link href=\"/\">Home</Link> &rsaquo; Kadapa to " + dest + "\n"
        "          </div>\n"
        "          <div className={styles.heroIcon}>" + icon + "</div>\n"
        "          <h1 className={styles.heroTitle}>Kadapa to " + dest + " Cab</h1>\n"
        "          <p className={styles.heroSubtitle}>\n"
        "            Comfortable AC cab from Kadapa to " + dest + ". Transparent pricing. Experienced driver. Available 24/7.\n"
        "          </p>\n"
        "          <div className={styles.routeInfo}>\n"
        "            <div className={styles.routeInfoItem}>\n"
        "              <div className={styles.routeInfoValue}>" + km + "</div>\n"
        "              <div className={styles.routeInfoLabel}>Distance</div>\n"
        "            </div>\n"
        "            <div className={styles.routeInfoItem}>\n"
        "              <div className={styles.routeInfoValue}>" + dur + "</div>\n"
        "              <div className={styles.routeInfoLabel}>Drive Time</div>\n"
        "            </div>\n"
        "            <div className={styles.routeInfoItem}>\n"
        "              <div className={styles.routeInfoValue}>Rs." + ow + "</div>\n"
        "              <div className={styles.routeInfoLabel}>Fare</div>\n"
        "            </div>\n"
        "          </div>\n"
        "          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>\n"
        "            <a href=\"#book\" className=\"btn btn--primary btn--lg\">Book This Cab</a>\n"
        "            <a href={`tel:${BUSINESS.phone.pavan}`} className=\"btn btn--white btn--lg\">Call Now</a>\n"
        "          </div>\n"
        "        </div>\n"
        "      </div>\n"
        "\n"
        "      <section className=\"section\">\n"
        "        <div className=\"container\">\n"
        "          <div className={styles.contentGrid}>\n"
        "            <div className={styles.mainCol}>\n"
        "              <h2>Kadapa to " + dest + " Cab Fare</h2>\n"
        "              <div className=\"divider divider--left\" style={{ marginBottom: '20px' }} />\n"
        "              <table className=\"rate-table\">\n"
        "                <thead><tr><th>Trip Type</th><th>Price</th><th>Includes</th></tr></thead>\n"
        "                <tbody>\n"
        "                  <tr><td>One Way / Day Trip</td><td className=\"price\">Rs." + ow + "</td><td>Driver + AC + Fuel</td></tr>\n"
        "                  <tr><td>Round Trip</td><td className=\"price\">Rs." + rt + "</td><td>Driver + AC + Fuel + Wait</td></tr>\n"
        "                </tbody>\n"
        "              </table>\n"
        "              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>\n"
        "                Toll and parking at actual, paid by customer. All prices for AC sedan.\n"
        "              </p>\n"
        "            </div>\n"
        "            <div className={styles.sideCol}>\n"
        "              <div id=\"book\" className={styles.stickyForm}><BookingForm compact /></div>\n"
        "              <div className={styles.contactCard}>\n"
        "                <p>Need to book or have a question?</p>\n"
        "                <a href={`tel:${BUSINESS.phone.pavan}`} className=\"btn btn--primary\" style={{ width: '100%', justifyContent: 'center' }}>\n"
        "                  Call {BUSINESS.phone.pavanDisplay}\n"
        "                </a>\n"
        "                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target=\"_blank\" rel=\"noopener noreferrer\" className={`btn ${styles.waBtn}`} style={{ width: '100%', justifyContent: 'center' }}>\n"
        "                  WhatsApp Us\n"
        "                </a>\n"
        "              </div>\n"
        "            </div>\n"
        "          </div>\n"
        "        </div>\n"
        "      </section>\n"
        "      <Footer /><WhatsAppButton />\n"
        "    </>\n"
        "  );\n"
        "}\n"
    )

    with open(os.path.join(folder, 'page.js'), 'w', encoding='utf-8') as f:
        f.write(page)
    print('Written: ' + slug)

print('All 5 route pages done.')
