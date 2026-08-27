const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function createIco(buffers, sizes) {
  // ICO Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(buffers.length, 4); // Count of images

  let offset = 6 + buffers.length * 16;
  const dirEntries = [];

  for (let i = 0; i < buffers.length; i++) {
    const size = sizes[i];
    const buf = buffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset
    dirEntries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirEntries, ...buffers]);
}

async function generateAllFavicons() {
  const baseSrcPath = path.join(__dirname, '../public/icons/icon-512x512.png');
  const baseBuffer = fs.readFileSync(baseSrcPath);
  const iconsDir = path.join(__dirname, '../public/icons');
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../app');

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log('Generating multi-resolution PNGs...');

  // 1. Standard PNG sizes for PWA and Web
  const pngSizes = [
    { size: 16, dest: path.join(publicDir, 'favicon-16x16.png') },
    { size: 32, dest: path.join(publicDir, 'favicon-32x32.png') },
    { size: 48, dest: path.join(publicDir, 'favicon-48x48.png') },
    { size: 72, dest: path.join(iconsDir, 'icon-72x72.png') },
    { size: 96, dest: path.join(iconsDir, 'icon-96x96.png') },
    { size: 128, dest: path.join(iconsDir, 'icon-128x128.png') },
    { size: 144, dest: path.join(iconsDir, 'icon-144x144.png') },
    { size: 180, dest: path.join(iconsDir, 'apple-touch-icon.png') },
    { size: 192, dest: path.join(iconsDir, 'icon-192x192.png') },
    { size: 384, dest: path.join(iconsDir, 'icon-384x384.png') },
    { size: 512, dest: path.join(iconsDir, 'icon-512x512.png') },
  ];

  for (const { size, dest } of pngSizes) {
    await sharp(baseBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 14, g: 26, b: 43, alpha: 1 } })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(dest);
    console.log(`✓ Created: ${path.relative(process.cwd(), dest)} (${size}x${size})`);
  }

  // 2. Adaptive Maskable Icons (with safe zone padding: 10% inner inset)
  const maskableSizes = [
    { size: 192, dest: path.join(iconsDir, 'icon-maskable-192x192.png') },
    { size: 512, dest: path.join(iconsDir, 'icon-maskable-512x512.png') },
  ];

  for (const { size, dest } of maskableSizes) {
    const innerSize = Math.round(size * 0.82); // 82% inside safe zone
    const innerBuffer = await sharp(baseBuffer)
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 14, g: 26, b: 43, alpha: 1 } })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 14, g: 26, b: 43, alpha: 1 }, // Brand deep navy
      },
    })
      .composite([{ input: innerBuffer, gravity: 'center' }])
      .png({ quality: 95 })
      .toFile(dest);
    console.log(`✓ Created Maskable: ${path.relative(process.cwd(), dest)} (${size}x${size})`);
  }

  // 3. Multi-resolution ICO (16x16, 32x32, 48x48)
  console.log('Building multi-layer favicon.ico...');
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((s) =>
      sharp(baseBuffer)
        .resize(s, s, { fit: 'contain', background: { r: 14, g: 26, b: 43, alpha: 1 } })
        .png()
        .toBuffer()
    )
  );

  const icoData = createIco(icoBuffers, icoSizes);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoData);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoData);
  console.log(`✓ Created: public/favicon.ico and app/favicon.ico (${icoData.length} bytes)`);

  // 4. Modern Vector SVG Favicon
  const svgFaviconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E1A2B"/>
      <stop offset="100%" stop-color="#071220"/>
    </linearGradient>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF2E4D"/>
      <stop offset="50%" stop-color="#E10628"/>
      <stop offset="100%" stop-color="#9E0016"/>
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E7BE8"/>
      <stop offset="50%" stop-color="#0B4EA2"/>
      <stop offset="100%" stop-color="#052D62"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FFDF73"/>
      <stop offset="100%" stop-color="#B88E3E"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="128" height="128" rx="28" fill="url(#bgGrad)" stroke="#B88E3E" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Supersonic Red/Blue Arc -->
  <path d="M 22 56 C 42 32, 86 32, 106 48" fill="none" stroke="url(#redGrad)" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 28 61 C 46 40, 80 40, 98 52" fill="none" stroke="url(#blueGrad)" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Airplane Silhouette with Jet Trails -->
  <g transform="translate(86, 32) scale(0.65) rotate(15)" filter="url(#shadow)">
    <!-- Tricolor Contrailtrails -->
    <path d="M -30 18 L 0 6" stroke="#FF9933" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <path d="M -26 21 L 4 9" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <path d="M -22 24 L 8 12" stroke="#138808" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <!-- Aircraft Body -->
    <path d="M 12 0 L 2 12 L -6 11 L -2 7 L -10 6 L -14 10 L -18 10 L -16 6 L -22 5 L -20 2 L 12 0 Z" fill="#FFFFFF"/>
    <path d="M 2 12 L -4 20 L -8 20 L -3 12 Z" fill="#1E7BE8"/>
  </g>

  <!-- Stylized MANA Monogram -->
  <text x="64" y="86" text-anchor="middle" font-family="'Outfit', 'Arial Black', sans-serif" font-weight="900" font-size="28" letter-spacing="-0.5" filter="url(#shadow)">
    <tspan fill="url(#redGrad)">M</tspan><tspan fill="url(#blueGrad)">A</tspan><tspan fill="url(#blueGrad)">N</tspan><tspan fill="url(#redGrad)">A</tspan>
  </text>

  <!-- Golden Accent Bottom Bar -->
  <rect x="36" y="96" width="56" height="2.5" rx="1.25" fill="url(#goldGrad)"/>
  <circle cx="64" cy="104" r="1.8" fill="#FFDF73"/>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFaviconContent);
  fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), svgFaviconContent);
  console.log(`✓ Created: public/favicon.svg and public/icons/favicon.svg`);

  console.log('All favicons and app icons generated successfully!');
}

generateAllFavicons().catch(console.error);
