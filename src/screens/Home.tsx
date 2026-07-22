import { motion, useReducedMotion } from 'framer-motion';
import { useGame } from '../store';

const YEARS = ['2008', '11', '14', '15', '17', '20', '23', '26', '2030'];

export function Home() {
  const setScreen = useGame((s) => s.setScreen);
  const reduce = useReducedMotion();

  return (
    <div className="home-hero">
      <div>
        <div className="masthead">
          <div className="masthead-rule">Hemeroteca jugable</div>
          <div className="year-ticker" aria-hidden>
            {YEARS.map((y) => (
              <span key={y}>{y}</span>
            ))}
          </div>
        </div>

        <motion.h1
          className="h1"
          style={{ marginTop: 22 }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Karrera
        </motion.h1>

        <p className="home-kicker" style={{ marginTop: 16 }}>
          De concejal a la Moncloa.
        </p>
        <p className="lead" style={{ marginTop: 12, maxWidth: '32ch' }}>
          Eliges partido y estilo en 2008. Cada año, un suceso real. Dos caminos: seguro, o arriesgado y
          brillante… o ruinoso. Veinte partidas, veinte hemerotecas.
        </p>
      </div>

      <motion.div
        className="stack"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.12, duration: 0.35 }}
      >
        <button className="btn btn-primary btn-block" onClick={() => setScreen('create')}>
          Nueva carrera
        </button>
      </motion.div>
    </div>
  );
}
