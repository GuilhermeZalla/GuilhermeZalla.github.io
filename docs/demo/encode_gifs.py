"""Assemble actual browser frames; Pillow is a documentation-only dependency."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / '.asset-work' / 'python'))
from PIL import Image

manifest_path = Path(sys.argv[1])
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
for demo in manifest['demos']:
    frames = []
    for filename in demo['frames']:
        with Image.open(filename) as image:
            width = demo['outputWidth']
            height = round(image.height * width / image.width)
            frame = image.convert('RGB').resize((width, height), Image.Resampling.LANCZOS)
            frames.append(frame.quantize(colors=128, method=Image.Quantize.MEDIANCUT))
    output = ROOT / demo['file']
    frames[0].save(output, save_all=True, append_images=frames[1:], duration=demo['frameDuration'], loop=0, optimize=True, disposal=1)
    with Image.open(output) as gif:
        assert gif.n_frames > 1, f'Not animated: {output}'
        assert gif.width == demo['outputWidth']
        duration = 0
        for index in range(gif.n_frames):
            gif.seek(index)
            duration += gif.info.get('duration', 0)
        demo.update(encodedFrames=gif.n_frames, durationMs=duration, bytes=output.stat().st_size, outputHeight=gif.height)
    print(f'{output.name}: {demo["encodedFrames"]} frames, {duration / 1000:.1f}s, {output.stat().st_size:,} bytes', flush=True)
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
