"""Normalize real party logos into perfect 512x512 squares for UI."""
from __future__ import annotations

import base64
import re
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "logos" / "_src"
OUT = ROOT / "public" / "logos"
SIZE = 512
PAD = 0.12  # inner padding ratio


def write(name: str, svg: str) -> None:
    path = OUT / name
    path.write_text(svg.strip() + "\n", encoding="utf-8")
    print(f"wrote {name} ({path.stat().st_size} bytes)")


def read_src(name: str) -> str:
    return (SRC / name).read_text(encoding="utf-8")


def strip_xml_junk(svg: str) -> str:
    svg = re.sub(r"<\?xml[^>]*>", "", svg)
    svg = re.sub(r"<!DOCTYPE[^>]*>", "", svg, flags=re.I)
    return svg.strip()


def copy_as_square(src_name: str, out_name: str, bg: str | None = None) -> None:
    """Take an already-near-square SVG and force a clean 512 viewBox with optional bg."""
    raw = strip_xml_junk(read_src(src_name))
    # Extract inner content between <svg...> and </svg>
    m = re.search(r"<svg\b([^>]*)>(.*)</svg>", raw, re.S | re.I)
    if not m:
        raise RuntimeError(f"no svg root in {src_name}")
    attrs, inner = m.group(1), m.group(2)
    vb = re.search(r'viewBox\s*=\s*"([^"]+)"', attrs)
    if vb:
        parts = [float(x) for x in vb.group(1).replace(",", " ").split()]
        vx, vy, vw, vh = parts[0], parts[1], parts[2], parts[3]
    else:
        w = re.search(r'\bwidth\s*=\s*"([0-9.]+)', attrs)
        h = re.search(r'\bheight\s*=\s*"([0-9.]+)', attrs)
        vw = float(w.group(1)) if w else 512
        vh = float(h.group(1)) if h else 512
        vx, vy = 0.0, 0.0

    side = max(vw, vh)
    # Center original art in square, then add PAD margin
    ox = vx - (side - vw) / 2
    oy = vy - (side - vh) / 2
    # Expand by PAD
    margin = side * PAD
    sq = side + 2 * margin
    ox -= margin
    oy -= margin

    bg_rect = f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else ""
    # Map source square into 0..SIZE via viewBox
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox} {oy} {sq} {sq}" width="{SIZE}" height="{SIZE}">
{bg_rect}
{inner}
</svg>'''
    write(out_name, out)


def wrap_image_square(png_name: str, out_name: str, bg: str = "#ffffff") -> None:
    """Center a raster logo on a square canvas and emit SVG with embedded PNG."""
    img = Image.open(SRC / png_name).convert("RGBA")
    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    # paint bg
    bg_rgb = tuple(int(bg.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4)) + (255,)
    canvas.paste(Image.new("RGBA", (SIZE, SIZE), bg_rgb))

    max_inner = int(SIZE * (1 - 2 * PAD))
    ratio = min(max_inner / img.width, max_inner / img.height)
    nw, nh = max(1, int(img.width * ratio)), max(1, int(img.height * ratio))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (SIZE - nw) // 2
    y = (SIZE - nh) // 2
    canvas.alpha_composite(resized, (x, y))

    # Prefer crisp PNG output for Sumar wordmark
    out_png = OUT / out_name.replace(".svg", ".png")
    canvas.convert("RGB").save(out_png, "PNG", optimize=True)
    print(f"wrote {out_png.name} ({out_png.stat().st_size} bytes)")


def build_vox_square() -> None:
    """Official VOX wordmark (Wikimedia) centered on white square."""
    raw = strip_xml_junk(read_src("vox_src.svg"))
    m = re.search(r"<svg\b([^>]*)>(.*)</svg>", raw, re.S | re.I)
    if not m:
        raise RuntimeError("vox parse fail")
    inner = m.group(2)
    art_w, art_h = 365.0, 175.88377
    inner_box = SIZE * (1 - 2 * PAD)
    scale = min(inner_box / art_w, inner_box / art_h)
    tw, th = art_w * scale, art_h * scale
    tx = (SIZE - tw) / 2
    ty = (SIZE - th) / 2
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">
  <rect width="{SIZE}" height="{SIZE}" fill="#ffffff"/>
  <g transform="translate({tx},{ty}) scale({scale})">
{inner}
  </g>
</svg>'''
    write("vox.svg", out)


