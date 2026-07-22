/** Barra de progreso de carrera (solo presentación). */
export function YearRail({
  year,
  turn,
  totalTurns,
}: {
  year: number;
  turn: number;
  totalTurns: number;
}) {
  const pct = Math.min(100, Math.round(((turn + 1) / totalTurns) * 100));
  return (
    <div className="year-rail">
      <div className="year-rail-meta">
        <span className="year">{year}</span>
        <span className="tiny">
          Turno {turn + 1}/{totalTurns}
        </span>
      </div>
      <div className="track" aria-hidden>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
