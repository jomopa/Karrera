from pathlib import Path
import re

SRC = Path(r"C:\Users\Jorge\Desktop\Karrera\public\logos\_src\vox_src.svg")
OUT = Path(r"C:\Users\Jorge\Desktop\Karrera\public\logos\vox.svg")

src = SRC.read_text(encoding="utf-8")
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
OUT.write_text(
    f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">
  <rect width="{SIZE}" height="{SIZE}" fill="#5AC035"/>
  <g transform="translate({tx},{ty}) scale({scale})">
{inner}
  </g>
</svg>
''',
    encoding="utf-8",
)
print("vox green avatar", OUT.stat().st_size)