def build_podemos_square() -> None:
    """Three circles on purple — already nearly square; normalize to 512."""
    raw = strip_xml_junk(read_src("podemos_circles.svg"))
    m = re.search(r"<svg\b([^>]*)>(.*)</svg>", raw, re.S | re.I)
    if not m:
        raise RuntimeError("podemos parse fail")
    inner = m.group(2)
    # Source art is 574.28 x 568.57 with purple rect included
    art_w, art_h = 574.28571, 568.57141
    side = max(art_w, art_h)
    # No extra white pad — fill the square (brand purple already in art). Tiny pad for safety.
    margin = side * 0.02
    ox = -(side - art_w) / 2 - margin
    oy = -(side - art_h) / 2 - margin
    sq = side + 2 * margin
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox} {oy} {sq} {sq}" width="{SIZE}" height="{SIZE}">
  <rect x="{ox}" y="{oy}" width="{sq}" height="{sq}" fill="#6B1F5F"/>
{inner}
</svg>'''
    write("podemos.svg", out)


def build_iu_square() -> None:
    raw = strip_xml_junk(read_src("iu_src.svg"))
    m = re.search(r"<svg\b([^>]*)>(.*)</svg>", raw, re.S | re.I)
    if not m:
        raise RuntimeError("iu parse fail")
    attrs, inner = m.group(1), m.group(2)
    art_w, art_h = 209.596, 222.201
    vb = re.search(r'viewBox\s*=\s*"([^"]+)"', attrs)
    if vb:
        parts = [float(x) for x in vb.group(1).replace(",", " ").split()]
        vx, vy, art_w, art_h = parts
    else:
        vx = vy = 0.0
    side = max(art_w, art_h)
    margin = side * PAD
    ox = vx - (side - art_w) / 2 - margin
    oy = vy - (side - art_h) / 2 - margin
    sq = side + 2 * margin
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox} {oy} {sq} {sq}" width="{SIZE}" height="{SIZE}">
  <rect x="{ox}" y="{oy}" width="{sq}" height="{sq}" fill="#ffffff"/>
{inner}
</svg>'''
    write("iu.svg", out)


def build_cs_square() -> None:
    # Ciudadanos-icono.svg is already 400x400 with orange speech-bubble + Cs
    copy_as_square("cs_src.svg", "ciudadanos.svg", bg=None)


def build_upyd_square() -> None:
    # Compact anagram is square; put on magenta so white disk reads on white UI chrome
    raw = strip_xml_junk(read_src("upyd_src.svg"))
    m = re.search(r"<svg\b([^>]*)>(.*)</svg>", raw, re.S | re.I)
    if not m:
        raise RuntimeError("upyd parse fail")
    inner = m.group(2)
    # viewBox 0 0 285.43 285.43
    art = 285.43308
    margin = art * 0.06
    ox = -margin
    oy = -margin
    sq = art + 2 * margin
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox} {oy} {sq} {sq}" width="{SIZE}" height="{SIZE}">
  <rect x="{ox}" y="{oy}" width="{sq}" height="{sq}" fill="#EC008C"/>
{inner}
</svg>'''
    write("upyd.svg", out)


def build_psoe_pp() -> None:
    # Already authentic square marks
    shutil.copy2(SRC / "psoe_src.svg", OUT / "psoe.svg")
    print(f"wrote psoe.svg ({(OUT / 'psoe.svg').stat().st_size} bytes)")
    shutil.copy2(SRC / "pp_src.svg", OUT / "pp.svg")
    print(f"wrote pp.svg ({(OUT / 'pp.svg').stat().st_size} bytes)")
    # keep alt
    shutil.copy2(SRC / "pp_src.svg", OUT / "pp_alt.svg")


def build_sumar_square() -> None:
    """Center official Sumar wordmark PNG on white square."""
    wrap_image_square("sumar_png.png", "sumar.png", bg="#ffffff")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    build_psoe_pp()
    build_iu_square()
    build_upyd_square()
    build_podemos_square()
    build_cs_square()
    build_vox_square()
    build_sumar_square()
    # cleanup temp downloads optional — keep for now
    print("done")


if __name__ == "__main__":
    main()
