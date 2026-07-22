import { getOffice } from '../data/catalog';
import { useGame } from '../store';

const Q_LABEL = {
  excelente: 'Encaja',
  bien: 'Sale bien',
  tirando: 'Tira',
  mal: 'Se tuerce',
  escandalo: 'Revienta',
} as const;

export function SalaResult() {
  const beat = useGame((s) => s.salaBeat);
  const cont = useGame((s) => s.continueAfterSala);
  if (!beat) return null;

  const delta = beat.ratingAfter - beat.ratingBefore;
  const tierUp = getOffice(beat.toOffice).tier > getOffice(beat.fromOffice).tier;
  const tierDown = getOffice(beat.toOffice).tier < getOffice(beat.fromOffice).tier;
  const cargoLabel = tierUp ? 'Ascenso' : tierDown ? 'Caída' : 'Cargo';

  return (
    <div className={`stack fade-up result-${beat.valence}`} style={{ flex: 1 }} key={beat.cardId}>
      <div className="row-between">
        <div className="eyebrow">
          Lectura de sala · {beat.yearFrom}–{beat.yearTo}
        </div>
        <div className={`quality-badge ${beat.correct ? 'q-ok' : 'q-bad'}`}>
          {beat.correct ? 'Leíste bien' : 'Te comieron'} · {Q_LABEL[beat.quality]}
        </div>
      </div>

      <div className={`outcome-banner valence-${beat.valence}`}>
        <div className="eyebrow">{beat.correct ? 'Te sale' : 'Te golpea'}</div>
        <h2 className="h2 reaction-line">{beat.punch}</h2>
        <p className="tiny" style={{ marginTop: 12, opacity: 0.75 }}>
          Regla: {beat.lesson}
        </p>
      </div>

      <div className="panel career-flash">
        <div className="tiny">{cargoLabel}</div>
        <div className="from-to">
          <span>{getOffice(beat.fromOffice).title}</span>
          <span className="arrow">→</span>
          <strong>{getOffice(beat.toOffice).title}</strong>
        </div>
        {delta !== 0 && (
          <div className="from-to" style={{ marginTop: 8 }}>
            <span className="tiny">Índice</span>
            <span>{beat.ratingBefore}</span>
            <span className="arrow">→</span>
            <strong>{beat.ratingAfter}</strong>
            <span className={delta > 0 ? 'delta-good' : 'delta-bad'} style={{ marginLeft: 8 }}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          </div>
        )}
      </div>

      <div className="spacer" />
      <div className="cta-sticky">
        <button className="btn btn-primary btn-block" onClick={cont}>
          Seguir
        </button>
      </div>
    </div>
  );
}
