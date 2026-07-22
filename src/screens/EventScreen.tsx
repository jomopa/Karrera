import { PartyLogo } from '../components/PartyLogo';
import { PollStrip } from '../components/PollStrip';
import { YearRail } from '../components/YearRail';
import { getPersonality } from '../data/personalities';
import { situationalHook } from '../data/historian';
import { getOffice, getParty } from '../data/catalog';
import { useGame } from '../store';

function twoSentences(lore: string): string {
  const parts = lore.match(/[^.!?]+[.!?]+/g);
  if (!parts || parts.length === 0) return lore;
  return parts.slice(0, 2).join('').trim();
}

function promiseHint(kind: 'safe' | 'risk', hint: string): string {
  const promise = kind === 'safe' ? 'mantienes el sitio' : 'puedes saltar… o portada';
  const h = hint.trim();
  if (!h) return promise;
  if (h.includes('mantienes') || h.includes('puedes saltar')) return h;
  return `${h} · ${promise}`;
}

export function EventScreen() {
  const player = useGame((s) => s.player);
  const pending = useGame((s) => s.pending);
  const choose = useGame((s) => s.choose);
  if (!player || !pending) return null;

  const party = getParty(player.party);
  const office = getOffice(player.office);
  const personality = getPersonality(player.personality);
  const { event, variant } = pending;
  const hook = situationalHook(player, variant.hook);

  return (
    <div className="stack" style={{ flex: 1 }} key={event.id + variant.id + player.turn}>
      <div className="hud-bar">
        <div className="hud-identity">
          <PartyLogo id={player.party} size={36} />
          <div style={{ minWidth: 0 }}>
            <div className="name-row">
              <span>{player.name}</span>
              <span className="rating-pill" title="Puntuación de carrera (50–99)">
                {player.rating}
              </span>
            </div>
            <div className="tiny">
              {office.title} · <span style={{ color: party.color }}>{party.short}</span>
              {' · '}
              {personality.name.replace(/^El /, '')}
            </div>
          </div>
        </div>
      </div>

      <YearRail year={pending.yearFrom} turn={player.turn} totalTurns={player.totalTurns} />

      <article className="event-card">
        <div className="eyebrow">Hemeroteca · {event.year}</div>
        <h2 className="h2 event-title" style={{ marginTop: 10 }}>
          {event.title}
        </h2>
        <p className="lead" style={{ marginTop: 12 }}>
          {twoSentences(event.lore)}
        </p>
        <p className="hook" style={{ marginTop: 14 }}>
          {hook}
        </p>
      </article>

      <PollStrip polls={pending.polls} highlightParty={player.party} />

      <div className="choice-stack">
        <button className="choice-btn choice-safe" onClick={() => choose('safe')}>
          <span className="choice-tag">Seguro</span>
          <span className="choice-label">{variant.safe.label}</span>
          <span className="hint">{promiseHint('safe', variant.safe.hint)}</span>
        </button>
        <button className="choice-btn choice-risk" onClick={() => choose('risk')}>
          <span className="choice-tag">Riesgo</span>
          <span className="choice-label">{variant.risk.label}</span>
          <span className="hint">{promiseHint('risk', variant.risk.hint)}</span>
          {variant.risk.switchTo ? (
            <span className="hint">→ posible salto a {getParty(variant.risk.switchTo).short}</span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
