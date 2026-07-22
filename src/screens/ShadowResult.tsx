import { PartyLogo } from '../components/PartyLogo';
import { getOffice, getParty } from '../data/catalog';
import { useGame } from '../store';

export function ShadowResult() {
  const beat = useGame((s) => s.shadowBeat);
  const player = useGame((s) => s.player);
  const cont = useGame((s) => s.continueAfterShadow);

  if (!beat || !player) return null;

  const party = getParty(beat.partyAfter);
  const ratingDelta = beat.ratingAfter - beat.ratingBefore;
  const tierUp = getOffice(beat.toOffice).tier > getOffice(beat.fromOffice).tier;

  return (
    <div
      className={`stack fade-up result-${beat.valence} shadow-result`}
      style={{ flex: 1 }}
      key={beat.offerId + String(beat.win)}
    >
      <div className="row-between">
        <div className="eyebrow">Trato en la sombra</div>
        <div className={`quality-badge ${beat.win ? 'q-ex' : 'q-boom'}`}>
          {beat.win ? 'Atajo' : 'Precipicio'}
        </div>
      </div>

      <div className="tiny">
        Jugaste a <strong>{beat.title}</strong>
      </div>

      <div className={`outcome-banner valence-${beat.valence}`}>
        <div className="eyebrow">{beat.win ? 'Te sale' : 'Te golpea'}</div>
        <h2 className="h2 reaction-line">{beat.punch}</h2>
      </div>

      <div className="panel career-flash">
        <div className="tiny">{tierUp ? 'Salto' : beat.win ? 'Cargo' : 'Caída'}</div>
        <div className="from-to">
          <span>{getOffice(beat.fromOffice).title}</span>
          <span className="arrow">→</span>
          <strong>{getOffice(beat.toOffice).title}</strong>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
          <PartyLogo id={beat.partyAfter} size={24} />
          <span className="tiny" style={{ color: party.color }}>
            {party.short}
          </span>
          <span className="rating-pill" title="Puntuación de carrera">
            {beat.ratingBefore}
            {ratingDelta !== 0 && (
              <span className={ratingDelta > 0 ? 'delta-good' : 'delta-bad'}>
                {ratingDelta > 0 ? ` +${ratingDelta}` : ` ${ratingDelta}`}
              </span>
            )}
            {ratingDelta === 0 ? ' → ' : ' → '}
            <strong>{beat.ratingAfter}</strong>
          </span>
        </div>
        <div className="stim-row">
          {beat.stim.map((s) => (
            <span key={s} className="stim">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="spacer" />
      <button className="btn btn-primary btn-block" onClick={cont}>
        Seguir a la hemeroteca
      </button>
    </div>
  );
}
