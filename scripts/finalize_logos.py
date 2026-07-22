from pathlib import Path
import re

ROOT = Path(r"C:\Users\Jorge\Desktop\Karrera\public\logos")
SRC = ROOT / "_src"

# Ciudadanos: exact 400 square, white plate behind orange bubble
src = (SRC / "cs_src.svg").read_text(encoding="utf-8")
m = re.search(r"<svg\b([^>]*)>(.*)</svg>", src, re.S | re.I)
inner = m.group(2)
(ROOT / "ciudadanos.svg").write_text(
    f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="512" height="512">
  <rect width="400" height="400" fill="#ffffff"/>
{inner}
</svg>
''',
    encoding="utf-8",
)
print("ciudadanos ok")

# Podemos: perfect square purple canvas
src = (SRC / "podemos_circles.svg").read_text(encoding="utf-8")
m = re.search(r"<svg\b([^>]*)>(.*)</svg>", src, re.S | re.I)
inner = m.group(2)
side = 574.28571
oy = -(side - 568.57141) / 2
(ROOT / "podemos.svg").write_text(
    f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {oy} {side} {side}" width="512" height="512">
  <rect x="0" y="{oy}" width="{side}" height="{side}" fill="#6B1F5F"/>
{inner}
</svg>
''',
    encoding="utf-8",
)
print("podemos ok")

# IU: already rebuilt; tighten pad to 8%
src = (SRC / "iu_src.svg").read_text(encoding="utf-8")
m = re.search(r"<svg\b([^>]*)>(.*)</svg>", src, re.S | re.I)
inner = m.group(2)
art_w, art_h = 209.596, 222.201
side = max(art_w, art_h)
margin = side * 0.08
ox = -(side - art_w) / 2 - margin
oy = -(side - art_h) / 2 - margin
sq = side + 2 * margin
(ROOT / "iu.svg").write_text(
    f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox} {oy} {sq} {sq}" width="512" height="512">
  <rect x="{ox}" y="{oy}" width="{sq}" height="{sq}" fill="#ffffff"/>
{inner}
</svg>
''',
    encoding="utf-8",
)
print("iu ok")

# Vox: official letterforms on green square (avatar style — readable at 18px)
src = (SRC / "vox_src.svg").read_text(encoding="utf-8")
m = re.search(r"<svg\b([^>]*)>(.*)</svg>", src, re.S | re.I)
inner = m.group(2).replace("fill:#5ac035", "fill:#ffffff").replace("fill:#5AC035", "fill:#ffffff")
SIZE = 512
PAD = 0.14
art_w, art_h = 365.0, 175.88377
inner_box = SIZE * (1 - 2 * PAD)
scale = min(inner_box / art_w, inner_box / art_h)
tw, th = art_w * scale, art_h * scale
tx = (SIZE - tw) / 2
ty = (SIZE - th) / 2
(ROOT / "vox.svg").write_text(
    f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">
  <rect width="{SIZE}" height="{SIZE}" fill="#5AC035"/>
  <g transform="translate({tx},{ty}) scale({scale})">
{inner}
  </g>
</svg>
''',
    encoding="utf-8",
)
print("vox ok")

# HTML preview
names = ["psoe", "pp", "iu", "upyd", "podemos", "ciudadanos", "vox", "sumar"]
cells = []
for n in names:
    ext = "png" if n == "sumar" else "svg"
    cells.append(
        f'<div class="cell"><div class="plate"><img src="{n}.{ext}" alt="{n}"/></div><p>{n}</p></div>'
    )
html = f"""<!doctype html>
<html lang="es"><meta charset="utf-8"/><title>Karrera logos</title>
<style>
body{{margin:0;background:#0b0d10;color:#f2f3f5;font-family:system-ui;padding:28px}}
h1{{font-size:1rem;font-weight:600;margin:0 0 18px;opacity:.8}}
.row{{display:flex;flex-wrap:wrap;gap:18px}}
.plate{{width:80px;height:80px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #ffffff22;display:grid;place-items:center}}
.plate img{{width:100%;height:100%;object-fit:contain;display:block}}
.plate.sm{{width:28px;height:28px;border-radius:7px}}
.plate.md{{width:48px;height:48px;border-radius:10px}}
p{{margin:8px 0 0;font-size:12px;opacity:.65;text-align:center}}
.cell{{display:flex;flex-direction:column;align-items:center}}
section{{margin-bottom:28px}}
</style>
<body>
<h1>Logos cuadrados reales — UI sizes</h1>
<section><div class="row">{"".join(cells)}</div></section>
<section><h1>18px (poll strip)</h1><div class="row">{"".join(
    f'<div class="cell"><div class="plate sm"><img src="{n}.{"png" if n=="sumar" else "svg"}"/></div></div>'
    for n in names
)}</div></section>
<section><h1>36px (create / HUD)</h1><div class="row">{"".join(
    f'<div class="cell"><div class="plate md"><img src="{n}.{"png" if n=="sumar" else "svg"}"/></div></div>'
    for n in names
)}</div></section>
</body></html>
"""
(ROOT / "_preview.html").write_text(html, encoding="utf-8")
print("preview ok")
