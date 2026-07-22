import { startParties } from '../data/catalog';
import { PERSONALITIES } from '../data/personalities';
import { PartyLogo } from '../components/PartyLogo';
import { useGame } from '../store';
import type { PersonalityId } from '../types';

const MARKS: Record<PersonalityId, string> = {
  fontanero: 'FO',
  atril: 'AT',
  cruzado: 'CR',
};

export function Create() {
  const step = useGame((s) => s.step);
  const draft = useGame((s) => s.draft);
  const setDraft = useGame((s) => s.setDraft);
  const next = useGame((s) => s.nextStep);
  const prev = useGame((s) => s.prevStep);
  const start = useGame((s) => s.start);
  const setScreen = useGame((s) => s.setScreen);
  const parties = startParties();

  const can =
    (step === 0 && draft.name.trim().length > 1) ||
    (step === 1 && !!draft.party) ||
    (step === 2 && !!draft.personality);

  const progress = ((step + 1) / 3) * 100;

  return (
    <div className="stack" style={{ flex: 1 }}>
      <div className="row-between">
        <button
          className="btn btn-ghost"
          style={{ minHeight: 40, padding: '0 12px' }}
          onClick={() => (step === 0 ? setScreen('home') : prev())}
        >
          Atrás
        </button>
        <span className="eyebrow">{step + 1}/3</span>
      </div>

      <div className="create-progress">
        <div className="track" aria-hidden>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 0 && (
        <>
          <h2 className="h2">Nombre</h2>
          <p className="lead">Como en el censo. La hemeroteca hará el resto.</p>
          <div className="field">
            <label>Nombre y apellidos</label>
            <input
              autoFocus
              maxLength={32}
              value={draft.name}
              placeholder="Ej. Marta Ruiz Vallejo"
              onChange={(e) => setDraft({ name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && can && next()}
            />
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="h2">Partido · 2008</h2>
          <p className="lead">Solo los que existían entonces. Los nuevos saldrán como tentación tránsfuga.</p>
          <div className="party-grid">
            {parties.map((p) => (
              <button
                key={p.id}
                className={`party-opt ${draft.party === p.id ? 'active' : ''}`}
                style={{ ['--party' as string]: p.color }}
                onClick={() => setDraft({ party: p.id })}
              >
                <PartyLogo id={p.id} size={36} />
                <div>
                  <div className="name">{p.short}</div>
                  <div className="blurb">{p.blurb}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="h2">Personalidad</h2>
          <p className="lead">Cómo juegas la política. Cambia el tono de la hemeroteca.</p>
          <div className="party-grid">
            {PERSONALITIES.map((p) => (
              <button
                key={p.id}
                className={`party-opt ${draft.personality === p.id ? 'active' : ''}`}
                style={{ ['--party' as string]: '#f0b429' }}
                onClick={() => setDraft({ personality: p.id })}
              >
                <div className="region-mark" aria-hidden>
                  {MARKS[p.id]}
                </div>
                <div>
                  <div className="name">{p.name}</div>
                  <div className="blurb">{p.blurb}</div>
                  <div className="blurb" style={{ marginTop: 4, opacity: 0.8 }}>
                    {p.effect}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="spacer" />
      <button className="btn btn-primary btn-block" disabled={!can} onClick={() => (step === 2 ? start() : next())}>
        {step === 2 ? 'Entrar en 2008' : 'Continuar'}
      </button>
    </div>
  );
}
