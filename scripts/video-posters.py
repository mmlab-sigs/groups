"""Generate small preview posters. Requires opencv-python and Pillow."""
from pathlib import Path
import cv2
from PIL import Image

assets = Path(__file__).resolve().parents[1] / 'self-evolving-embodied-agents-group/assets'
output = assets / 'images/optimized/video-posters'
output.mkdir(parents=True, exist_ok=True)
for source in sorted((assets / 'videos/publications').glob('*.mp4')):
    video = cv2.VideoCapture(str(source))
    ok, frame = video.read()
    video.release()
    if not ok:
        raise RuntimeError(f'Cannot decode {source}')
    image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    image.thumbnail((640, 640))
    image.save(output / (source.name + '.webp'), 'WEBP', quality=85, method=6)
