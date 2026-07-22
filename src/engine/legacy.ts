import { historianAside } from '../data/historian';
import { getOffice, getParty } from '../data/catalog';
import { computePatrimony, peakOffice } from './patrimony';
import type { Legacy, Player } from '../types';

export function computeLegacy(player: Player): Legacy {
  const held = player.officesHeld.map((h) => getOffice(h.office));
  const maxTier = Math.max(...held.map((o) => o.tier));
  const titles = [...new Set(player.officesHeld.map((h) => getOffice(h.office).title))];
  const start = getOffice(player.officesHeld[0]!.office).title;
  const end = getOffice(player.office).title;
  const party = getParty(player.party);
  const peak = peakOffice(player);
  const pat = computePatrimony(player);

  let score =
    maxTier * 80 +
    player.victorias * 20 +
    player.aniosGobierno * 25 -
    player.escandalos * 15 -
    player.derrotas * 8 +
    Math.round(player.fama * 0.4) +
    Math.round(player.etica * 0.15);

  let title = 'Carrera respetable';
  let blurb = 'Subiste. Caíste poco. El sistema te digirió.';
  let ultraRare: string | undefined;
  let arc = 'El superviviente';

  const wasPres = player.officesHeld.some((h) => h.office === 'presidente') || player.office === 'presidente';
  const wasFont = player.officesHeld.some((h) =>
    ['fontanero', 'sec_organizacion', 'numero_dos', 'dir_campana'].includes(h.office),
  );
  const wasMedia = player.officesHeld.some((h) => getOffice(h.office).branch === 'media');
  const wasAlcalde = player.officesHeld.some((h) => h.office.startsWith('alcalde'));
  const wasEu = player.officesHeld.some((h) => getOffice(h.office).branch === 'europea');
  const scandals = player.officesHeld.filter((h) => h.quality === 'escandalo').length;

  if (wasPres && player.flags.includes('destino_suarez') && player.aniosGobierno >= 4) {
    ultraRare = 'EL SUÁREZ';
    arc = 'El Suárez';
    title = 'Nueva etapa política';
    blurb = 'No solo gobernaste: reordenaste el tablero.';
    score += 400;
  } else if (wasPres && player.aniosGobierno >= 8) {
    ultraRare = 'EL FELIPE';
    arc = 'El Felipe';
    title = 'Larga hegemonía';
    blurb = 'Gobernaste tanto que una generación te da por clima.';
    score += 350;
  } else if (wasPres && player.victorias >= 5 && player.forma > 70) {
    ultraRare = 'EL AZNAR';
    arc = 'El Aznar';
    title = 'Mayoría absoluta (o su mito)';
    blurb = 'Ganaste como quien cree que la historia te debía algo.';
    score += 320;
  } else if (wasPres && player.escandalos >= 2 && player.derrotas >= 3) {
    ultraRare = 'EL SÁNCHEZ';
    arc = 'El Sánchez';
    title = 'Supervivencia absoluta';
    blurb = 'Caíste, te levantaron, te volvieron a matar… y seguías ahí.';
    score += 300;
  } else if (!wasPres && maxTier >= 7 && player.fama > 70 && player.officesHeld.length <= 9) {
    ultraRare = 'EL IGLESIAS';
    arc = 'El Iglesias';
    title = 'Explosión y salida';
    blurb = 'Subiste como un cohete. El aterrizaje fue otra industria.';
    score += 200;
  } else if (player.flags.includes('destino_naranja') && (player.office === 'olvidado' || maxTier >= 5)) {
    ultraRare = 'EL CIUDADANOS';
    arc = 'El Ciudadanos';
    title = 'Destinado a gobernar… hasta que no';
    blurb = 'Parecía el centro del futuro. Luego, hemeroteca naranja.';
    score += 120;
  } else if (player.flags.includes('sol') && player.flags.includes('ola_morada') && maxTier >= 5) {
    ultraRare = 'EL SOL';
    arc = 'El de Sol';
    title = 'De la plaza al escaño';
    blurb = 'Llevaste el adoquín al Congreso. O eso contaste.';
    score += 150;
  } else if (player.personality === 'cruzado' && player.etica >= 70 && maxTier >= 4 && player.escandalos === 0) {
    arc = 'El coherente';
    title = 'Razón antes que escaño';
    blurb = 'Casi siempre preferiste tener razón. El sistema te lo cobró a plazos.';
  } else if (wasPres) {
    arc = 'El presidente';
    title = 'Moncloa';
    blurb = 'Llegaste. Aunque fuera por el pasillo equivocado.';
  } else if (wasFont && maxTier >= 6 && player.fama < 55) {
    arc = 'El fontanero';
    title = 'Poder sin focos';
    blurb = 'Nunca gobernaste del todo. Pero todo pasaba por ti.';
  } else if (wasAlcalde && maxTier <= 6) {
    arc = 'El alcalde eterno';
    title = 'Rey de lo cercano';
    blurb = 'Tu ciudad es tu país. Madrid solo telefonea.';
  } else if (wasEu && maxTier >= 6) {
    arc = 'El europeo';
    title = 'Bruselas te adoptó';
    blurb = 'Menos gritos, más trílogo.';
  } else if (wasMedia && player.fama >= 60) {
    arc = 'El tertuliano';
    title = 'Más famoso que el cargo';
    blurb = 'Tu plató vendió más que tus urnas.';
  } else if (scandals >= 3) {
    arc = 'El meme';
    title = 'Internet no te suelta';
    blurb = 'Carrera irregular. Cultura pop impecable.';
  } else if (player.escandalos >= 3 || pat.underTable > pat.salaries * 0.4) {
    arc = 'El imputado';
    title = 'Sumario y memorias';
    blurb = 'El juicio te hizo marca. Las memorias, caja.';
  } else if (player.flags.includes('sombra_quema') && player.escandalos >= 2) {
    arc = 'El quemado del pasillo';
    title = 'Atajo fallido';
    blurb = 'Te la jugaste en la sombra y la sombra te devolvió la factura.';
    score -= 40;
  } else if (player.flags.includes('sombra_ok') && maxTier >= 6 && player.etica < 40) {
    arc = 'El atajado';
    title = 'Carrera con pasillo';
    blurb = 'Subiste por sitios que no salen en el organigrama oficial.';
    score += 40;
  } else if (player.office === 'olvidado') {
    arc = 'El fantasma';
    title = 'Político olvidado';
    blurb = 'El sistema te archivó sin rencor.';
  } else if (player.traiciones >= 3 && maxTier >= 5) {
    arc = 'El camaleón';
    title = 'Supervivencia sobre coherencia';
    blurb = 'Cambiaste de piel más que de despacho.';
  } else if (player.derrotas >= 4 && maxTier >= 5) {
    arc = 'El superviviente';
    title = 'Caer y seguir';
    blurb = 'Perdiste casi todo lo perdible. Seguías teniendo carnet.';
  }

  const notable = titles.filter((t) => t !== start).slice(0, 5);
  const aside = historianAside(player);

  return {
    arc,
    title,
    blurb,
    ultraRare,
    peakTitle: peak.title,
    patrimony: {
      salaries: pat.salaries,
      underTable: pat.underTable,
      total: pat.total,
      ethicsNote: pat.ethicsNote,
      joke: pat.joke,
    },
    lines: [
      `2008–${player.year}`,
      `Comenzaste como ${start.toLowerCase()} (${party.short}) · ${player.personality}.`,
      `Cargo más alto: ${peak.title}.`,
      notable.length
        ? `Itinerario: ${notable.slice(0, 4).join(' · ')}${notable.length > 4 ? '…' : '.'}`
        : 'Itinerario breve.',
      `Sobreviviste a ${player.escandalos} escándalos, ${player.traiciones} traiciones y ${player.derrotas} derrotas.`,
      player.aniosGobierno > 0
        ? `Tocaste gobierno ~${player.aniosGobierno} años.`
        : 'Nunca gobernaste del todo.',
      aside,
      `Cierre: ${end}.`,
    ],
    score: Math.max(0, Math.round(score)),
  };
}
