# 各MP3から100本ぶんの波形ピークを算出しJSON化する
import subprocess, json, os, sys, array

d = sys.argv[1]
BARS = 100
out = {}

for f in sorted(n for n in os.listdir(d) if n.endswith('.mp3')):
    # ピーク算出用にモノラル8kHzの生PCMへデコード
    raw = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', os.path.join(d, f),
         '-ac', '1', '-ar', '8000', '-f', 's16le', '-'],
        capture_output=True, check=True).stdout

    samples = array.array('h')
    samples.frombytes(raw[:len(raw) // 2 * 2])
    n = len(samples)
    step = -(-n // BARS)

    peaks = []
    for i in range(BARS):
        seg = samples[i * step:(i + 1) * step]
        peaks.append(max((abs(v) for v in seg), default=0) / 32768)

    gain = max(peaks) or 1
    out['audio/' + f] = [round(v / gain, 2) for v in peaks]
    print(f'{f} -> ok (peak {gain:.3f})')

p = os.path.join(d, '..', 'waveform-peaks.json')
with open(p, 'w', encoding='utf-8') as fp:
    json.dump(out, fp, ensure_ascii=False, separators=(',', ':'))
print('\nJSON:', os.path.getsize(p), 'bytes')
