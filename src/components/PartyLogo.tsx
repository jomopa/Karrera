import { getParty } from '../data/catalog';
import type { PartyId } from '../types';

/** Real square party marks from Wikimedia (icon / compact versions). */
export function PartyLogo({
  id,
  size = 32,
  className = '',
}: {
  id: PartyId;
  size?: number;
  className?: string;
}) {
  const p = getParty(id);
  return (
    <span
      className={`party-logo ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      title={p.name}
    >
      <img src={p.logo} alt={p.short} width={size} height={size} decoding="async" />
    </span>
  );
}
