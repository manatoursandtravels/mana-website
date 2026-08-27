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
  const uploadedSrc = 'C:/Users/Mohan/.gemini/antigravity-ide/brain/c1ae2b9e-56f4-4bae-bd1c-22ff4f6350a0/.user_uploaded/media_1787863153514.jpg';
  const iconsDir = path.join(__dirname, '../public/icons');
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../app');

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log('Loading uploaded high-res circular logo...');
  
  // Create circular alpha mask to remove black background corners outside the circular border
  const circleMask = Buffer.from(
    '<svg width="1024" height="1024"><circle cx="512" cy="512" r="506" fill="#ffffff"/></svg>'
  );

  const transparentCircularBase = await sharp(uploadedSrc)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png({ quality: 100 })
    .toBuffer();

  // Save the master source icon
  await sharp(transparentCircularBase)
    .resize(1024, 1024)
    .toFile(path.join(iconsDir, 'mana-circle-1024x1024.png'));

  console.log('Generating multi-resolution PNGs with transparent circular edges...');

  // 1. Standard PNG sizes for PWA, Web and App Icons
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
    await sharp(transparentCircularBase)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(dest);
    console.log(`✓ Created: ${path.relative(process.cwd(), dest)} (${size}x${size})`);
  }

  // 2. Android Maskable Icons (safe zone with 12% padding on clean brand background)
  const maskableSizes = [
    { size: 192, dest: path.join(iconsDir, 'icon-maskable-192x192.png') },
    { size: 512, dest: path.join(iconsDir, 'icon-maskable-512x512.png') },
  ];

  for (const { size, dest } of maskableSizes) {
    const innerSize = Math.round(size * 0.82); // 82% inside safe zone
    const innerBuffer = await sharp(transparentCircularBase)
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // White canvas for clean circle badge
      },
    })
      .composite([{ input: innerBuffer, gravity: 'center' }])
      .png({ quality: 95 })
      .toFile(dest);
    console.log(`✓ Created Maskable: ${path.relative(process.cwd(), dest)} (${size}x${size})`);
  }

  // 3. Multi-resolution ICO (16x16, 32x32, 48x48)
  console.log('Building multi-layer favicon.ico from circular badge...');
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((s) =>
      sharp(transparentCircularBase)
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );

  const icoData = createIco(icoBuffers, icoSizes);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoData);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoData);
  console.log(`✓ Created: public/favicon.ico and app/favicon.ico (${icoData.length} bytes)`);

  // 4. Also create a base64-embedded SVG Favicon with infinite vector scaling
  const base64Png = (await sharp(transparentCircularBase).resize(256, 256).png().toBuffer()).toString('base64');
  const svgFaviconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" width="256" height="256" />
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFaviconContent);
  fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), svgFaviconContent);
  console.log(`✓ Created: public/favicon.svg and public/icons/favicon.svg`);

  console.log('🎉 All favicons and app icons generated successfully from uploaded circular logo!');
}

generateAllFavicons().catch(console.error);
