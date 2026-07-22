import type { ShadowOffer } from '../../types';
import { SHADOW_BY_ERA } from './byEra';
import { SHADOW_BY_PARTY } from './byParty';
import { SHADOW_TEMPLATES } from './templates';

export const SHADOW_OFFERS: ShadowOffer[] = [
  ...SHADOW_TEMPLATES,
  ...SHADOW_BY_PARTY,
  ...SHADOW_BY_ERA,
];

export function shadowOfferCount(): number {
  return SHADOW_OFFERS.length;
}
