"""Render all party logos to a preview strip for visual QA."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGOS = ROOT / "public" / "logos"
OUT = ROOT / "public" / "logos" / "_preview.png"

NAMES = [
    "psoe.svg",
    "pp.svg",
    "iu.svg",
    "upyd.svg",
    "podemos.svg",
    "ciudadanos.svg",
    "vox.svg",
    "sumar.png",
]

# Pillow can't render SVG natively; use a simple HTML-> not available.
# Instead convert via cairosvg if present, else skip SVG and only show PNG + note.
try:
    import cairosvg  # type: ignore
except ImportError:
    cairosvg = None


def load(name: str, size: int = 128) -> Image.Image:
    path = LOGOS / name
    if name.endswith(".png"):
        im = Image.open(path).convert("RGBA")
        return im.resize((size, size), Image.Resampling.LANCZOS)
    if cairosvg:
        png = cairosvg.svg2png(url=str(path), output_width=size, output_height=size)
        from io import BytesIO

        return Image.open(BytesIO(png)).convert("RGBA")
    # Fallback: white placeholder with filename
    im = Image.new("RGBA", (size, size), (240, 240, 240, 255))
    return im


def main() -> None:
    cell = 140
    pad = 12
    n = len(NAMES)
    canvas = Image.new("RGB", (n * cell + pad, cell + pad), (20, 22, 28))
    for i, name in enumerate(NAMES):
        try:
            logo = load(name, 112)
        except Exception as e:
            print("fail", name, e)
            continue
        # white plate like UI
        plate = Image.new("RGBA", (112, 112), (255, 255, 255, 255))
        if logo.mode != "RGBA":
            logo = logo.convert("RGBA")
        plate.alpha_composite(logo)
        x = pad // 2 + i * cell + 14
        y = pad // 2 + 14
        canvas.paste(plate.convert("RGB"), (x, y))
        print("ok", name)
    canvas.save(OUT)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
