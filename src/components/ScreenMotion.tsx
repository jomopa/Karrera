import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function ScreenMotion({ children, screenKey }: { children: ReactNode; screenKey: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={screenKey}
      className="screen-root"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
