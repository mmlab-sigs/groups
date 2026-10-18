"""Build display-sized WebP copies and dimensions, leaving source images intact.

Run with Python and Pillow installed: python3 scripts/optimize-images.py
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
images = root / 'self-evolving-embodied-agents-group/assets/images'
output = images / 'optimized'
manifest = {}
# The existing publication figures include known 133-megapixel source images.
Image.MAX_IMAGE_PIXELS = 150_000_000
source_bytes = display_bytes = 0
for source in sorted(images.rglob('*')):
    if output in source.parents or source.suffix.lower() not in ('.jpg', '.jpeg', '.png'):
        continue
    relative = source.relative_to(images)
    target = output / (str(relative) + '.webp')
    target.parent.mkdir(parents=True, exist_ok=True)
    max_width = 1600 if source.name.startswith('group_photo') else 1000
    if source.parent.name == 'team' and not source.name.startswith('group_photo'):
        max_width = 480
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        if image.width > max_width:
            image.thumbnail((max_width, round(image.height * max_width / image.width)),
                            Image.Resampling.LANCZOS)
        if image.mode not in ('RGB', 'RGBA'):
            image = image.convert('RGBA' if 'transparency' in image.info else 'RGB')
        image.save(target, 'WEBP', quality=90, method=6)
        manifest[relative.as_posix()] = {'width': image.width, 'height': image.height}
    source_bytes += source.stat().st_size
    display_bytes += target.stat().st_size
(root / '_data/seea/image_variants.json').write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'{len(manifest)} images: {source_bytes:,} -> {display_bytes:,} bytes')
