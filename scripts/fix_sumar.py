from PIL import Image
from pathlib import Path

src = Image.open(r"C:\Users\Jorge\Desktop\Karrera\public\logos\_src\sumar_icon.svg").convert("RGBA")
# Drop weserv header bar (solid dark rows at top)
cropped = src.crop((0, 40, src.width, src.height))
# Make leftover near-black opaque pixels transparent (keep brand pink)
px = cropped.load()
for y in range(cropped.height):
    for x in range(cropped.width):
        r, g, b, a = px[x, y]
        if a > 0 and r < 45 and g < 45 and b < 45:
            px[x, y] = (0, 0, 0, 0)

SIZE = 512
PAD = 0.14
bg = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 255))
max_inner = int(SIZE * (1 - 2 * PAD))
ratio = min(max_inner / cropped.width, max_inner / cropped.height)
nw = max(1, int(cropped.width * ratio))
nh = max(1, int(cropped.height * ratio))
resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)
bg.alpha_composite(resized, ((SIZE - nw) // 2, (SIZE - nh) // 2))
out = Path(r"C:\Users\Jorge\Desktop\Karrera\public\logos\sumar.png")
bg.convert("RGB").save(out, "PNG", optimize=True)
print("sumar clean", out.stat().st_size, nw, nh)
