"""Regenerate transparent mascot WebP/PNG assets from opaque source PNGs in public/mascot/."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'mascot'
NAMES = ('dog-happy', 'dog-sad', 'dog-tired', 'dog-excited')
TOLERANCE = 34
MAX_SIZE = 512


def remove_corner_flood(src: Path, dst: Path) -> None:
    im = Image.open(src).convert('RGBA')
    w, h = im.size
    pixels = im.load()
    ref = pixels[0, 0][:3]
    visited: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])

    def is_bg(rgb: tuple[int, int, int]) -> bool:
        r, g, b = rgb
        if max(abs(r - ref[0]), abs(g - ref[1]), abs(b - ref[2])) <= TOLERANCE:
            return True
        return r > 238 and g > 232 and b > 215

    while q:
        x, y = q.popleft()
        if (x, y) in visited or x < 0 or y < 0 or x >= w or y >= h:
            continue
        visited.add((x, y))
        px = pixels[x, y]
        if is_bg(px[:3]):
            pixels[x, y] = (px[0], px[1], px[2], 0)
            q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    cleaned: list[tuple[int, int, int, int]] = []
    for r, g, b, a in im.getdata():
        if a == 0:
            cleaned.append((r, g, b, 0))
        elif r > 235 and g > 228 and b > 210 and a == 255:
            cleaned.append((r, g, b, 180))
        else:
            cleaned.append((r, g, b, a))
    im.putdata(cleaned)
    im.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)
    im.save(dst, 'PNG', optimize=True)


def main() -> None:
    for name in NAMES:
        src = ROOT / f'{name}.png'
        transparent = ROOT / f'{name}-transparent.png'
        webp = ROOT / f'{name}.webp'
        remove_corner_flood(src, transparent)
        Image.open(transparent).save(webp, 'WEBP', lossless=True)
        print(f'processed {name}')


if __name__ == '__main__':
    main()
