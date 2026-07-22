import { AnimatePresence } from 'framer-motion';
import { ScreenMotion } from './components/ScreenMotion';
import { useGame } from './store';
import { Create } from './screens/Create';
import { EventScreen } from './screens/EventScreen';
import { Home } from './screens/Home';
import { Legacy } from './screens/Legacy';
import { QuizScreen } from './screens/QuizScreen';
import { Result } from './screens/Result';
import { SalaResult } from './screens/SalaResult';
import { SalaScreen } from './screens/SalaScreen';
import { ShadowOfferScreen } from './screens/ShadowOffer';
import { ShadowResult } from './screens/ShadowResult';

export default function App() {
  const screen = useGame((s) => s.screen);
  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <ScreenMotion key={screen} screenKey={screen}>
          {screen === 'home' && <Home />}
          {screen === 'create' && <Create />}
          {screen === 'event' && <EventScreen />}
          {screen === 'quiz' && <QuizScreen />}
          {screen === 'sala' && <SalaScreen />}
          {screen === 'salaResult' && <SalaResult />}
          {screen === 'result' && <Result />}
          {screen === 'shadow' && <ShadowOfferScreen />}
          {screen === 'shadowResult' && <ShadowResult />}
          {screen === 'legacy' && <Legacy />}
        </ScreenMotion>
      </AnimatePresence>
    </div>
  );
}
