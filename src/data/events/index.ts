import type { YearEvent } from '../../types';
import { ERA_2008 } from './era2008';
import { ERA_2014 } from './era2014';
import { ERA_2020 } from './era2020';

export const ALL_EVENTS: YearEvent[] = [...ERA_2008, ...ERA_2014, ...ERA_2020];

export const EVENTS_BY_YEAR: Record<number, YearEvent[]> = ALL_EVENTS.reduce(
  (acc, e) => {
    (acc[e.year] ??= []).push(e);
    return acc;
  },
  {} as Record<number, YearEvent[]>,
);

/** @deprecated usar EVENTS_BY_YEAR / pickEvent */
export const YEAR_EVENTS = ALL_EVENTS;
