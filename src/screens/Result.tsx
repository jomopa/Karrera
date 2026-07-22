import { motion, useReducedMotion } from 'framer-motion';
import { PartyLogo } from '../components/PartyLogo';
import { getOffice, getParty } from '../data/catalog';
import { isFinished } from '../engine/game';
import { useGame } from '../store';
import type { Quality } from '../types';

const Q_LABEL: Record<Quality, string> = {
  excelente: 'Encaja',
  bien: 'Sale bien',
  tirando: 'Tira',
  mal: 'Se tuerce',
  escandalo: 'Revienta',
};

const Q_CLASS: Record<Quality, string> = {
  excelente: 'q-ex',
  bien: 'q-ok',
  tirando: 'q-mid',
  mal: 'q-bad',
  escandalo: 'q-boom',
};

const VALENCE_TITLE = {
  up: 'Te sale',
  flat: 'Tablas',
  down: 'Te golpea',
} as const;

export function Result() {
  const beat = useGame((s) => s.beat);
  const player = useGame((s) => s.player);
  const cont = useGame((s) => s.continueAfterResult);
  const reduce = useReducedMotion();

  if (!beat || !player) return null;

  const party = getParty(beat.partyAfter);
  const ratingDelta = beat.ratingAfter - beat.ratingBefore;
  const tierUp = getOffice(beat.toOffice).tier > getOffice(beat.fromOffice).tier;
  const tierDown = getOffice(beat.toOffice).tier < getOffice(beat.fromOffice).tier;
  const cargoLabel = tierUp ? 'Ascenso' : tierDown ? 'Caída' : 'Cargo';
  const punch = beat.punch ?? beat.support;

  return (
    <div
      className={`stack result-${beat.valence}`}
      style={{ flex: 1 }}
      key={beat.yearTo + beat.toOffice + punch}
    >
      <div className="row-between">
        <div className="eyebrow">
          {beat.yearFrom}–{beat.yearTo}
        </div>
        <motion.div
          className={`quality-badge ${Q_CLASS[beat.quality]}`}
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {Q_LABEL[beat.quality]}
        </motion.div>
      </div>

      <motion.div
        className={`outcome-banner valence-${beat.valence}`}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="eyebrow">{VALENCE_TITLE[beat.valence]}</div>
        <h2 className="h2 reaction-line">{punch}</h2>
      </motion.div>

      <motion.div
        className="panel career-flash"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.12, duration: 0.28 }}
      >
        <div className="tiny">{cargoLabel}</div>
        <div className="from-to">
          <span>{getOffice(beat.fromOffice).title}</span>
          <span className="arrow">→</span>
          <strong>{getOffice(beat.toOffice).title}</strong>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
          <PartyLogo id={beat.partyAfter} size={24} />
          <span className="tiny" style={{ color: party.color }}>
            {party.short}
          </span>
          <span className={`rating-pill${ratingDelta !== 0 ? ' flash' : ''}`} title="Puntuación de carrera">
            {beat.ratingBefore}
            {ratingDelta !== 0 && (
              <span className={ratingDelta > 0 ? 'delta-good' : 'delta-bad'}>
                {ratingDelta > 0 ? ` +${ratingDelta}` : ` ${ratingDelta}`}
              </span>
            )}
            {' → '}
            <strong>{beat.ratingAfter}</strong>
          </span>
        </div>
      </motion.div>

      <div className="spacer" />
      <div className="cta-sticky">
        <button className="btn btn-primary btn-block" onClick={cont}>
          {isFinished(player) ? 'Ver legado' : 'Siguiente año'}
        </button>
      </div>
    </div>
  );
}
