from pathlib import Path
import re

ROOT = Path(r"C:\Users\Jorge\Desktop\Karrera\public\logos")
SRC = ROOT / "_src"

# Run finalize first pieces
exec(open(Path(r"C:\Users\Jorge\Desktop\Karrera\scripts\finalize_logos.py"), encoding="utf-8").read().replace("print(\"preview ok\")", "print(\"preview base\")"))

# Vox avatar: green square + white official letterforms
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
print("vox avatar ok")

# Confirm catalog paths
catalog = Path(r"C:\Users\Jorge\Desktop\Karrera\src\data\catalog.ts").read_text(encoding="utf-8")
for name in ["psoe.svg", "pp.svg", "iu.svg", "upyd.svg", "podemos.svg", "ciudadanos.svg", "vox.svg", "sumar.png"]:
    assert f"/logos/{name}" in catalog, name
    assert (ROOT / name).exists(), name
    print("catalog+file", name, (ROOT / name).stat().st_size)
