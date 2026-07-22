import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

const SEG_W = 72;
const SEG_COUNT = 48;
const LAND_INDEX = 28;

type Props = {
  win: boolean;
  onDone: () => void;
};

export function ShadowRoulette({ win, onDone }: Props) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<'spin' | 'done'>('spin');
  const doneRef = useRef(false);

  const segments = useMemo(() => {
    const out: boolean[] = [];
    for (let i = 0; i < SEG_COUNT; i++) {
      if (i % 5 === 0 || i % 5 === 2 || i % 5 === 3) out.push(true);
      else out.push(false);
    }
    out[LAND_INDEX] = win;
    return out;
  }, [win]);

  const targetX = useMemo(() => {
    const center = typeof window !== 'undefined' ? Math.min(440, window.innerWidth) / 2 - 16 : 200;
    return -(LAND_INDEX * SEG_W + SEG_W / 2 - center);
  }, []);

  useEffect(() => {
    let landTimer: number | undefined;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setPhase('done');
      landTimer = window.setTimeout(() => onDone(), reduce ? 200 : 700);
    };
    const ms = reduce ? 400 : 2900;
    const spinTimer = window.setTimeout(finish, ms);
    return () => {
      window.clearTimeout(spinTimer);
      if (landTimer != null) window.clearTimeout(landTimer);
    };
  }, [reduce, onDone]);

  if (reduce) {
    return (
      <div className={`shadow-roulette reduced ${win ? 'land-win' : 'land-lose'}`}>
        <div className="shadow-roulette-result-flash">{win ? 'ATAJO' : 'PRECIPICIO'}</div>
      </div>
    );
  }

  return (
    <div className={`shadow-roulette ${phase === 'done' ? (win ? 'land-win' : 'land-lose') : ''}`}>
      <div className="shadow-roulette-pointer" aria-hidden />
      <div className="shadow-roulette-window">
        <div
          className="shadow-roulette-track"
          style={{ '--shadow-target-x': `${targetX}px` } as CSSProperties}
        >
          {segments.map((good, i) => (
            <div
              key={i}
              className={`shadow-seg ${good ? 'seg-good' : 'seg-bad'} ${i === LAND_INDEX && phase === 'done' ? 'seg-land' : ''}`}
            >
              {good ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>
      {phase === 'done' && (
        <div className="shadow-roulette-result-flash">{win ? 'ATAJO' : 'PRECIPICIO'}</div>
      )}
    </div>
  );
}
