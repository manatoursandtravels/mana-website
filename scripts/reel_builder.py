import os
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1080, 1920
FPS = 30
DURATION_PER_SCENE = 3.5
TOTAL_FRAMES_PER_SCENE = int(FPS * DURATION_PER_SCENE)

FONT_PATH_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_PATH_REG = "C:/Windows/Fonts/arial.ttf"

def get_font(size, bold=True):
    path = FONT_PATH_BOLD if bold else FONT_PATH_REG
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def create_gradient_overlay(width, height):
    """Creates a vignette gradient overlay for high contrast text readability"""
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Top dark gradient
    for y in range(450):
        alpha = int(210 * (1 - y / 450))
        draw.line([(0, y), (width, y)], fill=(8, 14, 28, alpha))
        
    # Bottom dark gradient
    for y in range(height - 650, height):
        ratio = (y - (height - 650)) / 650
        alpha = int(240 * ratio)
        draw.line([(0, y), (width, y)], fill=(8, 14, 28, alpha))
        
    return overlay

def draw_rounded_badge(draw, text, xy, font, bg_color=(225, 48, 108, 230), text_color=(255, 255, 255)):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    px, py = 28, 14
    x, y = xy
    x0, y0 = x - tw // 2 - px, y - th // 2 - py
    x1, y1 = x + tw // 2 + px, y + th // 2 + py
    draw.rounded_rectangle([x0, y0, x1, y1], radius=24, fill=bg_color)
    draw.text((x - tw // 2, y - th // 2 - 2), text, font=font, fill=text_color)

def generate_scene_frames(bg_path, top_badge, title_line1, title_line2, sub_title, bottom_pills, output_dir, scene_idx):
    os.makedirs(output_dir, exist_ok=True)
    base_raw = Image.open(bg_path).convert('RGB')
    
    # Fit & crop to 9:16 aspect ratio base (oversized for zoom)
    bw, bh = base_raw.size
    target_ratio = W / H
    current_ratio = bw / bh
    
    if current_ratio > target_ratio:
        new_w = int(bh * target_ratio)
        offset = (bw - new_w) // 2
        base_cropped = base_raw.crop((offset, 0, offset + new_w, bh))
    else:
        new_h = int(bw / target_ratio)
        offset = (bh - new_h) // 2
        base_cropped = base_raw.crop((0, offset, bw, offset + new_h))
        
    base_1080 = base_cropped.resize((W, H), Image.Resampling.LANCZOS)
    gradient = create_gradient_overlay(W, H)
    
    font_badge = get_font(32, bold=True)
    font_title1 = get_font(68, bold=True)
    font_title2 = get_font(76, bold=True)
    font_sub = get_font(38, bold=True)
    font_bottom = get_font(34, bold=True)
    
    for frame_idx in range(TOTAL_FRAMES_PER_SCENE):
        progress = frame_idx / TOTAL_FRAMES_PER_SCENE
        zoom = 1.0 + (0.08 * progress)
        
        # Smooth zoom
        zw = int(W * zoom)
        zh = int(H * zoom)
        zoomed = base_1080.resize((zw, zh), Image.Resampling.BILINEAR)
        crop_x = (zw - W) // 2
        crop_y = (zh - H) // 2
        frame = zoomed.crop((crop_x, crop_y, crop_x + W, crop_y + H)).convert('RGBA')
        
        # Apply dark cinematic overlay
        frame = Image.alpha_composite(frame, gradient)
        draw = ImageDraw.Draw(frame)
        
        # Draw Top Badge
        draw_rounded_badge(draw, top_badge, (W // 2, 220), font_badge, bg_color=(198, 40, 40, 240), text_color=(255, 255, 255))
        
        # Draw Titles (Bottom Third)
        # Drop shadow + text
        title_y1 = H - 540
        title_y2 = H - 460
        sub_y = H - 370
        
        # Line 1
        bbox1 = font_title1.getbbox(title_line1)
        w1 = bbox1[2] - bbox1[0]
        draw.text(((W - w1) // 2 + 3, title_y1 + 3), title_line1, font=font_title1, fill=(0, 0, 0, 200))
        draw.text(((W - w1) // 2, title_y1), title_line1, font=font_title1, fill=(255, 255, 255))
        
        # Line 2 (Vibrant Gold / Red Accent)
        bbox2 = font_title2.getbbox(title_line2)
        w2 = bbox2[2] - bbox2[0]
        draw.text(((W - w2) // 2 + 3, title_y2 + 3), title_line2, font=font_title2, fill=(0, 0, 0, 200))
        draw.text(((W - w2) // 2, title_y2), title_line2, font=font_title2, fill=(245, 180, 50))
        
        # Subtitle
        bbox_sub = font_sub.getbbox(sub_title)
        w_sub = bbox_sub[2] - bbox_sub[0]
        draw.text(((W - w_sub) // 2, sub_y), sub_title, font=font_sub, fill=(220, 235, 255))
        
        # Bottom feature box
        box_y0, box_y1 = H - 280, H - 180
        draw.rounded_rectangle([70, box_y0, W - 70, box_y1], radius=28, fill=(15, 23, 42, 220), outline=(218, 165, 32, 180), width=2)
        bbox_b = font_bottom.getbbox(bottom_pills)
        wb = bbox_b[2] - bbox_b[0]
        draw.text(((W - wb) // 2, box_y0 + 30), bottom_pills, font=font_bottom, fill=(255, 255, 255))
        
        # Watermark at top right
        draw.text((W - 320, 90), "MANA TOURS & TRAVELS", font=get_font(22, bold=True), fill=(255, 255, 255, 180))
        
        frame_rgb = frame.convert('RGB')
        frame_rgb.save(os.path.join(output_dir, f"frame_{scene_idx}_{frame_idx:04d}.jpg"), quality=92)

def generate_endcard_frames(logo_path, output_dir, scene_idx):
    os.makedirs(output_dir, exist_ok=True)
    logo = Image.open(logo_path).convert('RGBA')
    logo = logo.resize((360, 360), Image.Resampling.LANCZOS)
    
    font_h1 = get_font(56, bold=True)
    font_h2 = get_font(38, bold=True)
    font_phone = get_font(44, bold=True)
    font_web = get_font(36, bold=True)
    font_tag = get_font(30, bold=False)
    
    for frame_idx in range(TOTAL_FRAMES_PER_SCENE):
        bg = Image.new('RGB', (W, H), (8, 15, 32))
        draw = ImageDraw.Draw(bg)
        
        # Radial gold/navy luxury glow in center
        for r in range(500, 0, -20):
            alpha = int(40 * (1 - r / 500))
            draw.ellipse([W//2 - r, 500 - r, W//2 + r, 500 + r], outline=(212, 175, 55, alpha), width=15)
            
        # Paste Logo
        bg.paste(logo, (W // 2 - 180, 320), logo)
        
        # Headline
        t1 = "BOOK YOUR JOURNEY TODAY"
        b1 = font_h1.getbbox(t1)
        draw.text(((W - (b1[2]-b1[0])) // 2, 740), t1, font=font_h1, fill=(245, 180, 50))
        
        t2 = "Kadapa's #1 Tours, Cabs & Self-Drive"
        b2 = font_h2.getbbox(t2)
        draw.text(((W - (b2[2]-b2[0])) // 2, 820), t2, font=font_h2, fill=(255, 255, 255))
        
        # Contact Card
        draw.rounded_rectangle([80, 920, W - 80, 1380], radius=32, fill=(15, 28, 56), outline=(218, 165, 32), width=3)
        
        draw.text((130, 970), "📞 Pavan (Managing Partner):", font=font_tag, fill=(180, 200, 230))
        draw.text((130, 1020), "+91 99083 00718", font=font_phone, fill=(255, 255, 255))
        
        draw.line([(130, 1090), (W - 130, 1090)], fill=(40, 60, 100), width=2)
        
        draw.text((130, 1120), "💬 Jyothi (Booking Desk):", font=font_tag, fill=(180, 200, 230))
        draw.text((130, 1170), "+91 99083 20718", font=font_phone, fill=(255, 255, 255))
        
        draw.line([(130, 1240), (W - 130, 1240)], fill=(40, 60, 100), width=2)
        
        draw.text((130, 1270), "🌐 Instant Online Booking:", font=font_tag, fill=(180, 200, 230))
        draw.text((130, 1315), "www.manatoursandtravels.com", font=font_web, fill=(56, 189, 248))
        
        # Bottom CTA Badge
        draw_rounded_badge(draw, "⚡ TAP LINK IN BIO TO WHATSAPP US", (W // 2, 1500), font_phone, bg_color=(225, 48, 108), text_color=(255, 255, 255))
        
        draw.text((W//2 - 260, 1600), "📍 Kadapa · Proddatur · Rayalaseema", font=font_tag, fill=(150, 170, 200))
        
        bg.save(os.path.join(output_dir, f"frame_{scene_idx}_{frame_idx:04d}.jpg"), quality=92)

def main():
    frames_dir = "public/videos/temp_frames"
    os.makedirs(frames_dir, exist_ok=True)
    
    print("[1/5] Rendering Scene 1 (Black Mahindra XUV 3XO Spotlight)...")
    generate_scene_frames(
        "public/images/insta-xuv3xo-gandikota.jpg",
        "🔑 NEW SELF-DRIVE ARRIVAL IN KADAPA",
        "UNLEASH THE BEAST",
        "STEALTH BLACK XUV 3XO",
        "Turbo Power • Panoramic Skyroof",
        "From ₹1,499/Day • Doorstep Handover",
        frames_dir,
        1
    )
    
    print("[2/5] Rendering Scene 2 (Gandikota Grand Canyon & Road Trips)...")
    generate_scene_frames(
        "public/images/gandikota.jpg",
        "🏜️ THE GRAND CANYON OF INDIA",
        "WEEKEND ROAD TRIP",
        "GANDIKOTA & BELUM CAVES",
        "Private AC Cab or Self-Drive Freedom",
        "Starting from ₹2,799 • Zero Hidden Costs",
        frames_dir,
        2
    )
    
    print("[3/5] Rendering Scene 3 (Executive Fleet: Innova Crysta & Sedans)...")
    generate_scene_frames(
        "public/images/hero-car.jpg",
        "🛕 24/7 OUTSTATION & AIRPORT DROPS",
        "TRAVEL IN PURE LUXURY",
        "INNOVA CRYSTA & SEDANS",
        "Tirupati Balaji • Bangalore & Hyderabad Drops",
        "Verified Chauffeurs • 100% On-Time Guarantee",
        frames_dir,
        3
    )
    
    print("[4/5] Rendering Scene 4 (Official Brand End Card & Contacts)...")
    generate_endcard_frames(
        "public/images/mana-official-logo.jpg",
        frames_dir,
        4
    )
    
    print("[5/5] Compiling final 1080x1920 MP4 Reel with FFmpeg...")
    output_mp4 = "public/videos/mana-tours-official-reel.mp4"
    
    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(frames_dir, "frame_%d_%04d.jpg"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "22",
        output_mp4
    ]
    
    # Run ffmpeg with image2 pattern
    concat_script = os.path.join(frames_dir, "concat.txt")
    with open(concat_script, "w") as f:
        for s in [1, 2, 3, 4]:
            for i in range(TOTAL_FRAMES_PER_SCENE):
                frame_path = f"frame_{s}_{i:04d}.jpg"
                f.write(f"file '{frame_path}'\n")
                f.write(f"duration {1.0/FPS}\n")
    
    cmd_concat = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_script,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-r", str(FPS),
        "-preset", "fast",
        "-crf", "20",
        output_mp4
    ]
    
    subprocess.run(cmd_concat, check=True)
    print(f"\n[SUCCESS] Video successfully generated: {output_mp4}")
    
    # Clean up frames
    for f in os.listdir(frames_dir):
        os.remove(os.path.join(frames_dir, f))
    os.rmdir(frames_dir)
    print("[CLEANUP] Temporary frame files cleaned up.")

if __name__ == "__main__":
    main()
