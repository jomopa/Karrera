import { PartyLogo } from './PartyLogo';
import { getParty } from '../data/catalog';
import type { PartyId, PollRow } from '../types';

/** Ranking compacto: top 3 + tu partido si no está arriba. */
export function PollStrip({
  polls,
  highlightParty,
}: {
  polls: PollRow[];
  highlightParty?: PartyId;
}) {
  const sorted = [...polls].sort((a, b) => b.pct - a.pct);
  const top = sorted.slice(0, 3);
  const you = highlightParty ? sorted.find((r) => r.party === highlightParty) : undefined;
  const showYou = you && !top.some((r) => r.party === highlightParty);
  const rows = showYou && you ? [...top, you] : top;
  const max = rows[0]?.pct || 1;

  return (
    <div className="poll-strip" title="Estimación de voto">
      <div className="poll-strip-head">
        <span className="eyebrow">Sondeo</span>
        <span className="tiny">estimación</span>
      </div>
      <div className="poll-rank">
        {rows.map((row) => {
          const party = getParty(row.party);
          const isYou = row.party === highlightParty;
          return (
            <div key={row.party} className={`poll-rank-row ${isYou ? 'highlight' : ''}`}>
              <PartyLogo id={row.party} size={22} />
              <div className="poll-rank-bar" aria-hidden>
                <span
                  style={{
                    width: `${Math.max(8, (row.pct / max) * 100)}%`,
                    ['--party' as string]: party.color,
                  }}
                />
              </div>
              <span className="poll-pct">{row.pct.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
