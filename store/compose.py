"""Compose App Store screenshots (1290x2796, 6.9") from raw iPhone captures.

Usage: python3 store/compose.py
Raw captures live in store/raw/, output goes to store/out/.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
RAW, OUT = ROOT / "raw", ROOT / "out"
W, H = 1290, 2796
BG_TOP, BG_BOTTOM = (26, 20, 16), (15, 11, 8)   # smoke -> dark mud
CREAM, KHAKI = (240, 232, 216), (200, 169, 110)
FONT = "/System/Library/Fonts/Supplemental/Baskerville.ttc"

SHOTS = [
    ("01_battle.png", "Command the\nWestern Front", "Turn-based WW1 tactics. Every move counts."),
    ("02_briefing.png", "Rain. Mud.\nMachine Guns.", "Weather and nation change every battle."),
    ("03_victory.png", "25 Missions.\n1914 to 1918.", "Verdun, the Somme, Vimy Ridge and more."),
]

STATUS_BAR, BOTTOM_TRIM = 190, 60     # px cropped from the 1206x2622 captures
SHOT_W, SHOT_Y, RADIUS = 1130, 540, 48


def background():
    bg = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOTTOM)))
    return bg


def compose(src, headline, sub):
    img = background()
    d = ImageDraw.Draw(img)

    title = ImageFont.truetype(FONT, 112, index=1)
    d.multiline_text((W // 2, 110), headline, font=title, fill=CREAM, anchor="ma", align="center", spacing=8)
    d.text((W // 2, 395), sub, font=ImageFont.truetype(FONT, 56, index=5), fill=KHAKI, anchor="ma")

    shot = Image.open(RAW / src).convert("RGB")
    shot = shot.crop((0, STATUS_BAR, shot.width, shot.height - BOTTOM_TRIM))
    shot = shot.resize((SHOT_W, round(shot.height * SHOT_W / shot.width)), Image.LANCZOS)
    shot = shot.crop((0, 0, SHOT_W, min(shot.height, H - SHOT_Y - 50)))

    mask = Image.new("L", shot.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *shot.size), RADIUS, fill=255)
    x = (W - SHOT_W) // 2
    d.rounded_rectangle((x - 4, SHOT_Y - 4, x + SHOT_W + 3, SHOT_Y + shot.height + 3), RADIUS + 4, fill=KHAKI)
    img.paste(shot, (x, SHOT_Y), mask)

    img.save(OUT / src)


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for shot in SHOTS:
        compose(*shot)
        print("wrote", OUT / shot[0])
