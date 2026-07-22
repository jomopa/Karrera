import { motion, useReducedMotion } from 'framer-motion';
import { formatEuro } from '../engine/patrimony';
import { useGame } from '../store';

export function Legacy() {
  const player = useGame((s) => s.player);
  const legacy = useGame((s) => s.legacy);
  const reset = useGame((s) => s.reset);
  const reduce = useReducedMotion();
  if (!player || !legacy) return null;
  const p = legacy.patrimony;

  return (
    <div className="stack" style={{ flex: 1 }}>
      <div className="masthead-rule" style={{ marginBottom: 4 }}>
        Fin de ciclo · {player.year}
      </div>

      {legacy.ultraRare && <div className="ultra">{legacy.ultraRare}</div>}

      <motion.div
        className="legacy-card"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="eyebrow">{legacy.arc}</div>
        <h2 className="legacy-headline">{legacy.title}</h2>
        <p className="lead" style={{ marginTop: 14 }}>
          {legacy.blurb}
        </p>
        <div className="peak-badge">Cargo más alto · {legacy.peakTitle}</div>
      </motion.div>

      <div className="score-hero">
        <span className="eyebrow">Índice de legado</span>
        <span className="score-num">{legacy.score}</span>
      </div>

      <div className="panel">
        {legacy.lines.map((line) => (
          <p key={line} className="legacy-line">
            {line}
          </p>
        ))}
      </div>

      <div className="panel patrimony">
        <div className="eyebrow">Patrimonio (estimado)</div>
        <div className="pat-row">
          <span>Sueldos de cargos</span>
          <strong>{formatEuro(p.salaries)}</strong>
        </div>
        <div className="pat-row shady">
          <span>Por debajo de la manta</span>
          <strong>{formatEuro(p.underTable)}</strong>
        </div>
        <div className="pat-row total">
          <span>Total</span>
          <strong>{formatEuro(p.total)}</strong>
        </div>
        <p className="tiny" style={{ marginTop: 10 }}>
          {p.ethicsNote}
        </p>
        <p className="tiny" style={{ marginTop: 4, color: 'var(--accent)' }}>
          {p.joke}
        </p>
      </div>

      <div className="spacer" />
      <div className="cta-sticky">
        <button className="btn btn-primary btn-block" onClick={reset}>
          Otra carrera
        </button>
      </div>
    </div>
  );
}
