import { PartyLogo } from '../components/PartyLogo';
import { PollStrip } from '../components/PollStrip';
import { YearRail } from '../components/YearRail';
import { getPersonality } from '../data/personalities';
import { getOffice, getParty } from '../data/catalog';
import { useGame } from '../store';

export function QuizScreen() {
  const player = useGame((s) => s.player);
  const pendingQuiz = useGame((s) => s.pendingQuiz);
  const answerQuiz = useGame((s) => s.answerQuiz);
  if (!player || !pendingQuiz) return null;

  const party = getParty(player.party);
  const office = getOffice(player.office);
  const personality = getPersonality(player.personality);
  const { question, options, yearFrom } = pendingQuiz;

  return (
    <div className="stack" style={{ flex: 1 }} key={question.id + player.turn}>
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

      <YearRail year={yearFrom} turn={player.turn} totalTurns={player.totalTurns} />

      <article className="event-card quiz-card">
        <div className="eyebrow">Quiz · hemeroteca · {yearFrom}</div>
        <h2 className="h2 event-title" style={{ marginTop: 10 }}>
          {question.prompt}
        </h2>
        <p className="hook" style={{ marginTop: 14 }}>
          Dos opciones. Una es hemeroteca; la otra, tertulia.
        </p>
      </article>

      <PollStrip polls={pendingQuiz.polls} highlightParty={player.party} />

      <div className="choice-stack">
        <button className="choice-btn choice-quiz" onClick={() => answerQuiz(0)}>
          <span className="choice-tag">Opción A</span>
          <span className="choice-label">{options[0]}</span>
        </button>
        <button className="choice-btn choice-quiz" onClick={() => answerQuiz(1)}>
          <span className="choice-tag">Opción B</span>
          <span className="choice-label">{options[1]}</span>
        </button>
      </div>
    </div>
  );
}
