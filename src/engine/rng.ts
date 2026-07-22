export class Rng {
  private s: number;
  constructor(seed = Date.now() % 1e9) {
    this.s = (seed >>> 0) || 1;
  }
  next() {
    this.s = (this.s * 1664525 + 1013904223) >>> 0;
    return this.s / 0x100000000;
  }
  float(a = 0, b = 1) {
    return a + (b - a) * this.next();
  }
  chance(p: number) {
    return this.next() < p;
  }
  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.next() * arr.length)]!;
  }
  weighted<T extends { weight: number }>(items: T[]): T {
    const total = items.reduce((a, b) => a + Math.max(0, b.weight), 0);
    let r = this.next() * (total || 1);
    for (const it of items) {
      r -= Math.max(0, it.weight);
      if (r <= 0) return it;
    }
    return items[items.length - 1]!;
  }
}

export function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}
