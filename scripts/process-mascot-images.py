"""Regenerate transparent mascot WebP/PNG assets from opaque source PNGs in public/mascot/."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'mascot'
NAMES = ('dog-happy', 'dog-sad', 'dog-tired', 'dog-excited')
TOLERANCE = 34
MAX_SIZE = 768
ALPHA_DILATE = 3
PADDING_RATIO = 0.1
TOP_EXTRA_PADDING_RATIO = 0.04


def is_background(rgb: tuple[int, int, int], ref: tuple[int, int, int]) -> bool:
    r, g, b = rgb
    if max(abs(r - ref[0]), abs(g - ref[1]), abs(b - ref[2])) <= TOLERANCE:
        return True
    return r > 238 and g > 232 and b > 215


def remove_background(im: Image.Image) -> Image.Image:
    rgba = im.convert('RGBA')
    w, h = rgba.size
    pixels = rgba.load()
    ref = pixels[0, 0][:3]
    visited: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited or x < 0 or y < 0 or x >= w or y >= h:
            continue
        visited.add((x, y))
        px = pixels[x, y]
        if is_background(px[:3], ref):
            pixels[x, y] = (px[0], px[1], px[2], 0)
            queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    return rgba


def content_bbox(im: Image.Image, alpha_threshold: int = 128) -> tuple[int, int, int, int]:
    w, h = im.size
    pixels = im.load()
    coords = [(x, y) for y in range(h) for x in range(w) if pixels[x, y][3] >= alpha_threshold]
    if not coords:
        return 0, 0, w - 1, h - 1
    xs, ys = zip(*coords)
    return min(xs), min(ys), max(xs), max(ys)


def pad_and_fit(im: Image.Image) -> Image.Image:
    x0, y0, x1, y1 = content_bbox(im)
    content_w = x1 - x0 + 1
    content_h = y1 - y0 + 1
    pad = int(max(content_w, content_h) * PADDING_RATIO)
    top_extra = int(content_h * TOP_EXTRA_PADDING_RATIO)

    left = max(0, x0 - pad)
    right = min(im.width, x1 + pad + 1)
    top = max(0, y0 - pad - top_extra)
    bottom = min(im.height, y1 + pad + 1)

    cropped = im.crop((left, top, right, bottom))

    side = max(cropped.width, cropped.height)
    canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    offset_x = (side - cropped.width) // 2
    offset_y = (side - cropped.height) // 2
    canvas.paste(cropped, (offset_x, offset_y), cropped)
    canvas.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)
    return canvas


def soften_alpha_fringe(im: Image.Image) -> Image.Image:
    r, g, b, a = im.split()
    a = a.filter(ImageFilter.MaxFilter(ALPHA_DILATE))
    return Image.merge('RGBA', (r, g, b, a))


def process_file(src: Path, transparent: Path, webp: Path) -> None:
    cutout = remove_background(Image.open(src))
    cutout = soften_alpha_fringe(cutout)
    fitted = pad_and_fit(cutout)
    fitted.save(transparent, 'PNG', optimize=True)
    fitted.save(webp, 'WEBP', lossless=True)


def main() -> None:
    for name in NAMES:
        src = ROOT / f'{name}.png'
        transparent = ROOT / f'{name}-transparent.png'
        webp = ROOT / f'{name}.webp'
        process_file(src, transparent, webp)
        print(f'processed {name} -> {webp.name} ({Image.open(webp).size[0]}px)')


if __name__ == '__main__':
    main()
