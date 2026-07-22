import { useCallback, useState } from 'react';
import { ShadowRoulette } from '../components/ShadowRoulette';
import { useGame } from '../store';

const THEME_LABEL: Record<string, string> = {
  corrupcion: 'Corrupción',
  traicion: 'Traición',
  chantaje: 'Chantaje',
  caja_b: 'Caja B',
  filtracion: 'Filtración',
  enchufe: 'Enchufe',
};

export function ShadowOfferScreen() {
  const pending = useGame((s) => s.pendingShadow);
  const skip = useGame((s) => s.skipShadow);
  const accept = useGame((s) => s.acceptShadow);
  const [spinning, setSpinning] = useState(false);

  const onRouletteDone = useCallback(() => {
    accept();
  }, [accept]);

  if (!pending) return null;
  const { offer, win } = pending;

  if (spinning) {
    return (
      <div className="stack fade-up shadow-screen" style={{ flex: 1 }}>
        <div className="eyebrow">La sombra decide</div>
        <h2 className="h2" style={{ marginTop: 8 }}>
          Ruleta del pasillo
        </h2>
        <p className="lead" style={{ marginTop: 8 }}>
          Setenta por ciento de atajo. Treinta de precipicio. Sin rebobinar.
        </p>
        <ShadowRoulette win={win} onDone={onRouletteDone} />
      </div>
    );
  }

  return (
    <div className="stack fade-up shadow-screen" style={{ flex: 1 }} key={offer.id}>
      <div className="row-between">
        <div className="brand">Karrera</div>
        <div className="pill">
          <strong>Pasillo</strong>
          <span>· confidencia</span>
        </div>
      </div>

      <article className="event-card shadow-card">
        <div className="eyebrow">
          Oferta en la sombra · {THEME_LABEL[offer.theme] ?? offer.theme}
        </div>
        <h2 className="h2" style={{ marginTop: 8 }}>
          {offer.title}
        </h2>
        <p className="lead" style={{ marginTop: 10 }}>
          {offer.pitch}
        </p>
        <p className="hook" style={{ marginTop: 12 }}>
          {offer.riskNote}
        </p>
      </article>

      <div className="stack" style={{ gap: 8 }}>
        <button className="btn btn-soft risk" onClick={() => setSpinning(true)}>
          <span>
            Aceptar el trato
            <span className="hint">ruleta 70/30 · sin marcha atrás</span>
          </span>
        </button>
        <button className="btn btn-soft" onClick={skip}>
          <span>
            Hacer como que no he oído
            <span className="hint">sigues a la hemeroteca</span>
          </span>
        </button>
      </div>
    </div>
  );
}
