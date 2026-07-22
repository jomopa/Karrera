import { YearRail } from '../components/YearRail';
import { READING_LABELS } from '../data/sala';
import { useGame } from '../store';
import type { SalaReading } from '../types';

const ROOM_LABEL: Record<string, string> = {
  aparato: 'Aparato',
  media: 'Media',
  calle: 'Calle',
  institucional: 'Institucional',
  intimidad: 'Intimidad',
  faccion: 'Facción',
};

export function SalaScreen() {
  const pending = useGame((s) => s.pendingSala);
  const player = useGame((s) => s.player);
  const answer = useGame((s) => s.answerSala);
  if (!pending || !player) return null;

  const { card, signals } = pending;

  return (
    <div className="stack fade-up" style={{ flex: 1 }} key={card.id}>
      <div className="row-between">
        <div className="brand">Karrera</div>
        <div className="pill">
          <strong>Sala</strong>
          <span>· {ROOM_LABEL[card.room] ?? card.room}</span>
        </div>
      </div>

      <YearRail year={pending.yearFrom} turn={player.turn} totalTurns={player.totalTurns} />

      <article className="event-card">
        <div className="eyebrow">Lectura de sala · {pending.yearFrom}</div>
        <h2 className="h2" style={{ marginTop: 8 }}>
          {card.frame}
        </h2>
        <p className="lead" style={{ marginTop: 10 }}>
          Tres señales. Una lectura. Sin azar en el veredicto.
        </p>
        <ul className="sala-signals">
          {signals.map((s, i) => (
            <li key={`${i}-${s.text}`}>{s.text}</li>
          ))}
        </ul>
      </article>

      <div className="choice-stack">
        {card.options.map((opt) => (
          <button
            key={opt}
            className="choice-btn choice-safe"
            onClick={() => answer(opt as SalaReading)}
          >
            <span className="choice-label">{READING_LABELS[opt]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
