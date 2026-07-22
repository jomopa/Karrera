import { getOffice, getParty } from '../data/catalog';
import { getPersonality } from '../data/personalities';
import type { Player } from '../types';

/**
 * Asides de historiador: una línea final distinta según la carrera concreta.
 */
export function historianAside(player: Player): string {
  const party = getParty(player.party).short;
  const peak = Math.max(...player.officesHeld.map((h) => getOffice(h.office).tier), 0);
  const branches = new Set(player.officesHeld.map((h) => getOffice(h.office).branch));
  const risks = player.officesHeld.filter((h) => h.quality === 'escandalo' || h.quality === 'excelente').length;
  const switches = countPartySwitches(player);
  const persona = getPersonality(player.personality).name;

  const pool: string[] = [];

  if (switches >= 2) {
    pool.push(
      `Los archiveros te fichan como camaleón: ${switches} mudas de carnet y ninguna de ambición.`,
    );
  }
  if (branches.has('organica') && !branches.has('nacional') && peak >= 5) {
    pool.push('Fuiste de los que mandan sin salir en el telediario: la España de los pasillos.');
  }
  if (branches.has('media') && player.fama >= 55) {
    pool.push('Tu verdadero escaño fue un sofá de tertulia. El Congreso, solo decorado.');
  }
  if (branches.has('europea')) {
    pool.push('Bruselas te lavó el acento… o te lo puso en el currículum como perfume caro.');
  }
  if (player.flags.includes('sol')) {
    pool.push('2011 te dejó una cicatriz útil: quien estuvo en Sol no vuelve a hablar igual.');
  }
  if (player.flags.includes('disciplina') && peak >= 5) {
    pool.push('La boca cerrada te hizo carrera. En España eso también es un oficio.');
  }
  if (player.flags.includes('amnistia_si')) {
    pool.push('La amnistía te partió la biografía en dos hemerotecas. Elegiste una.');
  }
  if (player.escandalos === 0 && peak >= 5) {
    pool.push('Lo raro no es que subirás: es que lo hiciste sin incendiar la hemeroteca. Casi sospechoso.');
  }
  if (player.etica < 35) {
    pool.push('La ética te sirvió de eslogan. El patrimonio, de prueba.');
  }
  if (player.etica > 75 && peak >= 4) {
    pool.push('Hubo quien te llamó ingenuo. En España eso a veces es un cumplido póstumo.');
  }
  if (risks >= 4) {
    pool.push('Viviste la política como serie: spoilers, giros y un público que nunca perdona el aburrimiento.');
  }
  if (player.flags.includes('destino_naranja')) {
    pool.push('Formaste parte del milagro naranja… y de su evaporación. Historia express.');
  }
  if (player.flags.includes('sombra_ok') && player.flags.includes('sombra_quema')) {
    pool.push('Ganaste atajos y precipicios: la sombra te hizo carrera y epitafio a la vez.');
  } else if (player.flags.includes('sombra_quema')) {
    pool.push('Un trato en el pasillo te reventó la biografía. En España eso también es currículo.');
  } else if (player.flags.includes('sombra_ok')) {
    pool.push('Hubo un atajo que no salió en el BOE. Los archiveros lo husmean igual.');
  }
  if (player.flags.includes('caja_b')) {
    pool.push('Tu patrimonio tiene una columna que no admite luz solar.');
  }
  if (player.flags.includes('traidor_marcado')) {
    pool.push('Te marcaron traidor en algún congreso. El carnet siguió; la confianza, no.');
  }
  if (player.shadowCount >= 2) {
    pool.push(`La sombra te tentó ${player.shadowCount} veces. Eso ya es estilo, no accidente.`);
  }
  if (player.personality === 'fontanero' && peak >= 6) {
    pool.push(`${persona}: mandaste sin foto. El poder opaco te lo agradece en silencio.`);
  }
  if (player.personality === 'atril' && player.fama >= 60) {
    pool.push(`${persona}: tu micrófono duró más que algunos gobiernos.`);
  }
  if (player.personality === 'cruzado' && player.etica >= 60) {
    pool.push(`${persona}: preferiste tener razón… casi siempre. El escaño, a veces.`);
  }
  if (party === 'UPyD') {
    pool.push('UPyD te enseñó una lección española: tener razón no garantiza tener escaño.');
  }
  if (peak >= 8) {
    pool.push('Llegaste tan alto que hasta tus enemigos te citan para hacerse los importantes.');
  }
  if (pool.length === 0) {
    pool.push(
      `Una carrera ${party} de las de verdad: no siempre limpia, casi nunca aburrida, siempre discutible.`,
    );
  }

  const idx =
    (player.name.length * 13 +
      player.escandalos * 7 +
      player.traiciones * 11 +
      peak * 3 +
      player.officesHeld.length +
      player.seed) %
    pool.length;
  return pool[idx]!;
}

function countPartySwitches(player: Player): number {
  let n = 0;
  if (player.flags.includes('destino_naranja')) n++;
  n += player.flags.filter((f) => f.startsWith('sw_')).length;
  if (
    n === 0 &&
    (player.party === 'podemos' ||
      player.party === 'vox' ||
      player.party === 'sumar' ||
      player.party === 'ciudadanos')
  ) {
    n = 1;
  }
  return n;
}

/** Gancho corto al mostrar el evento, según tu situación ahora mismo */
export function situationalHook(player: Player, baseHook?: string): string {
  const extras: string[] = [];
  const tier = getOffice(player.office).tier;
  const title = getOffice(player.office).title;

  if (tier <= 1) extras.push(`Desde ${title.toLowerCase()}, el país se ve en diferido.`);
  else if (tier <= 3) extras.push(`Como ${title.toLowerCase()}, te llega el ruido antes que el poder.`);
  else if (tier <= 6) extras.push(`Con cargo de ${title.toLowerCase()}, ya no eres espectador: eres sospechoso útil.`);
  else extras.push(`Estando donde estás (${title}), cada frase pesa como un BOE.`);

  if (player.sombra > 55) extras.push('Tu sombra es más larga que tu biografía oficial.');
  if (player.forma > 70) extras.push('Vas en racha: hasta los rivales te dan la razón por error.');
  if (player.forma < 35) extras.push('Llevas semanas defendiendo lo indefendible. Se te nota.');
  if (player.flags.includes('sol')) extras.push('Quien estuvo en Sol no finge inocencia.');
  if (player.flags.includes('sombra_ok')) extras.push('Alguien del pasillo aún te debe un favor opaco.');
  if (player.flags.includes('sombra_quema')) extras.push('La última confidencia te dejó marca. Se te nota al andar.');
  if (player.flags.includes('traidor_marcado')) extras.push('Hay quien ya no te da la mano sin contar dedos.');

  const pick = extras[(player.turn + player.name.length) % extras.length]!;
  return baseHook ? `${baseHook} ${pick}` : pick;
}
